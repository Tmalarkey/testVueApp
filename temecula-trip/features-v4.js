/* Version 6 overrides: compact hero weather, live itinerary and shared organizer editing. */

async function loadWeather() {
  const card = document.getElementById('weatherCard');
  if (!card) return;

  try {
    const response = await fetch(WEATHER_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error('Weather unavailable');

    const data = await response.json();
    const current = data.current;
    const [label, icon] = weatherDescriptions[current.weather_code] || [
      'Current conditions',
      current.is_day ? '🌤️' : '🌙'
    ];

    card.setAttribute('aria-label', `Temecula weather: ${Math.round(current.temperature_2m)} degrees and ${label}`);
    card.innerHTML = `
      <div class="weather-main">
        <span class="weather-icon" aria-hidden="true">${icon}</span>
        <div>
          <small>Temecula</small>
          <strong>${Math.round(current.temperature_2m)}°</strong>
          <span>${label}</span>
        </div>
      </div>`;
  } catch {
    card.setAttribute('aria-label', 'Temecula weather temporarily unavailable');
    card.innerHTML = `
      <div class="weather-error">
        <span aria-hidden="true">🌤️</span>
        <div><strong>Weather unavailable</strong></div>
      </div>`;
  }
}

async function loadWineCount() {}
async function changeWineCount() {}

(function activateLiveApp() {
  const organizerStyle = document.createElement('link');
  organizerStyle.rel = 'stylesheet';
  organizerStyle.href = './organizer-v6.css?v=6';
  organizerStyle.dataset.organizerStyle = 'true';
  document.head.appendChild(organizerStyle);

  const hideOrganizerControls = () => {
    document.querySelector('.nav-button[data-panel-target="edit"]')?.classList.add('organizer-hidden');
    document.querySelector('.quick-link[data-panel-target="edit"]')?.classList.add('organizer-hidden');
  };
  hideOrganizerControls();

  const loadOrganizer = () => {
    if (document.querySelector('script[data-organizer-mode]')) return;
    const organizerScript = document.createElement('script');
    organizerScript.src = './organizer-v6.js?v=6';
    organizerScript.dataset.organizerMode = 'true';
    organizerScript.onload = () => {
      hideOrganizerControls();
      if (typeof initializeOrganizerMode === 'function') initializeOrganizerMode();
    };
    organizerScript.onerror = () => console.warn('Organizer mode failed to load.');
    document.head.appendChild(organizerScript);
  };

  if (!document.querySelector('script[data-live-itinerary]')) {
    const liveScript = document.createElement('script');
    liveScript.src = './live-itinerary-v5.js?v=6';
    liveScript.dataset.liveItinerary = 'true';
    liveScript.onload = loadOrganizer;
    liveScript.onerror = () => {
      console.warn('Live itinerary loader unavailable; embedded schedule remains active.');
      loadOrganizer();
    };
    document.head.appendChild(liveScript);
  } else {
    loadOrganizer();
  }
})();
