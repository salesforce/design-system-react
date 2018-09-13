## Release 0.8.25

**Minor Features**

* `onRequestIconPath` added to `IconSettings` to allow developers to return a custom icon path--for instance, on the same page with a local anchor (`#down`). This is helpful for when there are Cross-Origin Resource Sharing (CORS) issues with SVGs that are located on another domain such as a CDN.

**Bugfixes**

* Brand Band not exported in CJS/ESM packages
