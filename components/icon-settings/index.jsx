/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

class IconSettings extends React.Component {
	getChildContext () {
		return { iconPath: this.props.iconPath };
	}

	render () {
		return this.props.children;
	}
}

IconSettings.childContextTypes = {
	iconPath: PropTypes.string
};

export default IconSettings;

