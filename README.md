# [SLDS for React](http://slds-for-js.herokuapp.com/react)
Welcome to SLDS for React (formerly Design System Facades), the home of interactive, accessible implementations of [Lightning Design System](https://www.lightningdesignsystem.com/) components for React. We've put together a [Getting Started Guide](http://slds-for-js.herokuapp.com/react) to help you get started using these components in your projects. Additionally, the [SLDS for React App Boilerplate](https://github.com/salesforce-ux/slds-for-react-app-boilerplate) includes a fully functional example of consuming SLDS for React.

### Setup (for contributors)
* Fork the repo!
* Clone your fork.
* Have [Node.js](https://nodejs.org/) installed.
* Run `npm install` via terminal in the directory where the project has been cloned. Note that this repo has dependencies on private Github repos so you _will_ need your [SSH keys](https://help.github.com/articles/generating-an-ssh-key/) for Github set up.

### Running
* Run `npm start` to start an Express server on port 8080. You can navigate to `http://localhost:8080/` to see a simple playground where you can test out various components. This is will enable "hot module replacement" since ES6 modules are in used in the source.

### Make pre-release (dev) commits available for consuming with NPM
* Change `version` in `package.json` to the next appropriate version with a unique suffix ending in `-dev` (eg `0.0.16-context-bar-dev` _This will be your tag_).
* Unless you are publishing an offical release tag, please make sure that the `origin` git remote is pointed at your own forked repository.
* Run `npm run publish-to-git`.
* Update the `package.json` dependency in your _consuming_ project to point to the tag you just created --prepend it with the letter `v`, and append it with `-es`:

For example:
    
    "slds-for-react": "git+ssh://git@github.com/salesforce-ux/slds-for-react.git#v0.0.16-context-bar-dev-es"


### Testing (currently disabled)
* Run `npm test` to build the tests and see the results in the console. You can also run the tests in the browser by navigating to `http://localhost:8080/test/` after executing `npm start`.

### Scripts
* Run `npm run build-dist` to get a distributable bundle with all of the components. Note that using this bundle is not the recommended approach to consuming SLDS for React. Instead, have your project depend directly on SLDS for React at a specific tagged version. See the [Getting Started Guide](http://slds-for-js.herokuapp.com/react) for more details.
* Run `npm run publish-to-git` to publish a tagged version of this code to Github. Be default this publishes a tag named after the version specified in the package.json to the repo named `origin`. If you want to test this while developing make sure that `origin` is your own repo.

### Contributing
* Make sure that the issue you are addressing falls within the bounds of this repo.
* Look at the [current issues](https://github.com/salesforce-ux/slds-for-react/issues?q=is%3Aopen+is%3Aissue), or create your own so that we know what you're working on.
* Make sure you assign yourself to the issue and add a comment about your plan.
* Feel free to shoot questions to mc-uxdev@salesforce.com or dbrainer-banker@salesforce.com
* **If this is your first contribution you'll be much happier if you communicate early and often**
* Try to keep your PRs small and manageable.

### License
Source code is licensed under the [BSD 3-Clause License](LICENSE)
