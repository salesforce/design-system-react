/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// ## Constants
import { PAGE_HEADER_CONTROL } from '../../../utilities/constants';

const displayName = 'PageHeaderControls';
const propTypes = {
	/**
	 * Optional class name
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Type of this controls component ('actions' or 'controls')
	 */
	type: PropTypes.oneOf(['actions', 'controls']),
};
const defaultProps = {};

function Controls(props) {
	let controls;
	let isUsingLegacyProp;
	let legacyControls;
	let vettedControls;

	if (props.type === 'actions') {
		if (props.onRenderActions) {
			controls = props.onRenderActions();
		} else if (props.contentRight) {
			controls = props.contentRight;
			isUsingLegacyProp = true;
		}
	} else if (props.onRenderControls) {
		controls = props.onRenderControls();
	} else if (props.navRight) {
		controls = props.navRight;
		isUsingLegacyProp = true;
	}

	if (controls) {
		if (controls.type && controls.type.displayName === PAGE_HEADER_CONTROL) {
			vettedControls = controls;
		} else if (controls.props && controls.props.children) {
			vettedControls = [];

			React.Children.forEach(controls.props.children, (child) => {
				if (
					child &&
					child.type &&
					child.type.displayName === PAGE_HEADER_CONTROL
				) {
					// eslint-disable-next-line fp/no-mutating-methods
					vettedControls.push(child);
				}
			});
		}

		// Backward compatibility for older 'contentRight' & 'navRight' structures.
		if (isUsingLegacyProp && (!vettedControls || vettedControls.length < 1)) {
			if (typeof controls !== 'string') {
				legacyControls = (
					<div className="slds-page-header__controls" {...controls.props} />
				);
			} else {
				legacyControls = (
					<div className="slds-page-header__controls">{controls}</div>
				);
			}
		}

		return (
			<div
				className={classnames(
					`slds-page-header__col-${props.type}`,
					props.className
				)}
			>
				{legacyControls || (
					<div className="slds-page-header__controls">{vettedControls}</div>
				)}
			</div>
		);
	}

	return null;
}

Controls.displayName = displayName;
Controls.propTypes = propTypes;
Controls.defaultProps = defaultProps;

export default Controls;
