/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Tree Initial Branch

import React from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash.isfunction';
import classNames from 'classnames';

const propTypes = {
	/**
	 * HTML `id` of the wrapping container element.
	 */
	htmlId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	/*
	 * Class names to be added to the top-level `ul` element.
	 */
	initalClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/*
	 * Styles to be added to the top-level `ul` element. Useful for `overflow:hidden`.
	 */
	initialStyle: PropTypes.object,
};

const handleScroll = (event, props) => {
	const percentage =
		(event.target.scrollTop /
			(event.target.scrollHeight - event.target.clientHeight)) *
		100;

	if (isFunction(props.onScroll)) {
		props.onScroll(event, {
			percentage,
		});
	}
};

const renderInitialNode = (children, props) => (
	// id intentionally not rendered here, and is present on
	// container that includes the header
	<ul
		aria-labelledby={`${props.htmlId}__heading`}
		className={classNames('slds-tree', props.initalClassName)}
		onScroll={(event) => {
			handleScroll(event, props);
		}}
		role="tree"
		style={props.initialStyle}
	>
		{children}
	</ul>
);

renderInitialNode.displayName = 'TreeInitialNode';
renderInitialNode.propTypes = propTypes;

export default renderInitialNode;
