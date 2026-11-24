import { getSettings, saveSettings, onSettingsChanged } from './settings.js';

const form = document.getElementById('options-form');
const status = document.getElementById('status');
let statusTimer;

/**
 * Briefly shows a status message.
 *
 * @param {String} message the message to show.
 */
function flashStatus(message) {
  status.textContent = message;
  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => {
    status.textContent = '';
  }, 2000);
}

/**
 * Sets each switch from the given settings.
 *
 * @param {Object} settings settings keyed by input name.
 */
function render(settings) {
  Object.entries(settings).forEach(([name, value]) => {
    const input = form.elements.namedItem(name);
    if (input && input.type === 'checkbox') {
      input.checked = Boolean(value);
    }
  });
}

// Save each switch as soon as it is flipped
form.addEventListener('change', async (event) => {
  const input = event.target;
  try {
    await saveSettings({ [input.name]: input.checked });
    flashStatus('Saved');
  } catch (error) {
    console.error(error);
    input.checked = !input.checked;
    flashStatus('Could not save that setting. Please try again.');
  }
});

// Reflect changes made elsewhere (another tab or another synced device)
onSettingsChanged(render);

getSettings().then(render);
