const tripDays = [
  {
    id: 'sun',
    weekday: 'Sunday',
    shortDay: 'SUN',
    date: 'August 2',
    dateShort: 'Aug 2',
    number: '2',
    summary: 'Arrival and settle in at the house.',
    events: [
      {
        time: '4:00 PM',
        title: 'Arrive at the house',
        location: 'Temecula home base',
        note: 'Settle in, unpack and enjoy an easy first evening.',
        icon: '🏡',
        dateTime: '2026-08-02T16:00:00'
      }
    ]
  },
  {
    id: 'mon',
    weekday: 'Monday',
    shortDay: 'MON',
    date: 'August 3',
    dateShort: 'Aug 3',
    number: '3',
    summary: 'Free time at the house, then dinner at Ponte.',
    status: 'Dinner confirmed',
    events: [
      {
        time: 'Morning',
        title: 'Hang out at the house / free time',
        location: 'Home base',
        icon: '☀️'
      },
      {
        time: '5:30 PM',
        title: 'Dinner reservation',
        location: 'Ponte',
        note: 'About a 5-minute drive.',
        confirmed: true,
        icon: '🍷',
        dateTime: '2026-08-03T17:30:00',
        maps: 'Ponte Winery Temecula CA'
      }
    ]
  },
  {
    id: 'tue',
    weekday: 'Tuesday',
    shortDay: 'TUE',
    date: 'August 4',
    dateShort: 'Aug 4',
    number: '4',
    summary: "Pennypickle's, naps, games and a family wine evening.",
    events: [
      {
        time: '10:00 AM–12:00 PM',
        title: "Pennypickle's Workshop",
        location: 'Old Town Temecula',
        note: 'About a 17-minute drive. Entry runs in sessions; 10–12 is the first session.',
        icon: '🧪',
        dateTime: '2026-08-04T10:00:00',
        maps: "Pennypickle's Workshop Temecula CA"
      },
      {
        time: '11:45 AM',
        title: 'Home for naps',
        location: 'Home base',
        note: 'Dad & I wine tasting at Palumbo or Doffo. This time slightly overlaps the workshop window in the original itinerary, so confirm the plan that morning.',
        icon: '😴',
        dateTime: '2026-08-04T11:45:00'
      },
      {
        time: '3:00 PM',
        title: 'Play games at home',
        location: 'Home base',
        icon: '🎲',
        dateTime: '2026-08-04T15:00:00'
      },
      {
        time: '6:00 PM',
        title: 'Takeout dinner',
        location: 'Home base',
        note: 'Family wine tasting evening.',
        icon: '🥡',
        dateTime: '2026-08-04T18:00:00'
      }
    ]
  },
  {
    id: 'wed',
    weekday: 'Wednesday',
    shortDay: 'WED',
    date: 'August 5',
    dateShort: 'Aug 5',
    number: '5',
    summary: 'Wine tasting with a booked driver, then dinner in Old Town.',
    status: 'Driver + dinner confirmed',
    events: [
      {
        time: 'Morning',
        title: 'Hang out at the house / free time',
        location: 'Home base',
        icon: '☀️'
      },
      {
        time: '11:30 AM',
        title: 'Home for naps',
        location: 'Home base',
        icon: '😴',
        dateTime: '2026-08-05T11:30:00'
      },
      {
        time: '3:20 PM pickup',
        title: 'Driver pickup',
        location: 'Home base',
        note: 'Driver is booked.',
        confirmed: true,
        icon: '🚐',
        dateTime: '2026-08-05T15:20:00'
      },
      {
        time: '3:30–5:00 PM',
        title: 'Wine tasting',
        location: 'Danza del Sol Winery',
        icon: '🍇',
        dateTime: '2026-08-05T15:30:00',
        maps: 'Danza del Sol Winery Temecula CA'
      },
      {
        time: '5:30 PM',
        title: 'Dinner reservation',
        location: '1909 Temecula',
        note: 'About a 22-minute drive from the house.',
        confirmed: true,
        icon: '🍽️',
        dateTime: '2026-08-05T17:30:00',
        maps: '1909 Temecula CA'
      }
    ]
  },
  {
    id: 'thu',
    weekday: 'Thursday',
    shortDay: 'THU',
    date: 'August 6',
    dateShort: 'Aug 6',
    number: '6',
    summary: 'Sugarplum Zoo, Weins tasting and a chef dinner.',
    status: 'Chef confirmed',
    events: [
      {
        time: '9:00 AM',
        title: 'Sugarplum Zoo',
        location: 'Temecula',
        note: 'About a 6-minute drive. Opens at 9:00 AM.',
        icon: '🐾',
        dateTime: '2026-08-06T09:00:00',
        maps: 'Sugarplum Zoo Temecula CA'
      },
      {
        time: '11:00 AM',
        title: 'Home for naps',
        location: 'Home base',
        icon: '😴',
        dateTime: '2026-08-06T11:00:00'
      },
      {
        time: '12:00 PM',
        title: 'Dad & I wine tasting',
        location: 'Weins Cellars',
        note: 'Reservation at noon.',
        confirmed: true,
        icon: '🍷',
        dateTime: '2026-08-06T12:00:00',
        maps: 'Wiens Cellars Temecula CA'
      },
      {
        time: '6:00 PM',
        title: 'Chef dinner',
        location: 'Home base',
        confirmed: true,
        icon: '👨‍🍳',
        dateTime: '2026-08-06T18:00:00'
      }
    ]
  },
  {
    id: 'fri',
    weekday: 'Friday',
    shortDay: 'FRI',
    date: 'August 7',
    dateShort: 'Aug 7',
    number: '7',
    summary: 'Lorenzi tasting, free time and dinner at Oscar’s.',
    status: 'Tasting + dinner confirmed',
    events: [
      {
        time: 'Morning',
        title: 'Free time',
        location: 'Home base',
        icon: '☀️'
      },
      {
        time: '11:00 AM',
        title: 'Dad & I wine tasting',
        location: 'Lorenzi Estate Vineyards',
        confirmed: true,
        icon: '🍇',
        dateTime: '2026-08-07T11:00:00',
        maps: 'Lorenzi Estate Vineyards Temecula CA'
      },
      {
        time: '5:00 PM',
        title: 'Dinner reservation',
        location: "Oscar's Brewing Company",
        note: 'About a 15-minute drive.',
        confirmed: true,
        icon: '🍺',
        dateTime: '2026-08-07T17:00:00',
        maps: "Oscar's Brewing Company Temecula CA"
      }
    ]
  },
  {
    id: 'sat',
    weekday: 'Saturday',
    shortDay: 'SAT',
    date: 'August 8',
    dateShort: 'Aug 8',
    number: '8',
    summary: "Annie's Café and a relaxed final morning in Old Town.",
    events: [
      {
        time: '11:00 AM',
        title: "Annie's Café",
        location: 'Old Town Temecula',
        note: 'Check the waitlist and call ahead. Brit-themed café.',
        icon: '☕',
        dateTime: '2026-08-08T11:00:00',
        maps: "Annie's Cafe Temecula CA",
        phone: '9512960107'
      }
    ]
  }
];

