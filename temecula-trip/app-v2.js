const HOME_ADDRESS = '35298 Calle Campo, Temecula, CA';
const googleDirections = destination => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;

const tripDays = [
  {
    id: 'sun', weekday: 'Sunday', shortDay: 'SUN', date: 'August 2', dateShort: 'Aug 2', number: '2', accent: '#df7664',
    summary: 'Arrival and an easy evening settling into the house.',
    events: [
      { time: '4:00 PM', start: 960, end: 1320, title: 'Arrive at the house', location: HOME_ADDRESS, note: 'Settle in, unpack and enjoy an easy first evening.', icon: '🏡', dateTime: '2026-08-02T16:00:00', directions: HOME_ADDRESS }
    ],
    slots: [
      { start: 480, end: 960, title: 'Travel day', detail: 'Make your way to Temecula and enjoy an unhurried arrival.', icon: '🚗' },
      { start: 960, end: 1320, title: 'Arrive and settle in', detail: 'Check in at 4:00 PM, unpack and relax at the house.', icon: '🏡' }
    ]
  },
  {
    id: 'mon', weekday: 'Monday', shortDay: 'MON', date: 'August 3', dateShort: 'Aug 3', number: '3', accent: '#e18b6c',
    summary: 'Free time at the house, then dinner at Ponte.', status: 'Dinner confirmed',
    events: [
      { time: 'Morning', start: 480, end: 1020, title: 'Hang out at the house / free time', location: 'Temecula home base', note: 'A deliberately relaxed start to the trip.', icon: '☀️' },
      { time: '5:30 PM', start: 1050, end: 1200, title: 'Dinner reservation', location: 'Ponte Winery', note: 'About a 5 minute drive.', icon: '🍷', confirmed: true, dateTime: '2026-08-03T17:30:00', directions: 'Ponte Winery Temecula CA' }
    ],
    slots: [
      { start: 480, end: 1020, title: 'Free time at the house', detail: 'Pool, games, snacks and an easy family day.', icon: '☀️' },
      { start: 1020, end: 1050, title: 'Get ready for dinner', detail: 'Ponte is only about a 5 minute drive.', icon: '✨' },
      { start: 1050, end: 1200, title: 'Dinner at Ponte', detail: 'Reservation confirmed for 5:30 PM.', icon: '🍷' },
      { start: 1200, end: 1320, title: 'Relax at the house', detail: 'Wind down after dinner.', icon: '🌙' }
    ]
  },
  {
    id: 'tue', weekday: 'Tuesday', shortDay: 'TUE', date: 'August 4', dateShort: 'Aug 4', number: '4', accent: '#d99a52',
    summary: "Pennypickle's, naps, games and a family wine-tasting evening.",
    events: [
      { time: '10:00 AM–12:00 PM', start: 600, end: 720, title: "Pennypickle's Workshop", location: "Pennypickle's Workshop, Old Town Temecula", note: 'About a 17 minute drive. Entry runs in sessions; 10–12 is the first session.', icon: '🎨', directions: "Pennypickle's Workshop Temecula CA" },
      { time: '11:45 AM', start: 705, end: 870, title: 'Home for naps', location: 'Temecula home base', note: 'Dad & I can taste at Palumbo or Doffo during nap time.', icon: '😴' },
      { time: '3:00 PM', start: 900, end: 1050, title: 'Play games at home', location: 'Temecula home base', icon: '🎲' },
      { time: '6:00 PM', start: 1080, end: 1320, title: 'Takeout dinner', location: 'Temecula home base', note: 'Family wine tasting evening.', icon: '🍕' }
    ],
    slots: [
      { start: 480, end: 585, title: 'Easy morning at the house', detail: 'Breakfast and time to get ready for Old Town.', icon: '🥐' },
      { start: 585, end: 720, title: "Pennypickle's Workshop", detail: '10:00 AM–12:00 PM in Old Town. First session of the day.', icon: '🎨' },
      { start: 720, end: 870, title: 'Naps + parent wine tasting', detail: 'Home for naps; Palumbo or Doffo are the tasting options.', icon: '😴' },
      { start: 870, end: 1050, title: 'Games at the house', detail: 'Planned game time starts around 3:00 PM.', icon: '🎲' },
      { start: 1050, end: 1320, title: 'Takeout + family tasting', detail: 'Dinner around 6:00 PM with a family wine-tasting evening.', icon: '🍕' }
    ]
  },
  {
    id: 'wed', weekday: 'Wednesday', shortDay: 'WED', date: 'August 5', dateShort: 'Aug 5', number: '5', accent: '#b65a74',
    summary: 'A relaxed morning, Danza Del Sol tasting and dinner at 1909.', status: 'Driver + dinner confirmed',
    events: [
      { time: 'Morning', start: 480, end: 690, title: 'Hang out at the house / free time', location: 'Temecula home base', icon: '☀️' },
      { time: '11:30 AM', start: 690, end: 920, title: 'Home for naps', location: 'Temecula home base', icon: '😴' },
      { time: '3:20 PM', start: 920, end: 930, title: 'Driver pickup', location: 'Temecula home base', note: 'Driver is booked.', icon: '🚙', confirmed: true, dateTime: '2026-08-05T15:20:00' },
      { time: '3:30–5:00 PM', start: 930, end: 1020, title: 'Wine tasting', location: 'Danza Del Sol Winery', icon: '🍇', directions: 'Danza Del Sol Winery Temecula CA' },
      { time: '5:30 PM', start: 1050, end: 1200, title: 'Dinner reservation', location: '1909 Temecula', note: 'About a 22 minute drive. Reservation confirmed.', icon: '🍽️', confirmed: true, dateTime: '2026-08-05T17:30:00', directions: '1909 Temecula CA' }
    ],
    slots: [
      { start: 480, end: 690, title: 'Free time at the house', detail: 'A slow morning before naps and the winery outing.', icon: '☀️' },
      { start: 690, end: 920, title: 'Nap time', detail: 'Home for naps beginning around 11:30 AM.', icon: '😴' },
      { start: 920, end: 930, title: 'Driver pickup', detail: 'The booked driver arrives at 3:20 PM.', icon: '🚙' },
      { start: 930, end: 1020, title: 'Danza Del Sol tasting', detail: 'Wine tasting from 3:30–5:00 PM.', icon: '🍇' },
      { start: 1020, end: 1050, title: 'Ride to dinner', detail: 'Head to Old Town for the 5:30 PM reservation.', icon: '🚙' },
      { start: 1050, end: 1200, title: 'Dinner at 1909 Temecula', detail: 'Reservation confirmed for 5:30 PM.', icon: '🍽️' },
      { start: 1200, end: 1320, title: 'Back to the house', detail: 'Relax after the full wine-country afternoon.', icon: '🌙' }
    ]
  },
  {
    id: 'thu', weekday: 'Thursday', shortDay: 'THU', date: 'August 6', dateShort: 'Aug 6', number: '6', accent: '#769160',
    summary: 'Sugarplum Zoo, naps, a Weins tasting and chef dinner.', status: 'Chef confirmed',
    events: [
      { time: '9:00 AM', start: 540, end: 660, title: 'Sugarplum Zoo', location: 'Sugarplum Farm', note: 'About a 6 minute drive. Opens at 9:00 AM.', icon: '🐾', directions: 'Sugarplum Farm Temecula CA' },
      { time: '11:00 AM', start: 660, end: 900, title: 'Home for naps', location: 'Temecula home base', note: 'Dad & I have a Weins wine tasting reservation at 12:00 PM.', icon: '😴' },
      { time: '12:00 PM', start: 720, end: 840, title: 'Dad & I wine tasting', location: 'Weins Cellars', icon: '🍷', directions: 'Weins Cellars Temecula CA' },
      { time: '6:00 PM', start: 1080, end: 1320, title: 'Chef dinner', location: 'Temecula home base', note: 'Confirmed.', icon: '👩‍🍳', confirmed: true, dateTime: '2026-08-06T18:00:00' }
    ],
    slots: [
      { start: 480, end: 540, title: 'Breakfast + get ready', detail: 'A quick morning before the zoo opens.', icon: '🥐' },
      { start: 540, end: 660, title: 'Sugarplum Zoo', detail: 'Planned for 9:00 AM; it is about a 6 minute drive.', icon: '🐾' },
      { start: 660, end: 720, title: 'Home for naps', detail: 'Nap time starts around 11:00 AM.', icon: '😴' },
      { start: 720, end: 840, title: 'Weins wine tasting', detail: 'Dad & I have a reservation at noon while the family is home for naps.', icon: '🍷' },
      { start: 840, end: 1080, title: 'Free afternoon at the house', detail: 'Pool, rest and time to get ready for dinner.', icon: '🕶️' },
      { start: 1080, end: 1320, title: 'Chef dinner at the house', detail: 'Confirmed for 6:00 PM.', icon: '👩‍🍳' }
    ]
  },
  {
    id: 'fri', weekday: 'Friday', shortDay: 'FRI', date: 'August 7', dateShort: 'Aug 7', number: '7', accent: '#8b6aa2',
    summary: 'Free time, Lorenzi Estate and dinner at Oscar’s.', status: 'Both reservations confirmed',
    events: [
      { time: 'Morning', start: 480, end: 660, title: 'Free time', location: 'Temecula home base', icon: '🕶️' },
      { time: '11:00 AM', start: 660, end: 840, title: 'Dad & I wine tasting', location: 'Lorenzi Estate Vineyards', note: 'Reservation confirmed.', icon: '🍷', confirmed: true, dateTime: '2026-08-07T11:00:00', directions: 'Lorenzi Estate Vineyards Temecula CA' },
      { time: '5:00 PM', start: 1020, end: 1200, title: 'Dinner reservation', location: "Oscar's Brewing Company", note: 'About a 15 minute drive. Reservation confirmed.', icon: '🍺', confirmed: true, dateTime: '2026-08-07T17:00:00', directions: "Oscar's Brewing Company Temecula CA" }
    ],
    slots: [
      { start: 480, end: 660, title: 'Free morning', detail: 'A relaxed start at the house.', icon: '🕶️' },
      { start: 660, end: 840, title: 'Lorenzi Estate tasting', detail: 'Dad & I have a confirmed reservation at 11:00 AM.', icon: '🍷' },
      { start: 840, end: 1020, title: 'Free afternoon', detail: 'Relax at the house before dinner.', icon: '☀️' },
      { start: 1020, end: 1200, title: "Dinner at Oscar's", detail: 'Reservation confirmed for 5:00 PM.', icon: '🍺' },
      { start: 1200, end: 1320, title: 'Last full evening', detail: 'Enjoy a relaxed night back at the house.', icon: '🌙' }
    ]
  },
  {
    id: 'sat', weekday: 'Saturday', shortDay: 'SAT', date: 'August 8', dateShort: 'Aug 8', number: '8', accent: '#dd8c76',
    summary: 'A relaxed final morning at Annie’s Café and Old Town.',
    events: [
      { time: '11:00 AM', start: 660, end: 780, title: "Annie's Café", location: "Annie's Cafe Temecula", note: 'Check the waitlist and call ahead. Brit-themed café.', icon: '☕', phone: '9512960107', directions: "Annie's Cafe Temecula CA" },
      { time: 'After brunch', start: 780, end: 1320, title: 'Explore Old Town / head home', location: 'Old Town Temecula', note: 'Keep the final day easy and flexible.', icon: '🌸', directions: 'Old Town Temecula CA' }
    ],
    slots: [
      { start: 480, end: 660, title: 'Easy final morning', detail: 'Pack up and take your time before brunch.', icon: '🧳' },
      { start: 660, end: 780, title: "Annie's Café", detail: 'Planned for 11:00 AM. Check the waitlist and call ahead.', icon: '☕' },
      { start: 780, end: 1320, title: 'Old Town + travel home', detail: 'A flexible finish to the family trip.', icon: '🌸' }
    ]
  }
];

