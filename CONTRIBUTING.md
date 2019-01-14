# Contributing to Design System React

First, on behalf of the core maintainers, I'd like to thank you for wanting to contribute and make the user experience for your end-users better and improve the developer experience of this library. :+1::tada: -- [@interactivellama](https://github.com/interactivellama/)

If you are adding or changing component props, the first step is to propose the feature so that others have time to comment on it. Please submit a props proposal such as this one for [Dueling Picklist](https://github.com/salesforce/design-system-react/issues/1667) as an issue.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

* [Setup](#setup)
* [Adding a new prop](#adding-a-new-prop)
* [How to add a new component](#how-to-add-a-new-component)
* [Contributing Guidelines](#contributing-guidelines)
* [The review process](#the-review-process)
* [Testing the documentation site (internal)](#testing-the-documentation-site-internal)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Setup

1. Fork this repository (button in upper right). Install [git](https://git-scm.com/) and clone your fork locally with `git clone git@github.com:[YOUR-USER]/design-system-react.git`. This library only supports use of `git-bash` in Windows. The default command prompt may not work.
1. Create a [topic branch](https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows) locally such as `menu-alignment-fix`.
1. Install [Node and NPM](https://nodejs.org/en/). `npm install` to install development dependencies.
1. `npm start` to start [Storybook](https://storybook.js.org/). View stories at [http://localhost:9001](http://localhost:9001). Modify the source code to update component stories in the sidebar.
1. Read the [Codebase Overview](docs/codebase-overview.md) to learn concepts and best practices for the codebase and to confirm contribution is within project scope.

## Adding a new prop

1. This library is open to `data`, `ref`, `style`, and `className` on any element within reason, but especially open to it for the “primary part of a component” such as form elements such as `input` or a clickable elements such as `button`, since these are often used for testing purposes or form submission. This is probably a better way to write unit tests, anyway, since SLDS class changes are not considered breaking changes.
   1. `ref` callbacks should be within an `object` named refs with typically a key name of the HTML tag name. These should be tested with a Mocha callback.
   1. `style` props should be `style[SUFFIX]` and be tested with a Jest DOM snapshot by adding a Story to Storybook.
   1. `className` props should be `className[SUFFIX]` and be `PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string])` and be tested with a Jest DOM snapshot by adding a Story to Storybook.

## How to add a new component

1. Create a new issue or add to an existing one.
   1. **List out all public props**, so that props can be consistent across the library. Here is [an example](https://github.com/salesforce/design-system-react/issues/1667). You are proposing an API that hopefully will never have to be changed.
1. Build out the component file structure
   1. Add a new folder to `/components` with `index.jsx`. All component files in this folder are public. Non-public subcomponents should be in a `private` subfolder.
1. Connect the newly created files
   1. Add public component exports to `/components/index.js`.
   1. Add the component's name to `/components/constants.js`
   1. Create dev storybook stories](https://design-system-react-components.herokuapp.com/) in `/components/[COMPONENT]/__examples__/` and [documentation site examples](https://react.lightningdesignsystem.com/).
   1. Add Storybook and site examples in `/components/[COMPONENT]/__docs__/`.
   1. Then import `__docs__` examples file into Storybook by adding them to `/components/storybook-stories.js`.
   1. Then import `__docs__` examples file into the documentation site by adding them to `/components/site-stories.js` respectively. Site examples only have access to variables exported in `/components/index.js`, so you should limit your component's site example imports to these variables. See [#1192](https://github.com/salesforce/design-system-react/issues/1192) for more information.
   1. Review the [tests readme](/tests/README.md)
   1. Create snapshot tests. Copy examples from `/components/storybook-stories.js` to `/components/story-based-tests.js`. This will add DOM and image snapshot testing for the component. These tests use [Storyshots](https://github.com/storybooks/storybook/tree/master/addons/storyshots) and are run without a DOM. Most props that don't involve user events can be tested here. `npm run test:snapshot` will run these tests by themselves
   1. Add callback prop tests in Mocha test framework to `/components/[COMPONENT]/__tests__/`. Mocha tests are a last resort and should not be used for simple markup queries. These tests can be viewed at `http://localhost:8001`
1. All components should have a comment description of the component before the class declaration in the source code. This should be copied from the subtitle or "lead" of the SLDS website component page. All props should have `propType` with a prop description comment before it that will be used on the documentation site. `npm test` will audit that these source code comments exist or warn with `components/component-docs.json has a an empty string in it` error if they do not.
1. Push to your username's forked repository.
1. Submit a well-documented pull request targeting `master` from your forked repository. GitHub pull requests should have a descriptive title, a brief summary, @mention several relevant people to review the code, add helpful GitHub comments on lines where you have questions or concerns. All contributors must sign a [Contributor License Agreement](https://cla.salesforce.com/sign-cla).
1. We'll review your code, suggest any needed changes, and hopefully merge it in soon. Thank you!

## Contributing Guidelines

* Are you a first-time contributor? If you would like a simple task to start out with, you might consider [these issues](https://deepscan.io/dashboard/#view=project&pid=1475&bid=4666&subview=issues) or run `npm run lint` and fix a few warnings.
* UX pattern / design must exist in [SLDS](https://www.lightningdesignsystem.com/). Components in the process of being added to SLDS will be considered as prototypes.
* All new props and components need tests. **Please review the [testing readme](/tests/README.md)**
* Contributions of components with a subset of SLDS variants will be considered. Please consider your architecture in view of the other variants and create an issue before starting just to be certain.
* Follow this library's `prettier` (code style) and `eslint` (code quality) settings. `npm run lint:fix` will run [Prettier](https://prettier.io/) and write style changes to your files.
  * You can enable this behavior at save in your editor, too. For instance, in Visual Studio Code, run the [prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and set `"editor.formatOnSave": true` and `prettier.eslintIntegration: true`.
* If you are adding a feature, [add a story](https://storybook.js.org/basics/writing-stories/) to the React Storybook that uses your feature, so that reviewers can test it.
* Add enough Storybook stories and testing examples to show use of all component prop and values--if they are enumerated. All examples that are present for a component in the [SLDS website](https://www.lightningdesignsystem.com/) should be created as a Storybook story _and_ imported into the documentation site examples.
* Prop description tables on the documentation site are generated from `propType` comments within the component. Use `npm run build:docs` to confirm comment compatibility. Introductory component descriptions are generated from the comment directly before the component declaration with [react-docgen](https://github.com/reactjs/react-docgen).
* All props descriptions should have a _Tested with snapshot testing._ or _Tested with Mocha framework._ notice in them.

## The review process

1. Read through the modified/added code in the pull request.
1. `git clone` this repository. Pull down the pull requested branch. It will be within the contributor's forked repository. For instance, `git checkout -b interactivellama-data-table-width master` then `git pull git@github.com:interactivellama/design-system-react.git data-table-width`. You could also create an additional remote and pull down the branch directly.
1. Run `npm install` and `npm start`.
1. Review the appropriate Storybook stories at `http://localhost:9001/`.
1. Review tests. Open `http://localhost:8001/` and confirm that tests are passing in your browser.
1. Compare component markup to SLDS markup. Reviewing the snapshot strings is the easiest way. Add year-first date and commit SHA to `last-slds-markup-review` in package.json and push to pull request branch.
1. Request a review of the new component/feature by the Salesforce UX Accessibility Team. Add year-first review date, and commit SHA, `last-accessibility-review`, to `package.json` and push to pull request branch.
   ```js
   {
     "component": "",
     "status": "prod",
     "display-name": "",
     "last-accessibility-review": {
       "date-iso-8601": "2017/12/31",
       "commit-sha": ""
     },
     "last-slds-markup-review": {
       "date-iso-8601": "2017/12/30",
       "commit-sha": ""
     },
     "SLDS-component-path": ""
   },
   ```
1. While the contributor's branch is checked out, run `npm run local-update` within locally cloned [site repo](https://github.com/salesforce-ux/design-system-react-site) to confirm the site will function correctly at the next release. This will also build the bundle (`npm run dist`) and use the bundle in the documentation site and confirm that the bundle works.

## Testing the documentation site (internal)

1. Pull down the documentation site (currently private) and place in the same parent folder as this library: `git clone git@github.com:salesforce-ux/design-system-react-site.git` and run `npm install`.
1. Run `npm run local-update` from within `design-system-react-site` to build, copy, and serve a local version of this library into the site. You should be able to now view the updated site at `http://localhost:8080/` and resolve any issues with updated documentation.