const nearbyOptions = [
  { name: 'Longshadow Ranch', note: 'Opens at 12:00 PM · about a 7-minute drive', icon: '🐴', maps: 'Longshadow Ranch Winery Temecula CA' },
  { name: 'Peltzer', note: 'Opens at 1:00 PM · farm animals · about a 6-minute drive', icon: '🚜', maps: 'Peltzer Winery Temecula CA' },
  { name: 'Temecula Duck Pond', note: 'Easy walk option · about a 14-minute drive', icon: '🦆', maps: 'Temecula Duck Pond Temecula CA' },
  { name: 'Harveston Community Park', note: 'Playground and lake · about a 20-minute drive', icon: '🛝', maps: 'Harveston Community Park Temecula CA' }
];

const confirmedPlans = [
  ['Ponte dinner', 'Monday at 5:30 PM'],
  ['Driver booked', 'Wednesday pickup at 3:20 PM'],
  ['1909 Temecula dinner', 'Wednesday at 5:30 PM'],
  ['Chef dinner', 'Thursday at 6:00 PM'],
  ['Lorenzi Estate Vineyards', 'Friday at 11:00 AM'],
  ["Oscar's Brewing Company", 'Friday at 5:00 PM']
];

const panels = [...document.querySelectorAll('.panel')];
const navButtons = [...document.querySelectorAll('.nav-button')];
const overviewGrid = document.getElementById('dayGrid');
const daysGrid = document.getElementById('daysGrid');
const dayView = document.getElementById('dayView');
const nearbyList = document.getElementById('nearbyList');
const statusList = document.getElementById('statusList');

function mapsUrl(query) {
  return `https://maps.apple.com/?q=${encodeURIComponent(query)}`;
}

function dayCard(day) {
  return `
    <button class="day-card" type="button" data-day="${day.id}" aria-label="Open ${day.weekday}, ${day.date}">
      <span class="day-date"><small>${day.shortDay}</small><strong>${day.number}</strong><small>AUG</small></span>
      <span class="day-copy">
        <strong>${day.weekday}</strong>
        <span>${day.summary}</span>
        ${day.status ? `<em class="day-status">${day.status}</em>` : ''}
      </span>
      <span class="day-arrow" aria-hidden="true">›</span>
    </button>`;
}

function renderDayGrids() {
  const markup = tripDays.map(dayCard).join('');
  overviewGrid.innerHTML = markup;
  daysGrid.innerHTML = markup;
}

function renderNearby() {
  nearbyList.innerHTML = nearbyOptions.map(item => `
    <article class="nearby-card">
      <div class="nearby-icon" aria-hidden="true">${item.icon}</div>
      <div>
        <h3>${item.name}</h3>
        <p>${item.note}</p>
      </div>
      <div class="action-row">
        <a class="action-link secondary" href="${mapsUrl(item.maps)}" target="_blank" rel="noopener">Open in Maps</a>
      </div>
    </article>`).join('');
}

