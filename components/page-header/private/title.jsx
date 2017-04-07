/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { Component } from 'react';
import classnames from 'classnames';

const displayName = 'PageHeaderTitle';
const propTypes = {
  /**
   * Sets whether the title will truncate its content responsively.
   */
	truncate: React.PropTypes.bool,
  /**
   * Sets the vertical alignment on the title
   */
	align: React.PropTypes.oneOf(['top', 'middle', 'bottom']),
  /**
   * The title string (required)
   */
	title: React.PropTypes.string.isRequired,
  /**
   * Optional class name
   */
	className: React.PropTypes.string
};
const defaultProps = {
	truncate: true,
	align: 'middle',
	title: 'Page Header Title',
	className: ''
};

class Title extends Component {
	render () {
		const { children, title, truncate, align, className, ...attr } = this.props;
		const classes = this._getClassNames(truncate, align, className);

		return (
			<h1 className={classes} title={title}>
				{title}
				{children}
			</h1>
		);
	}

	_getClassNames (truncate, align, className) {
		return classnames('slds-page-header__title slds-m-right--small', className, {
			'slds-truncate': truncate,
			[`slds-align-${align}`]: align
		});
	}
}

Title.displayName = displayName;
Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

export default Title;
