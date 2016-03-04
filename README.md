# [SLDS for React](http://slds-for-js.herokuapp.com/)
Interactive, accessible implementations of [Lightning Design System](https://www.lightningdesignsystem.com/) components for React

### Setup (for contributors)
* Clone the project
* Have [Node.js](https://nodejs.org/) installed
* Run `npm install` via terminal in the directory where the project has been cloned

### Running
* Run `npm start` to start an Express server on port 8080. You can navigate to `http://localhost:8080/examples/` to see a simple index page with links to examples in each facade. This is will enable "hot module replacement" since ES6 modules are in used in the source.

### Testing (currently disabled)
* Run `npm test` to build the tests and see the results in the console. You can also run the tests in the browser by navigating to `http://localhost:8080/test/` after executing `npm start`
* A detailed explanation of the testing design for this project is available in `docs/behavior-tests.md`

### Scripts
* Run like `npm run build-dist`
* Run `npm run menu` to see an interactive menu of available scripts.
  - *start*: Start the Express website app with Webpack middleware
  - *build-site*: Build website files with Webpack and output to `./build`
  - *build-dist*: Run the distribution config webpack, build to `./.tmp` directory and then package it up in `/.dist` with a .zip file and README.md
  - *build-dist-for-npm*: Run the distribution config webpack, build to `./.tmp` directory and then package it up for distribution to NPM in `./.dist`
  - *test*: Run the test suite.


### Contributing
* Fork the repo!
* Read up (and feel free to comment on) this [theory doc](https://docs.google.com/a/salesforce.com/document/d/1w8sy0Eex8nwsQ0vx_MUysIL8alOfOCXWfuq19Ikbky8/edit?usp=sharing)
* Look at the [current issues](https://github.com/salesforce-ux/design-system-facades/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22), or create your own so that we know what you're working on
* Make sure you assign yourself to the issue and add a comment about your plan
* Feel free to shoot questions to mc-uxdev@salesforce.com or dbrainer-banker@salesforce.com
* **If this is your first contribution you'll be much happier if you communicate early and often**
* Try to keep your PRs small and manageable

### Requirements / Goals
* Modern, performant UX framework
* Easy path forward from current FuelUX and state of apps (migrating to FuelUX)
* Multiple facades can be run together in the same project (e.g. jquery + react)
* Easy to consume
* Lightweight / few dependencies
* Maintainable
* Easy future upgrades
* Defined way to contribute
* As far as possible promote good behavior

### License
Source code is licensed under the [BSD 3-Clause License](LICENSE)