function renderStatuses() {
  statusList.innerHTML = confirmedPlans.map(([title, detail]) => `
    <div class="status-item">
      <span class="status-check" aria-hidden="true">✓</span>
      <span><strong>${title}</strong><small>${detail}</small></span>
    </div>`).join('');
}

function eventMarkup(event) {
  return `
    <article class="timeline-item">
      <div class="timeline-time">
        <span>${event.icon || '•'} &nbsp;${event.time}</span>
        ${event.confirmed ? '<span class="confirmed">✓ Confirmed</span>' : ''}
      </div>
      <h3>${event.title}</h3>
      ${event.location ? `<div class="timeline-location"><span aria-hidden="true">⌖</span>${event.location}</div>` : ''}
      ${event.note ? `<p class="timeline-note">${event.note}</p>` : ''}
      ${(event.maps || event.phone) ? `<div class="action-row">
        ${event.maps ? `<a class="action-link" href="${mapsUrl(event.maps)}" target="_blank" rel="noopener">Directions</a>` : ''}
        ${event.phone ? `<a class="action-link secondary" href="tel:${event.phone}">Call ${formatPhone(event.phone)}</a>` : ''}
      </div>` : ''}
    </article>`;
}

function formatPhone(value) {
  return `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
}

function openDay(id, updateHash = true) {
  const index = tripDays.findIndex(day => day.id === id);
  if (index < 0) return;
  const day = tripDays[index];
  const previous = tripDays[index - 1];
  const next = tripDays[index + 1];

  dayView.innerHTML = `
    <div class="detail-top">
      <button class="icon-button" type="button" data-panel-target="days" aria-label="Back to all days">‹</button>
      <div class="detail-top-title"><small>Temecula itinerary</small><strong>${day.weekday} · ${day.dateShort}</strong></div>
      <button class="icon-button" type="button" data-panel-target="overview" aria-label="Go to overview">⌂</button>
    </div>
    <section class="detail-hero">
      <div class="day-number">${day.weekday} · August ${day.number}</div>
      <h2>${day.summary.split('.')[0]}</h2>
      <p>${day.events.length} ${day.events.length === 1 ? 'plan' : 'plans'} on the itinerary${day.status ? ` · ${day.status}` : ''}.</p>
    </section>
    <div class="timeline">${day.events.map(eventMarkup).join('')}</div>
    <div class="day-switcher">
      <button type="button" ${previous ? `data-day="${previous.id}"` : 'disabled'}>${previous ? `← ${previous.shortDay} ${previous.number}` : 'Start of trip'}</button>
      <button type="button" ${next ? `data-day="${next.id}"` : 'disabled'}>${next ? `${next.shortDay} ${next.number} →` : 'End of trip'}</button>
    </div>`;

  showPanel('dayView', false);
  if (updateHash) history.pushState({ day: id }, '', `#day-${id}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showPanel(id, updateHash = true) {
  panels.forEach(panel => panel.classList.toggle('active', panel.id === id));
  const navTarget = id === 'dayView' ? 'days' : id;
  navButtons.forEach(button => button.classList.toggle('active', button.dataset.panelTarget === navTarget));
  if (updateHash) {
    const hash = id === 'overview' ? '#overview' : `#${id}`;
    history.pushState({ panel: id }, '', hash);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleRoute() {
  const hash = window.location.hash || '#overview';
  if (hash.startsWith('#day-')) {
    openDay(hash.replace('#day-', ''), false);
    return;
  }
  const target = hash.slice(1);
  const valid = ['overview', 'days', 'nearby', 'info'];
  showPanel(valid.includes(target) ? target : 'overview', false);
}

function updateUpNext() {
  const now = new Date();
  const timedEvents = tripDays.flatMap(day => day.events
    .filter(event => event.dateTime)
    .map(event => ({ ...event, day }))
  ).sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
  const next = timedEvents.find(event => new Date(event.dateTime) >= now);
  const card = document.getElementById('upNext');

  if (!next) {
    card.innerHTML = '<div><span>Trip status</span><strong>Enjoy the memories!</strong></div><div class="time">Complete</div>';
    return;
  }

  const date = new Date(next.dateTime);
  const dateLabel = date.toLocaleDateString(undefined, { weekday: 'short' });
  const timeLabel = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  card.innerHTML = `<div><span>Up next</span><strong>${next.title}</strong></div><div class="time">${dateLabel} · ${timeLabel}</div>`;
}

document.addEventListener('click', event => {
  const dayButton = event.target.closest('[data-day]');
  if (dayButton) {
    openDay(dayButton.dataset.day);
    return;
  }

  const panelButton = event.target.closest('[data-panel-target]');
  if (panelButton) showPanel(panelButton.dataset.panelTarget);
});

window.addEventListener('popstate', handleRoute);

renderDayGrids();
renderNearby();
renderStatuses();
updateUpNext();
handleRoute();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  });
}
