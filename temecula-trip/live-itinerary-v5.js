const SUPABASE_URL = 'https://qaehayouqwhtdqmmpgdj.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_ztb5j9aEvsIWTsEJwdOBfg_y092caZY';
const ITINERARY_FEED_URL = `${SUPABASE_URL}/rest/v1/itinerary_feed?trip_slug=eq.temecula-2026&select=*&order=day_sort_order.asc,activity_sort_order.asc`;

const embeddedTripDays = tripDays.map(day => ({
  ...day,
  events: day.events.map(event => ({ ...event })),
  slots: day.slots.map(slot => ({ ...slot }))
}));

function dateParts(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return {
    weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
    shortDay: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
    date: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
    dateShort: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    number: String(day)
  };
}

function dateTimeFromMinutes(isoDate, minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${isoDate}T${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:00`;
}

function buildSlots(events) {
  const slots = [];
  const dayStart = 480;
  const dayEnd = 1320;
  let cursor = dayStart;

  for (const event of events) {
    const start = Math.max(dayStart, Number(event.start));
    const end = Math.min(dayEnd, Number(event.end));
    if (start > cursor) {
      slots.push({
        start: cursor,
        end: start,
        title: 'Free time',
        detail: 'Nothing scheduled during this window.',
        icon: '☀️'
      });
    }
    if (end > start) {
      slots.push({
        start,
        end,
        title: event.title,
        detail: event.note || event.location || 'Planned activity.',
        icon: event.icon || '📍'
      });
      cursor = Math.max(cursor, end);
    }
  }

  if (cursor < dayEnd) {
    slots.push({
      start: cursor,
      end: dayEnd,
      title: 'Free time',
      detail: 'Nothing scheduled during this window.',
      icon: '🌙'
    });
  }

  return slots.length ? slots : [{ start: dayStart, end: dayEnd, title: 'Free time', detail: 'Nothing scheduled yet.', icon: '☀️' }];
}

function rowsToTripDays(rows) {
  const grouped = new Map();

  for (const row of rows) {
    if (!grouped.has(row.trip_day_id)) {
      const parts = dateParts(row.day_date);
      grouped.set(row.trip_day_id, {
        id: parts.shortDay.toLowerCase(),
        databaseId: row.trip_day_id,
        dayDate: row.day_date,
        weekday: parts.weekday,
        shortDay: parts.shortDay,
        date: parts.date,
        dateShort: parts.dateShort,
        number: parts.number,
        accent: row.accent_color || '#df7664',
        summary: row.day_summary || '',
        status: null,
        events: [],
        slots: []
      });
    }

    if (!row.activity_id) continue;
    const day = grouped.get(row.trip_day_id);
    const startMinutes = Number(row.start_minutes);
    const event = {
      id: row.activity_id,
      time: row.display_time,
      start: startMinutes,
      end: Number(row.end_minutes),
      title: row.activity_title,
      location: row.location,
      note: row.notes,
      icon: row.icon || '📍',
      confirmed: Boolean(row.is_confirmed),
      directions: row.directions_query,
      phone: row.phone,
      image: row.photo_url,
      imageAlt: row.photo_alt,
      photoSource: row.photo_source,
      photoSourceUrl: row.photo_source_url,
      dateTime: dateTimeFromMinutes(row.day_date, startMinutes)
    };
    day.events.push(event);
    if (!day.status && row.status_label) day.status = row.status_label;
  }

  return [...grouped.values()].map(day => {
    day.events.sort((a, b) => a.start - b.start);
    day.slots = buildSlots(day.events);
    return day;
  });
}

function safeRefresh(name, callback) {
  try {
    if (typeof callback === 'function') callback();
  } catch (error) {
    console.warn(`Live itinerary refresh step failed: ${name}`, error);
  }
}

function refreshAfterLiveLoad() {
  const cards = tripDays.map(dayCard).join('');
  const dayGrid = document.getElementById('dayGrid');
  const daysGrid = document.getElementById('daysGrid');
  if (dayGrid) dayGrid.innerHTML = cards;
  if (daysGrid) daysGrid.innerHTML = cards;

  /* Bind navigation immediately so secondary widget failures cannot disable day taps. */
  safeRefresh('bind controls', () => bindDynamicControls());
  safeRefresh('up next', () => renderUpNext());
  safeRefresh('explorer days', () => renderExplorerDays());
  safeRefresh('time wheel', () => renderTimeWheel());
  safeRefresh('editor', () => renderEditor());
  safeRefresh('image fallbacks', () => bindImageFallbacks());
  safeRefresh('toast', () => showToast('Live itinerary loaded.'));
}

async function loadLiveItinerary() {
  try {
    const response = await fetch(ITINERARY_FEED_URL, {
      cache: 'no-store',
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`
      }
    });

    if (!response.ok) throw new Error(`Supabase responded ${response.status}`);
    const rows = await response.json();
    if (!Array.isArray(rows) || !rows.length) throw new Error('No itinerary rows returned');

    const liveDays = rowsToTripDays(rows);
    if (!liveDays.length) throw new Error('No trip days returned');

    tripDays.splice(0, tripDays.length, ...liveDays);
    window.ITINERARY_SOURCE = 'supabase';
    refreshAfterLiveLoad();
    return true;
  } catch (error) {
    console.warn('Using embedded itinerary fallback:', error);
    tripDays.splice(0, tripDays.length, ...embeddedTripDays);
    window.ITINERARY_SOURCE = 'embedded-fallback';
    safeRefresh('fallback controls', () => bindDynamicControls());
    return false;
  }
}

window.itineraryReady = loadLiveItinerary();
