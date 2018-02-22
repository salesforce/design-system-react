## Release 0.8.8

**Bugfix**

* Export `canUseDOM` correctly to enable focus trap. This bug is present in `>=0.8.0` versions. Upgrading to `0.8.8` is recommeded for `Popover` and other components to be accessible.

**Maintenance**

* Replace Airbnb shape props with 1PropTypes.shape1
* Add Prettier linting to JSON, Add JSON parser plugin to eslint
* Converts `package.json` to tabs
* Troubleshoots `npm run lint:fix`
* Implement Import first ESlint rule to increase code consistency

**Documentatation**

* Add missing documentation site component descriptions
* Document child nodes of `IconSettings`
* Update `Modal` footer prop description
