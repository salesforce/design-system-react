# Release Process

Before releasing the library publicly, please make sure all examples work in the documentation site.

## Release to your own fork

Any library consumer can publish to their own fork. If you are waiting on a code review, one option is that you can temporarily release a tag to your own fork of this library. The structure of the NPM module differs from repository folder. To release, please replace the username `interactivellama` with your git username and follow theses steps:

* Set your remote. `git remote rename origin git@github.com:interactivellama/design-system-react.git`
* Build the library. `npm run dist`
* Change to the built NPM module folder. `cd .tmp-npm`
* Create a tag. `git tag v0.8.15`
* Push a tag up to your fork. `git push origin v0.8.15`

In your project's `package.json`, please update your dependency to the tag you released.

```
"@salesforce/design-system-react": "git+ssh://git@github.com:interactivellama/design-system-react.git#v0.8.15-npm",
```

## Build `master` banch into site locally

This is a private repository. Site will currently run on Node `v8.6.0`

* `git clone git@github.com:salesforce-ux/design-system-react-site.git` into sibling folder next to `design-system-react`.
* `npm run local-update`. This builds `design-system-react` and copies the node_module build `/.tmp-npm` into the site repo.
* Review updated component examples and prop tables
* Add missing homepage thumbnails for new components by screen capturing from [deployed storybook](http://design-system-react-components.herokuapp.com/). Images will look best with a white background.
* Push to `upstream:master`

## Release with build server

1. Add release notes for your version to [RELEASENOTES.md](RELEASENOTES.md) under Latest Release heading.
1. Commit and push a blank text file name `patch.md` or `minor.md` to the `master` branch. In the future, this will contain the release notes. The build server will detect this, delete the file, create a release for you, push back to the library repository. This is a [convenient list](https://github.com/salesforce/design-system-react/pulls?q=is%3Apr+is%3Aclosed+sort%3Aupdated-desc) of pull requests.
1. Copy and paste your release notes into the [Github Draft Release UI](https://github.com/salesforce-ux/design-system-react/releases) and publish.

# Deploy new version in site

* `npm run release`
* Enter version number
* Check updated component examples and prop tables
* Push to `upstream:master`
* Log into Heroku
* Check deployed staging site.
* Promote staging app to production app. You will need promotion rights to the Heroku application.
* Test the module in a minimal Create React App (CRA) to confirm the release build. Storybook and the documentation website are set up for consuming the library in very specfic ways which include Babel transpiling. Unless the library is tested outside of them, build errors may not be caught.

### Manual release if needed

1. **Choose one**: `npm run release:patch` or `npm run release:minor`. This script pulls from upstream, bumps the version, commits changes, and publishes tags to your `upstream` repository (that is this repo).
1. Copy and paste your release notes into the [Github Draft Release UI](https://github.com/salesforce-ux/design-system-react/releases) and publish.

## Update documentation site

1. Update the version of Design System React in the documentation site's [package.json](https://github.com/salesforce-ux/design-system-react-site/blob/master/package.json#L51) and push to master. This is will build a Heroku application. Log into Heroku and promote the staged pull request to production. You will need promotion rights to the Heroku application.

## Create a build server

1. Create a Heroku app.
1. Connect your App GitHub to the Github branch you wish to deploy and turn on automatic deploys for `master` branch.
1. Create environment variable, `IS_BUILD_SERVER` and set to `true`.
1. Create environment variable, `NPM_CONFIG_PRODUCTION` and set to `false`.
1. Create environment variable, `ORIGIN` and set to `[git@github.com:[your username]/design-system-react.git]`
1. Create environment variable, `GIT_SSH_KEY` and set to a user's private key (base64 encoded) that has access to your repository. `openssl base64 < [PRIVATE_KEY_FILENAME] | tr -d '\n' | pbcopy`

_If you are timid about releasing or need your pull request in review "pre-released," you can publish to origin (your fork) with `npm run publish:origin` and then test and review the tag on your fork. This is just the publish step though, any other tasks you will need to do manually to test publishing._
