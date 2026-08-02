const ORGANIZER_STORAGE_KEY = 'temecula-organizer-pin';
const ORGANIZER_ENDPOINT = 'https://qaehayouqwhtdqmmpgdj.supabase.co/functions/v1/manage-itinerary-v2';
let organizerPin = localStorage.getItem(ORGANIZER_STORAGE_KEY) || '';
let organizerSelectedDay = 0;
let organizerEditingActivity = null;

function minutesToTimeInput(minutes) {
  const hours = Math.floor(Number(minutes) / 60);
  const mins = Number(minutes) % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

function timeInputToMinutes(value) {
  const [hours, minutes] = String(value || '').split(':').map(Number);
  return hours * 60 + minutes;
}

function displayTimeFromInput(value) {
  const [hours, minutes] = String(value || '').split(':').map(Number);
  const suffix = hours >= 12 ? 'PM' : 'AM';
  const hour = hours % 12 || 12;
  return `${hour}:${String(minutes).padStart(2, '0')} ${suffix}`;
}

async function organizerRequest(payload) {
  const response = await fetch(ORGANIZER_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, pin: organizerPin })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Organizer request failed');
  return data;
}

function organizerNavButton() {
  return document.querySelector('.nav-button[data-panel-target="edit"]');
}

function setOrganizerUnlocked(unlocked) {
  const editNav = organizerNavButton();
  const quickEdit = document.querySelector('.quick-link[data-panel-target="edit"]');
  if (editNav) editNav.classList.toggle('organizer-hidden', !unlocked);
  if (quickEdit) quickEdit.classList.toggle('organizer-hidden', !unlocked);
  document.body.classList.toggle('organizer-enabled', unlocked);
  renderOrganizerInfo();
  renderOrganizerEditor();
}

function renderOrganizerInfo() {
  const info = document.getElementById('info');
  if (!info) return;
  let card = document.getElementById('organizerAccessCard');
  if (!card) {
    card = document.createElement('div');
    card.id = 'organizerAccessCard';
    card.className = 'organizer-card';
    const header = info.querySelector('.day-header');
    header?.insertAdjacentElement('afterend', card);
  }

  if (organizerPin) {
    card.innerHTML = `
      <h3>Organizer Mode</h3>
      <p>This iPhone can make shared itinerary changes.</p>
      <div class="organizer-status">✓ Organizer mode enabled</div>
      <button class="organizer-lock-button" id="organizerLockButton" type="button">Lock Organizer Mode</button>`;
    card.querySelector('#organizerLockButton')?.addEventListener('click', () => {
      organizerPin = '';
      localStorage.removeItem(ORGANIZER_STORAGE_KEY);
      showPanel('info');
      setOrganizerUnlocked(false);
      if (typeof showToast === 'function') showToast('Organizer mode locked.');
    });
  } else {
    card.innerHTML = `
      <h3>Organizer Mode</h3>
      <p>Unlock shared editing for this device.</p>
      <form class="organizer-unlock-form" id="organizerUnlockForm">
        <input name="pin" inputmode="numeric" pattern="[0-9]*" maxlength="4" autocomplete="one-time-code" placeholder="4-digit PIN" aria-label="Organizer PIN" required />
        <button type="submit">Unlock</button>
      </form>`;
    card.querySelector('#organizerUnlockForm')?.addEventListener('submit', async event => {
      event.preventDefault();
      const form = event.currentTarget;
      const pin = String(new FormData(form).get('pin') || '');
      const button = form.querySelector('button');
      button.disabled = true;
      button.textContent = 'Checking…';
      try {
        organizerPin = pin;
        await organizerRequest({ action: 'verify' });
        localStorage.setItem(ORGANIZER_STORAGE_KEY, organizerPin);
        setOrganizerUnlocked(true);
        if (typeof showToast === 'function') showToast('Organizer mode unlocked.');
      } catch (error) {
        organizerPin = '';
        localStorage.removeItem(ORGANIZER_STORAGE_KEY);
        if (typeof showToast === 'function') showToast(error.message);
        button.disabled = false;
        button.textContent = 'Unlock';
      }
    });
  }
}