const nearbyOptions = [
  { icon: '🐴', title: 'Longshadow Ranch', detail: 'Opens at 12:00 PM · about a 7 minute drive', destination: 'Longshadow Ranch Winery Temecula CA' },
  { icon: '🚜', title: 'Peltzer', detail: 'Opens at 1:00 PM · farm animals · about a 6 minute drive', destination: 'Peltzer Winery Temecula CA' },
  { icon: '🦆', title: 'Temecula Duck Pond', detail: 'Easy walk option · about a 14 minute drive', destination: 'Temecula Duck Pond Temecula CA' },
  { icon: '🛝', title: 'Harveston Community Park', detail: 'Playground and lake · about a 20 minute drive', destination: 'Harveston Community Park Temecula CA' }
];

const confirmations = [
  'Ponte dinner reservation · Monday at 5:30 PM',
  'Driver pickup · Wednesday at 3:20 PM',
  '1909 Temecula dinner reservation · Wednesday at 5:30 PM',
  'Chef dinner at the house · Thursday at 6:00 PM',
  'Lorenzi Estate Vineyards · Friday at 11:00 AM',
  "Oscar's Brewing Company · Friday at 5:00 PM"
];

const wheelTimes = Array.from({ length: 29 }, (_, index) => 480 + index * 30);
let explorerDayIndex = 0;
let selectedWheelIndex = 8;
let scrollTimer;

