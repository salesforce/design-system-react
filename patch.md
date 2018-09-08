## Release 0.8.24

**Bugfixes**

* Missing `docs.json` for each component added to build. Component meta data is now stored with each component folder in `docs.json`. This library's release script was not copying the new file which makes all components imports fail.
