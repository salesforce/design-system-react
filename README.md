# fuelux-facades [![Build Status](http://teamcity/app/rest/builds/buildType:StackatoCloudApplications_FuelFacades/statusIcon)](http://teamcity/viewType.html?buildTypeId=StackatoCloudApplications_FuelFacades)
Testing a core abstraction layer with many facades approach for FuelUX

### Setup
* Clone the project
* Have [Node.js](https://nodejs.org/), [Grunt](http://gruntjs.com/), and [Webpack](https://webpack.github.io/) installed
* Run `npm install` via terminal in the directory where the project has been cloned

### Running
* Run `npm start` to start a static server on port 8080. You can navigate to `http://localhost:8080/examples/` to see a simple index page with links to examples in each facade

### JavaScript Development
* Run `npm run serve` to start a Webpack development server on port 8080. You can navigate to `http://localhost:8080/examples/` to see a simple index page with links to examples in each facade. This is will enable "hot module replacement" since ES6 modules are in used in the source.

### Testing
* Run `npm test` to build the tests and see the results in the console. You can also run the tests in the browser by navigating to `http://localhost:8080/test/` after executing `npm start`
* A detailed explanation of the testing design for this project is available in `docs/behavior-tests.md`

### Building
* Run `grunt build` for the default build. This will run eslint and create the dist files

### Contributing
* Fork the repo!
* Read up (and feel free to comment on) this [theory doc](https://docs.google.com/a/salesforce.com/document/d/1w8sy0Eex8nwsQ0vx_MUysIL8alOfOCXWfuq19Ikbky8/edit?usp=sharing)
* Look at the current issues, or create your own so that we know what you're working on
* Feel free to shoot questions to mc-uxdev@salesforce.com or dbrainer-banker@salesforce.com
* **If this is your first contribution you'll be much happier if you communicate early and often**
* Try to keep your PRs small and manageable
