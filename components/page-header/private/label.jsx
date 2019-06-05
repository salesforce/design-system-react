/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames';

import Breadcrumb from '../../breadcrumb';

const displayName = 'PageHeaderLabel';
const propTypes = {
	/**
	 * Optional class name
	 */
	className: PropTypes.string,
	/**
	 * Contents of label section
	 */
	content: PropTypes.node,
	/**
	 * An array of react elements, presumably anchor <a> elements.
	 */
	trail: PropTypes.array,
	/**
	 * Variant passed down from page header
	 */
	variant: PropTypes.string,
};

const Label = (props) => {
	if (props.trail && props.trail.length > 0) {
		return <Breadcrumb style={props.style} trail={props.trail} />;
	}

	if (props.content) {
		if (typeof props.content === 'string') {
			return <span>{props.content}</span>;
		}

		return props.content;
	}

	return null;
};

Label.displayName = displayName;
Label.propTypes = propTypes;

export default Label;
