# Warns against using the deprecated, double-dash style for BEM notation. See https://releasenotes.docs.salesforce.com/en-us/summer17/release-notes/rn_lds.htm. (no-double-dash-modifier)

Please describe the origin of the rule here.


## Rule Details

This rule aims to better align JavaScirpt UI component libraries that depend on the Salesforce Lightning Design System CSS Framwork.

Examples of **incorrect** code for this rule:

```js
<div className="slds-theme--default">
	<h3 className="slds-text-heading--label">Heading</h3>
	</div>
```

Examples of **correct** code for this rule:

```js
<div className="slds-theme_default">
	<h3 className="slds-text-heading_label">Heading</h3>
</div>
```

## Further Reading

This code is located within the [Design System React](https://github.com/salesforce/design-system-react) repository. Please create issues there.