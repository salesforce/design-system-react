# eslint-plugin-design-system-react

ESLint plugin for Salesforce Lightning Design System in React.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-design-system-react`:

```
$ npm install eslint-plugin-design-system-react --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-design-system-react` globally.

## Usage

Add `design-system-react` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "design-system-react"
    ]
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





