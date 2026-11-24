/**
 * Settings shared by the popup and the options page.
 *
 * Settings live in chrome.storage.sync so they follow the user to every
 * Chrome profile signed in to the same Google account.
 */

export const DEFAULT_SETTINGS = Object.freeze({
  // Only show animated GIFs (the original behavior); otherwise show still images
  animatedOnly: true,
  // Fetch a cat as soon as the popup opens
  loadOnOpen: true
});

/**
 * Reads all settings, filling in defaults for anything not yet stored.
 *
 * @return {Promise<Object>} the current settings.
 */
export function getSettings() {
  return chrome.storage.sync.get(DEFAULT_SETTINGS);
}

/**
 * Saves one or more settings.
 *
 * @param {Object} changes the settings to save.
 * @return {Promise<void>}
 */
export function saveSettings(changes) {
  return chrome.storage.sync.set(changes);
}

/**
 * Calls back with the changed values whenever settings change, including
 * changes synced from another device.
 *
 * @param {function(Object)} callback receives an object of changed settings.
 */
export function onSettingsChanged(callback) {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'sync') {
      return;
    }
    const changed = {};
    Object.keys(changes)
      .filter((key) => key in DEFAULT_SETTINGS)
      .forEach((key) => {
        changed[key] = 'newValue' in changes[key] ? changes[key].newValue : DEFAULT_SETTINGS[key];
      });
    if (Object.keys(changed).length) {
      callback(changed);
    }
  });
}
