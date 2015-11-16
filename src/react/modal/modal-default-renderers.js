import React from 'react';

// Children
import Button from '../button/button';

module.exports = {
	renderHeader (options) {
		return (
			<div>
				<h2 className="slds-text-heading--medium">{options.headerTitle}</h2>
				<p className="slds-m-top--x-small">{options.headerTagline}</p>
				<Button
					assistiveText="Close"
					className="slds-modal__close"
					icon="utility.close"
					iconSize="large"
					iconStyle="icon-inverse"
					onClick={options.onCloseClick}/>
			</div>
		);
	},

	renderFooter (options) {
		return (
			<div>
				<Button
					text={options.secondaryButtonText}
					theme="neutral"
					onClick={options.onSecondaryClick}/>
				<Button
					text={options.primaryButtonText}
					theme="brand"
					onClick={options.onPrimaryClick}/>
			</div>
		);
	}
};
