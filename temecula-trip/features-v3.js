function loadCustomPlans() {
  try { customPlans = JSON.parse(localStorage.getItem(CUSTOM_KEY) || '[]'); }
  catch { customPlans = []; }
  const params = new URLSearchParams(location.hash.replace(/^#/, ''));
  const payload = params.get('custom');
  if (!payload) return;
  try {
    const decoded = decodeURIComponent(escape(atob(payload.replace(/-/g, '+').replace(/_/g, '/'))));
    const imported = JSON.parse(decoded);
    if (Array.isArray(imported)) {
      customPlans = imported;
      saveCustomPlans(false);
      showToast('Customized plans imported from the shared link.');
    }
    history.replaceState(null, '', location.pathname + location.search);
  } catch { showToast('That customized itinerary link could not be imported.'); }
}

function saveCustomPlans(rerender = true) {
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(customPlans));
  if (rerender) refreshCustomViews();
}

function customEventsForDay(dayId) {
  return customPlans.filter(plan => plan.dayId === dayId).map(plan => ({
    ...plan,
    time: plan.timeLabel,
    start: plan.minutes,
    end: plan.minutes + 60,
    icon: '✨',
    custom: true
  }));
}

function mergedEvents(day) {
  return [...day.events, ...customEventsForDay(day.id)].sort((a, b) => (a.start ?? 9999) - (b.start ?? 9999));
}

const dayCard = day => {
  const extraCount = customPlans.filter(plan => plan.dayId === day.id).length;
  return `
    <button class="day-card" type="button" data-day-id="${day.id}" style="--day-accent:${day.accent}">
      <span class="day-date"><small>${day.shortDay}</small><strong>${day.number}</strong><small>AUG</small></span>
      <span class="day-copy"><strong>${day.weekday}</strong><span>${day.summary}</span>${day.status ? `<em class="day-status">${day.status}</em>` : ''}${extraCount ? `<em class="day-status custom-status">+${extraCount} custom</em>` : ''}</span>
      <span class="day-arrow">›</span>
    </button>`;
};

function photoMarkup(item, fallbackIcon) {
  if (!item.image) return '';
  return `<figure class="destination-photo" data-fallback="${escapeHtml(fallbackIcon || '📍')}">
    <img src="${item.image}" alt="${escapeHtml(item.imageAlt || item.title)}" loading="lazy" decoding="async" />
    ${item.photoSource ? `<figcaption>Photo: <a href="${item.photoSourceUrl}" target="_blank" rel="noopener">${escapeHtml(item.photoSource)}</a></figcaption>` : ''}
  </figure>`;
}

function showPanel(panelId) {
  document.querySelectorAll('.panel').forEach(panel => panel.classList.toggle('active', panel.id === panelId));
  document.querySelectorAll('.nav-button').forEach(button => button.classList.toggle('active', button.dataset.panelTarget === panelId || (panelId === 'dayView' && button.dataset.panelTarget === 'days')));
  if (panelId === 'edit') renderEditor();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openDay(dayId) {
  const dayIndex = tripDays.findIndex(day => day.id === dayId);
  const day = tripDays[dayIndex];
  if (!day) return;

  const eventMarkup = mergedEvents(day).map(event => `
    <article class="timeline-item${event.custom ? ' custom-timeline-item' : ''}">
      ${photoMarkup(event, event.icon)}
      <div class="timeline-time"><span>${event.icon} ${escapeHtml(event.time)}</span>${event.confirmed ? '<span class="confirmed">✓ Confirmed</span>' : ''}${event.custom ? '<span class="confirmed custom-badge">Custom</span>' : ''}</div>
      <h3>${escapeHtml(event.title)}</h3>
      ${event.location ? `<div class="timeline-location">📍 ${escapeHtml(event.location)}</div>` : ''}
      ${event.note ? `<p class="timeline-note">${escapeHtml(event.note)}</p>` : ''}
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
  bindImageFallbacks(document.getElementById('dayView'));
  showPanel('dayView');
}

function renderNearby() {
  document.getElementById('nearbyList').innerHTML = nearbyOptions.map(option => `
    <article class="nearby-card nearby-photo-card">
      ${photoMarkup(option, option.icon)}
      <div class="nearby-body">
        <span class="nearby-icon">${option.icon}</span>
        <div><h3>${option.title}</h3><p>${option.detail}</p></div>
      </div>
      <div class="action-row"><a class="action-link" href="${googleDirections(option.destination)}" target="_blank" rel="noopener">Google Maps</a></div>
    </article>`).join('');
  bindImageFallbacks(document.getElementById('nearbyList'));
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
  const custom = customEventsForDay(day.id).find(event => minutes >= event.start && minutes < event.end);
  if (custom) return { title: custom.title, detail: custom.note || custom.location || 'A custom addition to the itinerary.', icon: '✨', custom: true };
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
    <h3>${escapeHtml(slot.title)}</h3>
    <p>${escapeHtml(slot.detail)}</p>
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
  const defaultTime = mergedEvents(tripDays[index])[0]?.start || 720;
  selectedWheelIndex = Math.max(0, wheelTimes.findIndex(time => time >= defaultTime));
  renderExplorerDays();
  renderTimeWheel();
}

const weatherDescriptions = {
  0: ['Clear', '☀️'], 1: ['Mostly clear', '🌤️'], 2: ['Partly cloudy', '⛅'], 3: ['Cloudy', '☁️'],
  45: ['Foggy', '🌫️'], 48: ['Foggy', '🌫️'], 51: ['Light drizzle', '🌦️'], 53: ['Drizzle', '🌦️'], 55: ['Heavy drizzle', '🌧️'],
  61: ['Light rain', '🌦️'], 63: ['Rain', '🌧️'], 65: ['Heavy rain', '🌧️'], 71: ['Light snow', '🌨️'], 73: ['Snow', '🌨️'], 75: ['Heavy snow', '❄️'],
  80: ['Light showers', '🌦️'], 81: ['Showers', '🌧️'], 82: ['Heavy showers', '⛈️'], 95: ['Thunderstorms', '⛈️'], 96: ['Thunderstorms', '⛈️'], 99: ['Thunderstorms', '⛈️']
};

async function loadWeather() {
  const card = document.getElementById('weatherCard');
  try {
    const response = await fetch(WEATHER_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error('Weather unavailable');
    const data = await response.json();
    const current = data.current;
    const daily = data.daily;
    const [label, icon] = weatherDescriptions[current.weather_code] || ['Current conditions', current.is_day ? '🌤️' : '🌙'];
    card.innerHTML = `
      <div class="weather-main">
        <span class="weather-icon">${icon}</span>
        <div><small>Temecula right now</small><strong>${Math.round(current.temperature_2m)}°</strong><span>${label}</span></div>
      </div>
      <div class="weather-stats">
        <div><small>Feels</small><strong>${Math.round(current.apparent_temperature)}°</strong></div>
        <div><small>High / low</small><strong>${Math.round(daily.temperature_2m_max[0])}° / ${Math.round(daily.temperature_2m_min[0])}°</strong></div>
        <div><small>Rain</small><strong>${daily.precipitation_probability_max[0] ?? 0}%</strong></div>
        <div><small>Humidity</small><strong>${Math.round(current.relative_humidity_2m)}%</strong></div>
      </div>
      <p class="weather-foot">Updated ${new Date(current.time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} · forecast data from Open-Meteo</p>`;
  } catch {
    card.innerHTML = `<div class="weather-error"><span>🌤️</span><div><strong>Weather is taking a quick break</strong><p>Tap to try loading current Temecula conditions again.</p></div><button type="button" id="retryWeather">Retry</button></div>`;
    document.getElementById('retryWeather')?.addEventListener('click', loadWeather);
  }
}

function extractCounterValue(data) {
  if (typeof data === 'number') return data;
  return Number(data?.count ?? data?.value ?? data?.result ?? 0) || 0;
}

async function loadWineCount() {
  const value = document.getElementById('wineCount');
  try {
    const response = await fetch(COUNTER_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error('counter missing');
    wineCount = extractCounterValue(await response.json());
  } catch { wineCount = Number(localStorage.getItem('temecula-wine-count-fallback') || 0); }
  value.textContent = wineCount;
}

async function changeWineCount(direction) {
  const controls = document.querySelectorAll('[data-wine-action]');
  controls.forEach(button => { button.disabled = true; });
  try {
    if (direction === 'down' && wineCount <= 0) return;
    const response = await fetch(`${COUNTER_URL}/${direction}`, { cache: 'no-store' });
    if (!response.ok) throw new Error('counter failed');
    wineCount = extractCounterValue(await response.json());
  } catch {
    wineCount = Math.max(0, wineCount + (direction === 'up' ? 1 : -1));
    localStorage.setItem('temecula-wine-count-fallback', String(wineCount));
    showToast('The shared counter was offline, so this update is saved on this device for now.');
  } finally {
    const value = document.getElementById('wineCount');
    value.textContent = wineCount;
    value.classList.remove('counter-pop');
    requestAnimationFrame(() => value.classList.add('counter-pop'));
    controls.forEach(button => { button.disabled = false; });
  }
}

function renderEditor() {
  const daySelect = document.getElementById('editDay');
  if (daySelect && !daySelect.options.length) daySelect.innerHTML = tripDays.map(day => `<option value="${day.id}">${day.weekday}, ${day.date}</option>`).join('');
  const list = document.getElementById('customPlanList');
  if (!list) return;
  if (!customPlans.length) {
    list.innerHTML = '<div class="empty-state">No custom plans added yet. Your original itinerary is untouched.</div>';
    return;
  }
  list.innerHTML = customPlans.sort((a, b) => tripDays.findIndex(day => day.id === a.dayId) - tripDays.findIndex(day => day.id === b.dayId) || a.minutes - b.minutes).map(plan => {
    const day = tripDays.find(item => item.id === plan.dayId);
    return `<article class="custom-plan-row"><div><small>${day.shortDay} ${day.number} · ${escapeHtml(plan.timeLabel)}</small><strong>${escapeHtml(plan.title)}</strong>${plan.note ? `<span>${escapeHtml(plan.note)}</span>` : ''}</div><button type="button" data-delete-plan="${plan.id}" aria-label="Delete ${escapeHtml(plan.title)}">×</button></article>`;
  }).join('');
  list.querySelectorAll('[data-delete-plan]').forEach(button => button.addEventListener('click', () => {
    customPlans = customPlans.filter(plan => plan.id !== button.dataset.deletePlan);
    saveCustomPlans();
    showToast('Custom plan removed.');
  }));
}

function addCustomPlan(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const time = data.get('time');
  const title = String(data.get('title') || '').trim();
  if (!time || !title) return;
  customPlans.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    dayId: data.get('day'),
    timeLabel: new Date(`2000-01-01T${time}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
    minutes: timeToMinutes(time),
    title,
    location: String(data.get('location') || '').trim(),
    note: String(data.get('note') || '').trim()
  });
  saveCustomPlans();
  form.reset();
  showToast('Plan added to this itinerary.');
}

function encodeCustomPlans() {
  const json = JSON.stringify(customPlans);
  return btoa(unescape(encodeURIComponent(json))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function shareCustomizedItinerary() {
  if (!customPlans.length) { showToast('Add at least one custom plan before sharing.'); return; }
  const url = `${location.origin}${location.pathname}#custom=${encodeCustomPlans()}`;
  if (navigator.share) {
    try { await navigator.share({ title: 'Customized Temecula itinerary', text: 'Here is the updated family itinerary.', url }); return; }
    catch (error) { if (error.name === 'AbortError') return; }
  }
  window.prompt('Copy this customized itinerary link:', url);
}

function refreshCustomViews() {
  const cards = tripDays.map(dayCard).join('');
  document.getElementById('dayGrid').innerHTML = cards;
  document.getElementById('daysGrid').innerHTML = cards;
  bindDynamicControls(document.getElementById('dayGrid'));
  bindDynamicControls(document.getElementById('daysGrid'));
  renderEditor();
  updateTimeResult();
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function bindImageFallbacks(root = document) {
  root.querySelectorAll('.destination-photo img').forEach(image => {
    if (image.dataset.boundError) return;
    image.dataset.boundError = 'true';
    image.addEventListener('error', () => image.closest('.destination-photo')?.classList.add('image-failed'));
  });
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
  loadCustomPlans();
  const cards = tripDays.map(dayCard).join('');
  document.getElementById('dayGrid').innerHTML = cards;
  document.getElementById('daysGrid').innerHTML = cards;
  renderNearby();
  renderConfirmations();
  renderUpNext();
  renderExplorerDays();
  renderTimeWheel();
  renderEditor();
  loadWeather();
  loadWineCount();

  document.getElementById('timeWheel').addEventListener('scroll', handleWheelScroll, { passive: true });
  document.getElementById('explorerDayPicker').addEventListener('click', event => {
    const button = event.target.closest('[data-explorer-day]');
    if (button) selectExplorerDay(Number(button.dataset.explorerDay));
  });
  document.getElementById('upNext').addEventListener('click', () => openDay(document.getElementById('upNext').dataset.dayId));
  document.getElementById('customPlanForm').addEventListener('submit', addCustomPlan);
  document.getElementById('shareCustomPlans').addEventListener('click', shareCustomizedItinerary);
  document.getElementById('resetCustomPlans').addEventListener('click', () => {
    if (!customPlans.length || window.confirm('Remove all custom additions from this device?')) {
      customPlans = [];
      saveCustomPlans();
      showToast('Custom additions cleared.');
    }
  });
  document.querySelectorAll('[data-wine-action]').forEach(button => button.addEventListener('click', () => changeWineCount(button.dataset.wineAction)));
  bindDynamicControls();
  bindImageFallbacks();

  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./service-worker.js').catch(() => {});
}

document.addEventListener('DOMContentLoaded', init);
