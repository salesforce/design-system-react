Fixes #

### Additional description

---

### CONTRIBUTOR checklist (do not remove)
Please complete for every pull request

* [ ] First-time contributors should sign the Contributor License Agreement. It's a fancy way of saying that you are giving away your contribution to this project. If you haven't before, wait a few minutes and a bot will comment on this pull request with instructions.
* [ ] `npm run lint:fix` has been run and linting passes.
* [ ] Mocha, Jest (Storyshots), and `components/component-docs.json` CI tests pass (`npm test`).
* [ ] Tests have been added for new props to prevent regressions in the future. See [readme](https://github.com/salesforce/design-system-react/blob/master/tests/README.md).
* [ ] Review the appropriate Storybook stories. Open [http://localhost:9001/](http://localhost:9001/).
* [ ] Review tests are passing in the browser. Open [http://localhost:8001/](http://localhost:8001/).
* [ ] Review markup conforms to [SLDS](https://www.lightningdesignsystem.com/) by looking at [DOM snapshot strings](https://facebook.github.io/jest/docs/en/snapshot-testing.html).

### REVIEWER checklist (do not remove)

* [ ] CircleCI tests pass. This includes linting, Mocha, Jest, Storyshots, and `components/component-docs.json` tests.
* [ ] Tests have been added for new props to prevent regressions in the future. See [readme](https://github.com/salesforce/design-system-react/blob/master/tests/README.md).
* [ ] Review the appropriate Storybook stories. Open [http://localhost:9001/](http://localhost:9001/).
* [ ] The Accessibility panel of each Storybook story has 0 violations (aXe). Open [http://localhost:9001/](http://localhost:9001/).
* [ ] Review tests are passing in the browser. Open [http://localhost:8001/](http://localhost:8001/).
* [ ] Review markup conforms to [SLDS](https://www.lightningdesignsystem.com/) by looking at [DOM snapshot strings](https://facebook.github.io/jest/docs/en/snapshot-testing.html).
###### Required only if there are markup / UX changes
* [ ] Add year-first date and commit SHA to `last-slds-markup-review` in `package.json` and push.
* [ ] Request a review of the deployed Heroku app by the Salesforce UX Accessibility Team.
* [ ] Add year-first review date, and commit SHA, `last-accessibility-review`, to `package.json` and push.
* [ ] While the contributor's branch is checked out, run `npm run local-update` within locally cloned [site repo](https://github.com/salesforce-ux/design-system-react-site) to confirm the site will function correctly at the next release.
