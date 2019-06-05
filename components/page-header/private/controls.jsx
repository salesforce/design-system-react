/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const displayName = 'PageHeaderControls';
const propTypes = {
	/**
	 * Optional class name
	 */
	className: PropTypes.string,
};
const defaultProps = {
};

class Controls extends Component {
	render() {
		let components;

		if (this.props.type === 'actions') {
			components = (this.props.onRenderActions) ? this.props.onRenderActions() : this.props.contentRight;
		} else {
			components = (this.props.onRenderControls) ? this.props.onRenderControls() : this.props.navRight;
		}

		if (components) {
			if (components.props && components.props.children) {
				components =  (
					<>
						{React.Children.map(components.props.children, (child) => (
							<div className="slds-page-header__control">
								{child}
							</div>
						))}
					</>
				);
			} else {
				components = <div className="slds-page-header__control">{components}</div>;
			}


			return (
				<div className={classnames(`slds-page-header__col-${this.props.type}`, this.props.className)}>
					<div className="slds-page-header__controls">
						{components}
					</div>
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
