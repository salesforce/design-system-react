# Release Process

Before releasing, make sure all examples work in documentation site.

## Release with build server (preferred)

1. Add release notes for your version to [RELEASENOTES.md](RELEASENOTES.md) under Latest Release heading.
1. Commit and push a blank text file name `patch.md` or `minor.md` to the `master` branch. In the future, this will contain the release notes. The build server will detect this, delete the file, create a release for you, push back to the library repository.
1. Copy and paste your release notes into the [Github Draft Release UI](https://github.com/salesforce-ux/design-system-react/releases) and publish.

### Manual release

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