function renderOrganizerEditor() {
  const edit = document.getElementById('edit');
  if (!edit) return;
  if (!organizerPin) {
    edit.innerHTML = `
      <div class="day-header"><div><h2>Edit Itinerary</h2><p>Organizer access is required.</p></div><button class="back-button" type="button" data-panel-target="info">Unlock</button></div>
      <div class="organizer-card"><h3>Organizer Mode Locked</h3><p>Open Trip Info and enter the shared organizer PIN.</p></div>`;
    bindDynamicControls(edit);
    return;
  }

  const selectedDay = tripDays[organizerSelectedDay] || tripDays[0];
  edit.innerHTML = `
    <div class="day-header">
      <div><h2>Edit Itinerary</h2><p>Changes save to Supabase for everyone.</p></div>
      <button class="back-button" type="button" data-panel-target="overview">Overview</button>
    </div>
    <div class="organizer-editor">
      <div class="organizer-toolbar">
        <select id="organizerDaySelect" aria-label="Choose day">${tripDays.map((day,index)=>`<option value="${index}" ${index===organizerSelectedDay?'selected':''}>${day.weekday} · ${day.dateShort}</option>`).join('')}</select>
        <button class="organizer-add-button" id="organizerAddButton" type="button">＋ Add</button>
      </div>
      <div class="organizer-list" id="organizerActivityList"></div>
    </div>`;

  const list = edit.querySelector('#organizerActivityList');
  const events = selectedDay?.events || [];
  list.innerHTML = events.length ? events.map(event => `
    <article class="organizer-row">
      <div class="organizer-row-icon">${event.icon || '✨'}</div>
      <div><small>${event.time || ''}</small><strong>${event.title}</strong><span>${event.location || 'No location'}</span></div>
      <button type="button" data-edit-activity="${event.id}" aria-label="Edit ${event.title}">✎</button>
    </article>`).join('') : '<div class="organizer-empty">No activities scheduled for this day.</div>';

  edit.querySelector('#organizerDaySelect')?.addEventListener('change', event => {
    organizerSelectedDay = Number(event.target.value);
    renderOrganizerEditor();
  });
  edit.querySelector('#organizerAddButton')?.addEventListener('click', () => openOrganizerSheet(null));
  edit.querySelectorAll('[data-edit-activity]').forEach(button => button.addEventListener('click', () => {
    const event = selectedDay.events.find(item => item.id === button.dataset.editActivity);
    openOrganizerSheet(event || null);
  }));
  bindDynamicControls(edit);
}

function closeOrganizerSheet() {
  document.getElementById('organizerModal')?.remove();
  organizerEditingActivity = null;
}

