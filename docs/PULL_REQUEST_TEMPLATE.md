Fixes #

### Additional description

---

### Pull Request Review checklist (do not remove)

* [ ] `npm run lint:fix` has been run and linting passes.
* [ ] Mocha, Jest (Storyshots), and `components/component-docs.json` CI tests pass (`npm test`).
* [ ] Tests have been added for new props to prevent regressions in the future. See [readme](https://github.com/salesforce/design-system-react/blob/master/tests/README.md).
* [ ] Review the appropriate Storybook stories. Open [http://localhost:9001/](http://localhost:9001/).
* [ ] Review tests are passing in the browser. Open [http://localhost:8001/](http://localhost:8001/).
* [ ] Review markup conforms to [SLDS](https://www.lightningdesignsystem.com/) by looking at [DOM snapshot strings](https://facebook.github.io/jest/docs/en/snapshot-testing.html).
* [ ] Add year-first date and commit SHA to `last-slds-markup-review` in `package.json` and push.
* [ ] Request a review of the deployed Heroku app by the Salesforce UX Accessibility Team.
* [ ] Add year-first review date, and commit SHA, `last-accessibility-review`, to `package.json` and push.
* [ ] While the contributor's branch is checked out, run `npm run local-update` within locally cloned [site repo](https://github.com/salesforce-ux/design-system-react-site) to confirm the site will function correctly at the next release.
