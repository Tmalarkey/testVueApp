/* Version 5 overrides: compact hero weather, no wine counter, live itinerary. */

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

/* The shared bottle counter is intentionally disabled for now. */
async function loadWineCount() {}
async function changeWineCount() {}

/* Load the live Supabase-backed itinerary after the existing app code is available. */
(function activateLiveItinerary() {
  if (document.querySelector('script[data-live-itinerary]')) return;
  const script = document.createElement('script');
  script.src = './live-itinerary-v5.js?v=5';
  script.defer = true;
  script.dataset.liveItinerary = 'true';
  script.onerror = () => console.warn('Live itinerary loader unavailable; embedded schedule remains active.');
  document.head.appendChild(script);
})();
