## Release 0.8.1

**Major features**

* Add Pill Component

**Bugfix**

* Removed `setState` call when handling click to set `active` property. This was causing some `setState` issues on when unmounting `Button`.
* Add `title` attribute to truncated `Tree` nodes

**Maintenance**

* Introduction of `npm run format` command to run prettier and ESlint. Update to ESlint settings.