function openOrganizerSheet(activity) {
  organizerEditingActivity = activity;
  const day = tripDays[organizerSelectedDay] || tripDays[0];
  const start = activity ? minutesToTimeInput(activity.start) : '12:00';
  const end = activity ? minutesToTimeInput(activity.end) : '13:00';
  const modal = document.createElement('div');
  modal.id = 'organizerModal';
  modal.className = 'organizer-modal';
  modal.innerHTML = `
    <div class="organizer-sheet" role="dialog" aria-modal="true" aria-labelledby="organizerSheetTitle">
      <div class="organizer-sheet-head"><h3 id="organizerSheetTitle">${activity ? 'Edit Activity' : 'Add Activity'}</h3><button class="organizer-close" type="button" aria-label="Close">×</button></div>
      <form class="organizer-form" id="organizerActivityForm">
        <label>Day<select name="dayDate">${tripDays.map((item,index)=>`<option value="${item.dayDate || `2026-08-${String(index+2).padStart(2,'0')}`}" ${index===organizerSelectedDay?'selected':''}>${item.weekday}</option>`).join('')}</select></label>
        <label>Activity<input name="title" maxlength="80" value="${activity?.title || ''}" required /></label>
        <div class="organizer-form-grid"><label>Start<input name="start" type="time" value="${start}" required /></label><label>End<input name="end" type="time" value="${end}" required /></label></div>
        <div class="organizer-form-grid"><label>Icon<input name="icon" maxlength="4" value="${activity?.icon || '✨'}" /></label><label>Status<input name="statusLabel" maxlength="40" value="${activity?.confirmed ? 'Confirmed' : ''}" placeholder="Optional" /></label></div>
        <label>Location<input name="location" maxlength="100" value="${activity?.location || ''}" /></label>
        <label>Google Maps search<input name="directionsQuery" maxlength="140" value="${activity?.directions || ''}" /></label>
        <label>Notes<textarea name="notes" rows="3" maxlength="300">${activity?.note || ''}</textarea></label>
        <label class="organizer-check"><input name="isConfirmed" type="checkbox" ${activity?.confirmed ? 'checked' : ''}/> Confirmed reservation or booking</label>
        <div class="organizer-form-actions">
          ${activity ? '<button class="organizer-delete" type="button" id="organizerDeleteButton">Delete</button>' : '<button class="organizer-delete" type="button" id="organizerCancelButton">Cancel</button>'}
          <button class="organizer-save" type="submit">Save</button>
        </div>
      </form>
    </div>`;
  document.body.appendChild(modal);
  modal.querySelector('.organizer-close')?.addEventListener('click', closeOrganizerSheet);
  modal.addEventListener('click', event => { if (event.target === modal) closeOrganizerSheet(); });
  modal.querySelector('#organizerCancelButton')?.addEventListener('click', closeOrganizerSheet);
  modal.querySelector('#organizerDeleteButton')?.addEventListener('click', deleteOrganizerActivity);
  modal.querySelector('#organizerActivityForm')?.addEventListener('submit', saveOrganizerActivity);
}

async function reloadLiveItinerary() {
  if (typeof loadLiveItinerary === 'function') await loadLiveItinerary();
  renderOrganizerEditor();
}

async function saveOrganizerActivity(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const modal = document.getElementById('organizerModal');
  modal?.classList.add('organizer-working');
  const values = Object.fromEntries(new FormData(form).entries());
  const startMinutes = timeInputToMinutes(values.start);
  const endMinutes = timeInputToMinutes(values.end);
  const payload = {
    action: organizerEditingActivity ? 'update' : 'create',
    activityId: organizerEditingActivity?.id,
    dayDate: values.dayDate,
    title: values.title,
    displayTime: displayTimeFromInput(values.start),
    startMinutes,
    endMinutes,
    icon: values.icon || '✨',
    statusLabel: values.statusLabel || null,
    location: values.location || null,
    directionsQuery: values.directionsQuery || null,
    notes: values.notes || null,
    isConfirmed: form.elements.isConfirmed.checked
  };
  try {
    await organizerRequest(payload);
    closeOrganizerSheet();
    await reloadLiveItinerary();
    if (typeof showToast === 'function') showToast('Itinerary updated for everyone.');
  } catch (error) {
    modal?.classList.remove('organizer-working');
    if (typeof showToast === 'function') showToast(error.message);
  }
}

async function deleteOrganizerActivity() {
  if (!organizerEditingActivity || !confirm(`Delete “${organizerEditingActivity.title}”?`)) return;
  const modal = document.getElementById('organizerModal');
  modal?.classList.add('organizer-working');
  try {
    await organizerRequest({ action: 'delete', activityId: organizerEditingActivity.id });
    closeOrganizerSheet();
    await reloadLiveItinerary();
    if (typeof showToast === 'function') showToast('Activity deleted.');
  } catch (error) {
    modal?.classList.remove('organizer-working');
    if (typeof showToast === 'function') showToast(error.message);
  }
}

async function initializeOrganizerMode() {
  renderOrganizerInfo();
  setOrganizerUnlocked(Boolean(organizerPin));
  if (organizerPin) {
    try { await organizerRequest({ action: 'verify' }); }
    catch {
      organizerPin = '';
      localStorage.removeItem(ORGANIZER_STORAGE_KEY);
      setOrganizerUnlocked(false);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initializeOrganizerMode, 150);
});
