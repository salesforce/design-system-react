/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Carousel Component

// Implements the [Carousel design pattern](https://www.lightningdesignsystem.com/components/carousel/) in React.

import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// ### Event Helpers
import KEYS from '../../utilities/key-code';
import EventUtil from '../../utilities/event';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';
import componentDoc from './docs.json';

import { CAROUSEL } from '../../utilities/constants';

/**
 * A carousel allows multiple pieces of featured content to occupy an allocated amount of space.
 */
class Carousel extends React.Component {
	constructor() {
		super(...arguments);

		this.generatedId = shortid.generate();
	}

	componentDidMount() {
		checkProps(CAROUSEL, this.props, componentDoc);
	}

	getId() {
		return this.props.id || this.generatedId;
	}

	render() {
		return (
			<p id={this.getId()}>Hello, world!</p>
		);
	}
}

Carousel.displayName = CAROUSEL;

Carousel.propTypes = {
	/**
	 * Content to be injected inside inside the carousel, if any
	 */
	children: PropTypes.node,

	/**
	 * CSS classes that are applied to the component
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),

	/**
	 * Id of component, if desired. If not provided an id is automatically generated
	 */
	id: PropTypes.string,
};

Carousel.defaultProps = {
	// Stub
};

export default Carousel;
