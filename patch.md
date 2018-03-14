## Release 0.8.10

**Minor features**
* Combobox supports error messages. 

**Outside SLDS pattern added**
* Multiple selection Combobox error messages should be placed after pillboxes with an additional `slds-has-error` wrapping div.

**Maintenance**
* Update Dropdown Menu children description
* Update SLDS peer dependency to allow 2.6.0-alphas
* Remove plus-plus (`var++`) instances from library for clarity

**Notice**
`package.module` has been removed from the NPM module until a transpiled ES6 module build can be published to support it. The current `package.module` is considered broken already for Create React Apps--for instance, so this is not considered a breaking change. Your module bundler will just use the CommonJS build unless you are alrady transpiling the source code, so no changes should be need to be made.
