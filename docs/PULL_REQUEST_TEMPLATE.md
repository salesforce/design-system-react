Fixes issue #

### Additional description


---
### Reviewer checklist
- [ ] Review the appropriate Storybook stories. Open [http://localhost:9001/](http://localhost:9001/).
- [ ] Review tests are passing in the browser. Open [http://localhost:8001/](http://localhost:8001/).
- [ ] Review markup conforms to [SLDS](https://www.lightningdesignsystem.com/) by looking at snapshot strings.
- [ ] Add year-first date and commit SHA to `last-slds-markup-review` in `package.json` and push.
- [ ] Request a review of the deployed Heroku app by the Salesforce UX Accessibility Team.
- [ ] Add year-first review date, and commit SHA, `last-accessibility-review`, to `package.json` and push.
- [ ] While the contributor's branch is checked out, run `npm run local-update` within locally cloned [site repo](https://github.com/salesforce-ux/design-system-react-site) to confirm the site will function correctly at the next release.
