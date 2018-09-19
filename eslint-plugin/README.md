# @salesforce/eslint-plugin-slds-react

This rule aims to better align React UI component libraries that depend on the Salesforce Lightning Design System CSS Framework.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `@salesforce/eslint-plugin-slds-react`:

```
$ npm install @salesforce/eslint-plugin-slds-react --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `@salesforce/eslint-plugin-slds-react` globally.

## Usage

Add `@salesforce/eslint-plugin-slds-react` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
	"plugins": ["@salesforce/eslint-plugin-slds-react"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
	"rules": {
		"slds-react/rule-no-double-dash-modifier": 2
	}
}
```

## Supported Rules

* `no-double-dash-modifier`

## Licenses

* Source code is licensed under [BSD 3-Clause](https://git.io/sfdc-license)
