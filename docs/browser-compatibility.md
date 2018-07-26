# Browser compatibility

Design System React should be treated as source code for your application build system, and not as a browser-ready library. The recommended way of consuming this library has ES2017+ language features, and therefore cannot be run in the browser without transpiling within your build system.

The [primary audience for this library is software engineers](https://github.com/salesforce/design-system-react/blob/master/docs/codebase-overview.md#not-bootstrap) with an application build system in place, so they can optimize for loading performance. Although this project will try to make an effort to call out incompatibility with legacy browsers when it is discovered, browser compatibility should be handled by the consuming developer with polyfills. This keeps this library clean of additional helper libraries that will not be needed in the future and may not be needed by every consumer.

The eventual goal is to remove all polyfills (such as [lodash](https://lodash.com/)) and use native ECMAScript features. For instance, if you need to support IE11, you may consider the polyfills for many of these features found in the [core-js library](https://github.com/zloirock/core-js#commonjs). 

**Please add any additional polyfills that you need to the list below** when you discover them. This library uses the following ECMAScript features:

* `Array.prototype.findIndex` - use [core-js library](https://github.com/zloirock/core-js#commonjs)
* `Element.classList` - use [classList.js](https://github.com/eligrey/classList.js)

### Internet Explorer 11 Support

This library is not shipped to support IE11, but we strive to allow it to be compatible with adding your own polyfills and are open to any changes that are needed to support you in adding your own polyfills.

* SVG and icon support - SLDS uses external sprite maps. You may try using [SVG for Everybody](https://github.com/jonathantneal/svg4everybody).
