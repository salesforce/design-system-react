# Patch branching

Breaking changes do not happen often in this library. There are typically 20+ releases between breaking changes. Sometimes a consuming team needs some time to update their application or test suite. 

* When a large or breaking change occurs, a library maintainer will create a branch such as 0.7.x or 0.8.x. Submit your pull request to that branch if you need a fix in a legacy release branch. Then, to get a release, please create a pull request with release notes (see [release.md](release.md)) to that branch. Historically, breaking changes happen about once or twice a year.
* If you needed a fix in  a legacy release branch, you should pull request into it, and then a maintainer will also merge the fix into master if it applies, too.
* Pushing fixes from `master` to a legacy release branch is not advised.

Consuming teams should locally build and push their own tags (`npm publish:origin`) to their fork if something is needed immediately. `.tmp-npm` is the folder you will want to tag and push manually in order to have the NPM module folder structure as a Github tag.
