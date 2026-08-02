/* Version 4 overrides: compact hero weather and no wine counter. */

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
