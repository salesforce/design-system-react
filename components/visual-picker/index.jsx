/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Scoped Notification design pattern](https://lightningdesignsystem.com/components/scoped-notifications/) in React.
// Based on SLDS v2.4.5
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
	 *  Input type for visual picker
	 */
	inputType: PropTypes.oneOf(['radio', 'checkbox']).isRequired,
	/**
	 *  Size for visual picker
	 */
	size: PropTypes.oneOf(['medium', 'large']),
};

const defaultProps = {
	size: 'medium',
};

/**
 * Visual Picker Component
 */
class VisualPicker extends React.Component {
	componentWillMount() {
		this.generatedId = shortid.generate();
	}

	render() {
		const options = React.Children.map(this.props.children, (option, index) => React.cloneElement(option, {
				index: `${this.props.id || this.generatedId}-${index}`,
				type: this.props.inputType,
				size: this.props.size,
			}));

		return (
			<fieldset
				id={this.props.id}
				className={classNames(`slds-form-element`, this.props.class)}
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
