# Contributing to Design System React

## The process
1. Read the [Codebase Overview](docs/codebase-overview.md) to learn concepts and best practices for the codebase and to confirm it is within project scope.
1. Create a new issue before starting your solution to keep track of what you are trying to contribute. That way, we can also offer suggestions or let you know if there is already an effort in progress.
1. Fork this repository, clone your fork locally. Create a topic branch locally.
1. Add the component to `/components` folder
1. Add the component name to `constants.js`
1. Add Storybook examples to `/examples`
1. Add documentation site examples to `/examples/index.js`
1. Add tests to `/tests`.
1. Push to your username's forked repository.
1. Send us a well-documented pull request based on `master` from your forked repository. GitHub pull requests should have a descriptive title, a brief summary, @mention several relevant people to review the code, add helpful GitHub comments on lines where you have questions or concerns.
1. We'll review your code, suggest any needed changes, and hopefully merge it in. Thank you!

## Contributing Guidelines
- UX pattern / design must exist in [SLDS](https://www.lightningdesignsystem.com/). Components in the process of being added to SLDS will be considered as prototypes.
- All new props and components need tests. **Please review the [testing readme](/tests/README.md)**
- Follow Eslint settings.
- If you are adding a feature, [add a story](https://storybook.js.org/basics/writing-stories/) to the React Storybook that uses your feature, so that reviewers can test it.
- Stories are stored in [examples folder](/examples) along with Documentation site examples. To add a story to the interactive examples on the [documentation site](https://react.lightningdesignsystem.com/components/), add the JSX file to [examples/index.js](/examples/index.js). All examples that are present for a component in the [SLDS website](https://www.lightningdesignsystem.com/) or it's internal site should be created as a Storybook story _and_ listed in `examples/index.js`.
- Prop description tables on the documentation site are generated from propType comments within the component. All props descriptions should have a _Tested with snapshot testing._ or _Tested with Mocha framework._ notice in them.
- Introductory component descriptions are generated from the comment directly before the component declaration with [react-docgen](https://github.com/reactjs/react-docgen).

## The review process (internal)
- `git clone` this repository
- `npm install`
- Pull down the pull requested branch. It will be within the contributor's forked repository. For instance, `git checkout -b interactivellama-data-table-width master` then `git pull git@github.com:interactivellama/design-system-react.git data-table-width`. You could also create an additional remote and pull down the branch directly.
- `npm start` and review the appropriate React Story example at `http://localhost:9001/`. Open `http://localhost:8001/` and confirm that tests are passing in your environment.
- Check that any modified or added examples for the documentation site are working and are present in `examples/index.js`.
4. Request a review of the new component/feature by the Salesforce UX Accessibility Team.

## Testing the documentation site (internal)
1. Pull down the documentation site and place in the same parent folder as this library: `git clone git@github.com:salesforce-ux/design-system-react-site.git` and run `npm install`.
`.
1. Run `npm run local-update` from within `design-system-react-site` to build, copy, and serve a local version of this library into the site. You should be able to now view the updated site at `http://localhost:8080/` and resolve any issues with updated documentation.
