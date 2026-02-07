# ogu-adblock

web extension to block rainbet ads on oguser.com.

## how to use

support for firefox and chrome is included.
- firefox: you can install the extension from its [firefox add-ons page](https://addons.mozilla.org/en-US/firefox/addon/oguadblock/)
- chrome: you can download **chrome.zip** from the [releases section](https://github.com/182exe/ogu-adblock/releases/) and load it unpacked. open **chrome://extensions**, turn on Developer Mode, unzip the download, then click “Load unpacked” and select the unzipped folder.

## build

```bash
npm install
npm run package:chrome
npm run package:firefox
```

artifacts:
- dist/chrome.zip
- dist/firefox.zip

## ff signing (for github actions)

add these secrets to the repo:
- AMO_ISSUER
- AMO_SECRET

firefox bundle will be signed and uploaded as an xpi named **firefox-signed**.

## local

chrome:
- load unpacked from dist/chrome after running build.

firefox:
- load temporary add-on from dist/firefox/manifest.json in about:debugging.