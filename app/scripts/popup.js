import { getSettings } from './settings.js';

const API_URL = 'https://api.thecatapi.com/v1/images/search';

const image = document.getElementById('main-image');
const status = document.getElementById('status');
const nextButton = document.getElementById('button-next');
const optionsButton = document.getElementById('button-options');

/**
 * Shows a status message in place of the image (or hides it when empty).
 *
 * @param {String} message the message to show.
 */
function showStatus(message) {
  status.textContent = message;
  status.hidden = !message;
  image.hidden = Boolean(message);
}

/**
 * Asks the cat API for a random image URL.
 *
 * @param {Boolean} animatedOnly true for GIFs only; false for still images.
 * @return {Promise<String>} the image URL.
 */
async function fetchImageUrl(animatedOnly) {
  const params = new URLSearchParams({ 'mime_types': animatedOnly ? 'gif' : 'jpg,png' });
  const response = await fetch(`${API_URL}?${params}`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Cat API responded with ${response.status}`);
  }
  const [result] = await response.json();
  if (!result || !result.url) {
    throw new Error('Cat API returned no image');
  }
  return result.url;
}

/**
 * Loads a new cat into the popup.
 */
async function populateImage() {
  nextButton.disabled = true;
  showStatus('Finding a cat…');
  try {
    const { animatedOnly } = await getSettings();
    const url = await fetchImageUrl(animatedOnly);
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = () => reject(new Error(`Could not load ${url}`));
      image.src = url;
    });
    showStatus('');
  } catch (error) {
    console.error(error);
    showStatus('The cats are napping. Try again in a moment.');
  } finally {
    nextButton.disabled = false;
  }
}

nextButton.addEventListener('click', populateImage);
optionsButton.addEventListener('click', () => chrome.runtime.openOptionsPage());

getSettings().then(({ loadOnOpen }) => {
  if (loadOnOpen) {
    populateImage();
  } else {
    showStatus('Press the button for a cat.');
  }
});
