# eslint-plugin-slds-bem-deprecation-react

This rule aims to better align JavaScirpt UI component libraries that depend on the Salesforce Lightning Design System CSS Framwork.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `@salesforce/eslint-plugin-slds-bem-deprecation-react`:

```
$ npm install @salesforce/eslint-plugin-slds-bem-deprecation-react --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `@salesforce/eslint-plugin-slds-bem-deprecation-react` globally.

## Usage

Add `@salesforce/eslint-plugin-slds-bem-deprecation-react` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
	"plugins": ["@salesforce/eslint-plugin-slds-bem-deprecation-react"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
	"rules": {
		"design-system-react/rule-name": 2
	}
}
```

## Supported Rules

* Fill in provided rules here
