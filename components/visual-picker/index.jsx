/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Visual Picker design pattern](https://lightningdesignsystem.com/components/visual-picker/) in React.
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';
import { VISUAL_PICKER } from '../../utilities/constants';

const propTypes = {
	/**
	 * HTML id for component.
	 */
	id: PropTypes.string,
	/**
	 * Visual Picker accepts `Checkbox`, `Radio` and `VisualPickerLink` components as children. Please see `Checkbox`, `Radio` and `VisualPickerLink` for props.
	 */
	children: PropTypes.node,
	/**
	 * CSS classes to be added to tag with `.slds-form-element`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 *  Label for the visual picker
	 */
	label: PropTypes.string,
	/**
	 *  Whether the visual picker is coverable on selection
	 */
	coverable: PropTypes.bool,
	/**
	 *  Whether the visual picker has a vertical layout
	 */
	vertical: PropTypes.bool,
	/**
	 * Whether the visual picker has links as children
	 */
	links: PropTypes.bool,
	/**
	 *  Size for visual picker
	 */
	size: PropTypes.oneOf(['medium', 'large']),
};

const defaultProps = {
	size: 'medium',
	vertical: false,
	links: false,
};

/**
 * Visual Picker Component
 */
class VisualPicker extends React.Component {
	constructor(props) {
		super(props);

		this.generatedId = shortid.generate();
	}

	render() {
		const options = React.Children.map(this.props.children, (option, index) =>
			React.cloneElement(option, {
				index: `${this.props.id || this.generatedId}-${index}`,
				coverable: this.props.coverable,
				variant: 'visual-picker',
				name: `${this.props.id || this.generatedId}_options`,
				size: this.props.size,
				vertical: !!this.props.vertical,
			})
		);

		return this.props.links ? (
			<div className="slds-form-element__control">{this.props.children}</div>
		) : (
			<fieldset
				id={this.props.id}
				className={classNames(`slds-form-element`, this.props.className)}
			>
				<legend className="slds-form-element__legend slds-form-element__label">
					{this.props.label}
				</legend>
				<div className="slds-form-element__control">{options}</div>
			</fieldset>
		);
	}
}

VisualPicker.displayName = VISUAL_PICKER;
VisualPicker.propTypes = propTypes;
VisualPicker.defaultProps = defaultProps;

export default VisualPicker;
