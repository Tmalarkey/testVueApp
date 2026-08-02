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
        id: row.trip_day_id,
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
    const event = {
      id: row.activity_id,
      time: row.display_time,
      start: Number(row.start_minutes),
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
      photoSourceUrl: row.photo_source_url
    };
    day.events.push(event);
    if (!day.status && row.status_label) day.status = row.status_label;
  }

  return [...grouped.values()]
    .map(day => {
      day.events.sort((a, b) => a.start - b.start);
      day.slots = buildSlots(day.events);
      return day;
    });
}

function refreshAfterLiveLoad() {
  if (typeof customPlans !== 'undefined') {
    const cards = tripDays.map(dayCard).join('');
    const dayGrid = document.getElementById('dayGrid');
    const daysGrid = document.getElementById('daysGrid');
    if (dayGrid) dayGrid.innerHTML = cards;
    if (daysGrid) daysGrid.innerHTML = cards;

    if (typeof renderUpNext === 'function') renderUpNext();
    if (typeof renderExplorerDays === 'function') renderExplorerDays();
    if (typeof renderTimeWheel === 'function') renderTimeWheel();
    if (typeof renderEditor === 'function') renderEditor();
    if (typeof bindDynamicControls === 'function') bindDynamicControls();
    if (typeof showToast === 'function') showToast('Live itinerary loaded.');
  }
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
    return false;
  }
}

window.itineraryReady = loadLiveItinerary();
