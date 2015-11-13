import React from 'react';
import Svg from '../svg/svg';

module.exports = {
	renderHeader (options) {
		return (
			<div className="slds-modal__header">
				<h2 className="slds-text-heading--medium">{options.headerTitle}</h2>
				<p className="slds-m-top--x-small">{options.headerTagline}</p>
				<button className="slds-button slds-button--icon-inverse slds-modal__close" onClick={options.onCloseClick}>
					<Svg className="slds-button__icon slds-button__icon--large" icon="utility.close" />
					<span className="slds-assistive-text">Close</span>
				</button>
			</div>
		);
	},

	renderFooter (options) {
		return (
			<div className="slds-modal__footer">
				<button className="slds-button slds-button--neutral" onClick={options.onSecondaryClick}>{options.secondaryBtnText}</button>
				<button className="slds-button slds-button--neutral slds-button--brand" onClick={options.onPrimaryClick}>{options.primaryBtnText}</button>
			</div>
		);
	}
};