const minuteLabel = minutes => {
  const hour24 = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const suffix = hour24 >= 12 ? 'PM' : 'AM';
  const hour = hour24 % 12 || 12;
  return `${hour}:${String(mins).padStart(2, '0')} ${suffix}`;
};

const dayCard = day => `
  <button class="day-card" type="button" data-day-id="${day.id}" style="--day-accent:${day.accent}">
    <span class="day-date"><small>${day.shortDay}</small><strong>${day.number}</strong><small>AUG</small></span>
    <span class="day-copy"><strong>${day.weekday}</strong><span>${day.summary}</span>${day.status ? `<em class="day-status">${day.status}</em>` : ''}</span>
    <span class="day-arrow">›</span>
  </button>`;

function showPanel(panelId) {
  document.querySelectorAll('.panel').forEach(panel => panel.classList.toggle('active', panel.id === panelId));
  document.querySelectorAll('.nav-button').forEach(button => button.classList.toggle('active', button.dataset.panelTarget === panelId || (panelId === 'dayView' && button.dataset.panelTarget === 'days')));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openDay(dayId) {
  const dayIndex = tripDays.findIndex(day => day.id === dayId);
  const day = tripDays[dayIndex];
  if (!day) return;

  const eventMarkup = day.events.map(event => `
    <article class="timeline-item">
      <div class="timeline-time"><span>${event.icon} ${event.time}</span>${event.confirmed ? '<span class="confirmed">✓ Confirmed</span>' : ''}</div>
      <h3>${event.title}</h3>
      ${event.location ? `<div class="timeline-location">📍 ${event.location}</div>` : ''}
      ${event.note ? `<p class="timeline-note">${event.note}</p>` : ''}
      ${(event.directions || event.phone) ? `<div class="action-row">
        ${event.directions ? `<a class="action-link" href="${googleDirections(event.directions)}" target="_blank" rel="noopener">Google Maps</a>` : ''}
        ${event.phone ? `<a class="action-link secondary" href="tel:${event.phone}">Call 951-296-0107</a>` : ''}
      </div>` : ''}
    </article>`).join('');

  const previous = tripDays[dayIndex - 1];
  const next = tripDays[dayIndex + 1];
  document.getElementById('dayView').innerHTML = `
    <div class="detail-top">
      <button class="icon-button" type="button" data-panel-target="overview" aria-label="Back to overview">‹</button>
      <div class="detail-top-title"><small>${day.dateShort}</small><strong>${day.weekday}</strong></div>
      <button class="icon-button" type="button" data-panel-target="days" aria-label="All days">▦</button>
    </div>
    <div class="detail-hero">
      <span class="day-number">${day.shortDay} · AUG ${day.number}</span>
      <h2>${day.weekday}</h2>
      <p>${day.summary}</p>
    </div>
    <div class="timeline">${eventMarkup}</div>
    <div class="day-switcher">
      <button type="button" ${previous ? `data-day-id="${previous.id}"` : 'disabled'}>${previous ? `‹ ${previous.weekday}` : 'First day'}</button>
      <button type="button" ${next ? `data-day-id="${next.id}"` : 'disabled'}>${next ? `${next.weekday} ›` : 'Final day'}</button>
    </div>`;
  bindDynamicControls(document.getElementById('dayView'));
  showPanel('dayView');
}

function renderNearby() {
  document.getElementById('nearbyList').innerHTML = nearbyOptions.map(option => `
    <article class="nearby-card">
      <div class="nearby-icon">${option.icon}</div>
      <div><h3>${option.title}</h3><p>${option.detail}</p></div>
      <div class="action-row"><a class="action-link" href="${googleDirections(option.destination)}" target="_blank" rel="noopener">Google Maps</a></div>
    </article>`).join('');
}

function renderConfirmations() {
  document.getElementById('statusList').innerHTML = confirmations.map(item => `<div class="status-item"><span>✓</span><div>${item}</div></div>`).join('');
}

function renderUpNext() {
  const now = new Date();
  const datedEvents = tripDays.flatMap(day => day.events.filter(event => event.dateTime).map(event => ({ ...event, day })));
  const next = datedEvents.find(event => new Date(event.dateTime) >= now) || datedEvents[datedEvents.length - 1];
  const upNext = document.getElementById('upNext');
  upNext.dataset.dayId = next.day.id;
  upNext.innerHTML = `<span class="up-next-icon">${next.icon}</span><span class="up-next-copy"><small>Up next</small><strong>${next.title}</strong></span><span class="time">${next.day.shortDay} · ${next.time}</span>`;
}

function renderExplorerDays() {
  const picker = document.getElementById('explorerDayPicker');
  picker.innerHTML = tripDays.map((day, index) => `<button class="day-pill${index === explorerDayIndex ? ' active' : ''}" type="button" data-explorer-day="${index}">${day.shortDay} ${day.number}</button>`).join('');
  picker.querySelector('.active')?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

function renderTimeWheel() {
  const wheel = document.getElementById('timeWheel');
  wheel.innerHTML = `<div class="time-spacer" aria-hidden="true"></div>${wheelTimes.map((time, index) => `<div class="time-option${index === selectedWheelIndex ? ' selected' : ''}" data-time-index="${index}">${minuteLabel(time)}</div>`).join('')}<div class="time-spacer" aria-hidden="true"></div>`;
  requestAnimationFrame(() => {
    wheel.scrollTop = selectedWheelIndex * 42;
    updateTimeResult();
  });
}

function getSlot(day, minutes) {
  return day.slots.find(slot => minutes >= slot.start && minutes < slot.end) || day.slots[day.slots.length - 1];
}

function updateTimeResult() {
  const day = tripDays[explorerDayIndex];
  const selectedMinutes = wheelTimes[selectedWheelIndex];
  const slot = getSlot(day, selectedMinutes);
  document.querySelectorAll('.time-option').forEach((option, index) => option.classList.toggle('selected', index === selectedWheelIndex));
  document.getElementById('timeResult').innerHTML = `
    <span class="time-result-badge">${day.shortDay} ${day.number} · ${minuteLabel(selectedMinutes)}</span>
    <div class="time-result-icon">${slot.icon}</div>
    <h3>${slot.title}</h3>
    <p>${slot.detail}</p>
    <button class="tiny-next" type="button" data-day-id="${day.id}">View full ${day.weekday} plan →</button>`;
  bindDynamicControls(document.getElementById('timeResult'));
}

function handleWheelScroll() {
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    const wheel = document.getElementById('timeWheel');
    selectedWheelIndex = Math.max(0, Math.min(wheelTimes.length - 1, Math.round(wheel.scrollTop / 42)));
    wheel.scrollTo({ top: selectedWheelIndex * 42, behavior: 'smooth' });
    updateTimeResult();
  }, 90);
}

