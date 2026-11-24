# [Caturday Chrome Extension](https://github.com/hal313/caturday-chrome-extension)

[![Dependency Status](https://david-dm.org/hal313/caturday-chrome-extension.svg?style=flat-square)](https://david-dm.org/hal313/caturday-chrome-extension)[![DevDependency Status](https://david-dm.org/hal313/caturday-chrome-extension/dev-status.svg?style=flat-square)](https://david-dm.org/hal313/caturday-chrome-extension)


> Chrome extension to display kitties!

# Introduction
Need a break from all the depressing news? Too much work on your plate? If you are looking for a refreshing reminder of how amazing life is - look no further! With the press of a button, you will be served up a random image of cats! Even for dog lovers, this extension is pretty fun.


## Setup
Requires Node.js 20 or later.
```bash
npm install
```

## Run Locally
The `app/` directory is the extension itself and can be loaded as-is: open `chrome://extensions`, turn on **Developer mode**, choose **Load unpacked** and select `app/` ([Install Local Extensions](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked)).

The built Tailwind stylesheet (`app/styles/main.css`) is committed, so no build step is needed just to load the extension. While editing HTML or JS, keep the stylesheet up to date with:
```bash
npm start
```

## Settings Sync
Settings are saved with `chrome.storage.sync`, so they follow you to every Chrome profile signed in to the same Google account (with sync turned on).

Sync storage belongs to an extension ID. An unpacked extension normally gets a different ID on each machine, so `app/manifest.json` includes the Chrome Web Store's public `key`. That pins the unpacked ID to the store ID, `mcciciniemdaoljfnhgfahdhhkhefcfp`, everywhere. Load `app/` on two devices with the same Google account and the settings sync between them.

Because the IDs match, the unpacked build and the store version share synced settings, and Chrome runs only one of them per profile. The key is stripped from the release zip, since the store rejects uploads that contain one.

## Build
Rebuilds the minified Tailwind stylesheet.
```bash
npm run build
```

## Lint
```bash
npm run lint
```

## Debugging
See [Debugging extensions](https://developer.chrome.com/docs/extensions/get-started/tutorial/debug). Right-click the popup and choose **Inspect** to open its DevTools.

## Build For Release
Lints, rebuilds the stylesheet and writes `package/caturday-<version>.zip` for uploading to the [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole). The packaged `manifest.json` has the development `key` removed.
```bash
npm run release
```

Bump the version with `npm version patch` (or `minor`); `app/manifest.json` is updated to match automatically.

## Publish A Release
Publishing release requires some additional steps ([This](https://developer.chrome.com/webstore/using_webstore_api#beforeyoubegin) is a good primer and should provide all the information needed):
1. Create a Google Cloud project
1. Enable the Chrome Store API
3. Obtain API keys

You will end up with three pieces of information:
- clientId
- clientSecret
- refreshToken

It is important to note that when credentials are created, the type is "OAuth Client ID" with authorization type of "desktop app"; this will allow for offline tokens to be generated.

The npm script `npm run deploy` expects three environment variables:
- CLIENT_ID
- CLIENT_SECRET
- REFRESH_TOKEN

The npm script is useful for CD situations; most CD servers allow for environment variable substitution which allows the npm task to function correctly while also not requiring sensitive information to be commited to git.
```bash
npm run deploy
```

## Publish Procedure
Publishes are currently manual, though releases could be configured with a CD server (invoke `npm run deploy` as a build step).

In general, the steps are inspired from git-flow:
* Create a release branch
* Bump the version
* Build a deployable (`npm run release`)
* Commit the version bump
* Merge the release branch into `master`
* Create a tag
* Merge the release branch into `develop`
* Remove the release branch
* Push branches and tags
* Deploy the built artifact to the Chrome web store

This script is suitable for locally preparing a build and push changes to a CI/CD server for publishing to the Chrome Web Store.
```bash
./ext/scripts/release.sh
```

## Licence
This software is released under the [MIT Licence](https://raw.githubusercontent.com/hal313/caturday-chrome-extension/master/LICENSE).


## Table Of Contents
- [Caturday](#caturday)
- [Introduction](#introduction)
  - [Setup](#setup)
  - [Run Locally](#run-locally)
  - [Settings Sync](#settings-sync)
  - [Build](#build)
  - [Lint](#lint)
  - [Debugging](#debugging)
  - [Build For Release](#build-for-release)
  - [Publish A Release](#publish-a-release)
  - [Publish Procedure](#publish-procedure)
  - [Licence](#licence)
  - [Table Of Contents](#table-of-contents)
