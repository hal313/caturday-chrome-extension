# Changelog

All notable changes to this project are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.0.0] - 2026-11-23

### Added
- Options page, styled with Tailwind CSS, with sliding switches for "Animated cats only" and "Load a cat when opened".
- Settings are stored in `chrome.storage.sync`, so they follow the user across Chrome profiles signed in to the same Google account.
- Gear button in the popup that opens the options page.
- The Chrome Web Store's public `key` in the manifest, so unpacked builds get the store ID (`mcciciniemdaoljfnhgfahdhhkhefcfp`) on every machine and share synced settings. It is stripped from the release zip.
- Loading and error messages in the popup.

### Changed
- Upgraded to Manifest V3 (`action` replaces `browser_action`).
- Popup restyled with Tailwind CSS; jQuery and Bootstrap removed.
- Images now come from The Cat API `v1/images/search` endpoint; the legacy `api/images/get` endpoint returns 404.
- Replaced Grunt with npm scripts; `app/` loads directly as an unpacked extension (no `dist/`).
- Replaced JSHint with ESLint.

### Removed
- Grunt, JSHint, jQuery and Bootstrap.
- Travis CI configuration.

## [0.0.33]

- Last Manifest V2 release.