function selectExplorerDay(index) {
  explorerDayIndex = index;
  const defaultTime = tripDays[index].events[0]?.start || 720;
  selectedWheelIndex = Math.max(0, wheelTimes.findIndex(time => time >= defaultTime));
  renderExplorerDays();
  renderTimeWheel();
}

function bindDynamicControls(root = document) {
  root.querySelectorAll('[data-panel-target]').forEach(button => {
    if (button.dataset.bound) return;
    button.dataset.bound = 'true';
    button.addEventListener('click', () => showPanel(button.dataset.panelTarget));
  });
  root.querySelectorAll('[data-day-id]').forEach(button => {
    if (button.dataset.boundDay) return;
    button.dataset.boundDay = 'true';
    button.addEventListener('click', () => openDay(button.dataset.dayId));
  });
}

function init() {
  const cards = tripDays.map(dayCard).join('');
  document.getElementById('dayGrid').innerHTML = cards;
  document.getElementById('daysGrid').innerHTML = cards;
  renderNearby();
  renderConfirmations();
  renderUpNext();
  renderExplorerDays();
  renderTimeWheel();

  document.getElementById('timeWheel').addEventListener('scroll', handleWheelScroll, { passive: true });
  document.getElementById('explorerDayPicker').addEventListener('click', event => {
    const button = event.target.closest('[data-explorer-day]');
    if (button) selectExplorerDay(Number(button.dataset.explorerDay));
  });
  bindDynamicControls();

  document.getElementById('upNext').addEventListener('click', () => openDay(document.getElementById('upNext').dataset.dayId));

  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./service-worker.js').catch(() => {});
}

document.addEventListener('DOMContentLoaded', init);
