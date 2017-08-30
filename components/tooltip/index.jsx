/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */


// # Popover - tooltip variant

// Implements the [Popover design pattern](https://core-204.lightningdesignsystem.com/components/popovers#flavor-tooltips) in React.
// Based on SLDS v2.1.0-rc3


import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { POPOVER_TOOLTIP } from '../../utilities/constants';

import Dialog from '../utilities/dialog';
import { getAlignment, getMargin, getNubbinClassName } from '../../utilities/dialog-helpers';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

// ### Util helpers
import flatten from 'lodash.flatten';
import compact from 'lodash.compact';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';


// ### Display Name
// Always use the canonical component name as the React display name.
const displayName = POPOVER_TOOLTIP;


const propTypes = {
	/**
	 * Alignment of the Tooltip relative to the element that triggers it.
	 */
	align: PropTypes.oneOf([
		'top',
		'top left',
		'top right',
		'right',
		'right top',
		'right bottom',
		'bottom',
		'bottom left',
		'bottom right',
		'left',
		'left top',
		'left bottom'
	]).isRequired,
	/**
	 * Pass the one element that triggers the Tooltip as a child. It must be an element with `tabIndex` or an element that already has a `tabIndex` set such as an anchor or a button, so that keyboard users can tab to it.
	 */
	children: PropTypes.node,
	/**
	 * Content inside Tooltip.
	 */
	content: PropTypes.node.isRequired,
	/**
	 * Constrains tooltip to window. If the tooltip is near the bottom, then it may appear about the trigger, despite the value of `align`.
	 */
	flippable: PropTypes.bool,
	/**
	 * Delay on Tooltip closing.
	 */
	hoverCloseDelay: PropTypes.number,
	/**
	* A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the popover to the triggering element.
	*/
	id: PropTypes.string,
	/**
	* Forces tooltip to be open. A value of `false` will disable any interaction with the tooltip.
	*/
	isOpen: PropTypes.bool,
	/**
	* This sets the location of the tooltip, if that location is different from the triggering node.
	*/
	target: PropTypes.node,
	/**
	 * CSS classes to be added to tag with `slds-tooltip-trigger`.
	 */
	triggerClassName: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
	/**
	 * Custom styles to be added to wrapping triggering `div`.
	 */
	triggerStyle: PropTypes.object,
	/**
	 * Determines the variant of tooltip: for informative purpose (blue background) or warning purpose (red background)
	 */
	variant: PropTypes.oneOf(['info', 'error'])
};

const defaultProps = {
	align: 'top',
	content: <span>Tooltip</span>,
	hoverCloseDelay: 50,
	variant: 'info'
};

/**
 * The PopoverTooltip component is variant of the Lightning Design System Popover component. This component wraps an element that triggers it to open. It must be a focusable child element (either a button or an anchor), so that keyboard users can navigate to it.
 */
class PopoverTooltip extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			isClosing: false,
			isOpen: false
		};
	}

	componentWillMount () {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(POPOVER_TOOLTIP, this.props);

		this.generatedId = shortid.generate();
	}

	componentWillUnmount () {
		this.isUnmounting = true;
	}

	getId () {
		return this.props.id || this.generatedId;
	}

	getTooltipTarget () {
		return this.props.target ? this.props.target : this.node;
	}

	handleMouseEnter = () => {
		this.setState({
			isOpen: true,
			isClosing: false
		});
	}

	handleMouseLeave = () => {
		this.setState({ isClosing: true });

		setTimeout(() => {
			if (!this.isUnmounting && this.state.isClosing) {
				this.setState({
					isOpen: false,
					isClosing: false
				});
			}
		}, this.props.hoverCloseDelay);
	}

	getTooltipContent () {
		return <div className="slds-popover__body">{this.props.content}</div>;
	}

	handleCancel = () => {
		this.setState({
			isOpen: false,
			isClosing: false
		});
	}

	getTooltip () {
		const isOpen = this.props.isOpen === undefined ? this.state.isOpen : this.props.isOpen;
		const align = this.props.align;

		return isOpen
			? <Dialog
				context={this.context}
				closeOnTabKey
				flippable={false}
				marginBottom={getMargin.bottom(align)}
				marginLeft={getMargin.left(align)}
				marginRight={getMargin.right(align)}
				marginTop={getMargin.top(align)}
				onClose={this.handleCancel}
				targetElement={this.getTooltipTarget()}
				align={align}
				horizontalAlign={getAlignment.horizontal(align)}
				verticalAlign={getAlignment.vertical(align)}
				variant="tooltip"
			>
				<div
					id={this.getId()}
					className={classNames(
					'slds-popover',
					'slds-popover--tooltip',
					{ 'slds-theme_error': this.props.variant === 'error' },
					getNubbinClassName(align))} role="tooltip"
				>
					{this.getTooltipContent()}
				</div>
			</Dialog>
			: <span />;
	}

	renderAssistantText () {
		return <span className="slds-assistive-text">{this.props.content}</span>;
	}

	decorateGrandKidsWithKeyToSilenceWarning (grandKids) { // eslint-disable-line class-methods-use-this
		return React.Children.map(grandKids, (component, i) => {
			const decoratedComponent = React.isValidElement(component)
			? React.cloneElement(component, { key: i })
			: component;
			return decoratedComponent;
		});
	}

	grandKidsWithAsstText (child) {
		const { props = {} } = child;
		const grandKids = compact(flatten([this.renderAssistantText()].concat(props.children)));
		return this.decorateGrandKidsWithKeyToSilenceWarning(grandKids);
	}

	getContent () {
		return React.Children.map(this.props.children, (child, i) =>
			React.cloneElement(child, {
				key: i,
				'aria-describedby': this.getId(),
				onBlur: this.handleMouseLeave,
				onFocus: this.handleMouseEnter,
				onMouseEnter: this.handleMouseEnter,
				onMouseLeave: this.handleMouseLeave
			}, this.grandKidsWithAsstText(child))
		);
	}

	render () {
		const containerStyles = { display: 'inline', ...this.props.triggerStyle };
		return (
			<div
				className={classNames('slds-tooltip-trigger', this.props.triggerClassName)}
				style={containerStyles}
				ref={(node) => { this.node = node; }}
			>
				{this.getContent()}
				{this.getTooltip()}
			</div>
		);
	}

}

PopoverTooltip.contextTypes = {
	iconPath: PropTypes.string
};

PopoverTooltip.displayName = displayName;
PopoverTooltip.propTypes = propTypes;
PopoverTooltip.defaultProps = defaultProps;

module.exports = PopoverTooltip;

