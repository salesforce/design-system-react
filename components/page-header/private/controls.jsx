/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { Component } from 'react';
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

class Controls extends Component {
	render() {
		let controls;
		let vettedControls;

		if (this.props.type === 'actions') {
			controls = this.props.onRenderActions
				? this.props.onRenderActions()
				: this.props.contentRight;
		} else {
			controls = this.props.onRenderControls
				? this.props.onRenderControls()
				: this.props.navRight;
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
						vettedControls.push(child);
					}
				});
			}

			return (
				<div
					className={classnames(
						`slds-page-header__col-${this.props.type}`,
						this.props.className
					)}
				>
					<div className="slds-page-header__controls">{vettedControls}</div>
				</div>
			);
		}

		return null;
	}
}

Controls.displayName = displayName;
Controls.propTypes = propTypes;
Controls.defaultProps = defaultProps;

export default Controls;
