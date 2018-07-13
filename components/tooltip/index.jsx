/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Tooltip

import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

import { POPOVER_TOOLTIP } from '../../utilities/constants';

import Dialog from '../utilities/dialog';
import Icon from '../icon';
import { getMargin, getNubbinClassName } from '../../utilities/dialog-helpers';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

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
		'left bottom',
	]).isRequired,
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `tooltipTipLearnMoreIcon`: This text is inside the info icon within the tooltip content and exists to "complete the sentence" for assistive tech users.
	 * * `triggerLearnMoreIcon`: This text is inside the info icon that triggers the tooltip in order to have text within the link.
	 */
	assistiveText: PropTypes.shape({
		tooltipTipLearnMoreIcon: PropTypes.string,
		triggerLearnMoreIcon: PropTypes.string,
	}),
	/**
	 * Pass the one element that triggers the Tooltip as a child. It must be an element with `tabIndex` or an element that already has a `tabIndex` set such as an anchor or a button, so that keyboard users can tab to it.
	 */
	children: PropTypes.node,
	/**
	 * Content inside Tooltip.
	 */
	content: PropTypes.node.isRequired,
	/**
	 * By default, dialogs will flip their alignment (such as bottom to top) if they extend beyond a boundary element such as a scrolling parent or a window/viewpoint. `hasStaticAlignment` disables this behavior and allows this component to extend beyond boundary elements. _Not tested._
	 */
	hasStaticAlignment: PropTypes.bool,
	/**
	 * Delay on Tooltip closing.
	 */
	hoverCloseDelay: PropTypes.number,
	/**
	 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the popover to the triggering element.
	 */
	id: PropTypes.string,
	/**
	 * **Text labels for internationalization**
	 * This object is merged with the default props object on every render.
	 * * `learnMoreAfter`: This label appears in the tooltip after the info icon.
	 * * `learnMoreBefore`: This label appears in the tooltip before the info icon.
	 */
	labels: PropTypes.shape({
		learnMoreAfter: PropTypes.string,
		learnMoreBefore: PropTypes.string,
	}),
	/**
	 * Forces tooltip to be open. A value of `false` will disable any interaction with the tooltip.
	 */
	isOpen: PropTypes.bool,
	/**
	 * CSS classes to be added to tag with `slds-tooltip-trigger`.
	 */
	triggerClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Please select one of the following:
	 * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
	 * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
	 * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
	 */
	position: PropTypes.oneOf([
		'absolute',
		'overflowBoundaryElement',
		'relative',
	]),
	/**
	 * Custom styles to be added to wrapping triggering `div`.
	 */
	triggerStyle: PropTypes.object,
	/**
	 * Determines the theme of tooltip: for informative purpose (blue background) or warning purpose (red background). This used to be `variant`.
	 */
	theme: PropTypes.oneOf(['info', 'error']),
	/**
	 * Determines the type of the tooltip.
	 */
	variant: PropTypes.oneOf(['base', 'learnMore']),
};

const defaultProps = {
	assistiveText: {
		tooltipTipLearnMoreIcon: 'this link',
		triggerLearnMoreIcon: 'Learn More',
	},
	align: 'top',
	content: <span>Tooltip</span>,
	labels: {
		learnMoreAfter: 'to learn more.',
		learnMoreBefore: 'Click',
	},
	hoverCloseDelay: 50,
	position: 'absolute',
	theme: 'info',
	variant: 'base',
};

/**
 * The PopoverTooltip component is variant of the Lightning Design System Popover component. This component wraps an element that triggers it to open. It must be a focusable child element (either a button or an anchor), so that keyboard users can navigate to it.
 */
class Tooltip extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			isClosing: false,
			isOpen: false,
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

	getContent () {
		let children;

		if (React.Children.count(this.props.children) === 0) {
			children = [
				<a href="javascript:void(0)" onClick={this.props.onClickTrigger}>
					<Icon
						category="utility"
						name="info"
						assistiveText={{
							label: this.props.assistiveText.triggerLearnMoreIcon,
						}}
						size="x-small"
					/>
				</a>,
			];
		} else {
			children = this.props.children;
		}

		return React.Children.map(children, (child, i) =>
			React.cloneElement(child, {
				key: i,
				'aria-describedby': this.getId(),
				onBlur: this.handleMouseLeave,
				onFocus: this.handleMouseEnter,
				onMouseEnter: this.handleMouseEnter,
				onMouseLeave: this.handleMouseLeave,
			})
		);
	}

	getId () {
		return this.props.id || this.generatedId;
	}

	getTooltip () {
		const isOpen =
			this.props.isOpen === undefined ? this.state.isOpen : this.props.isOpen;
		const align = this.props.align;

		// REMOVE AT NEXT BREAKING CHANGE (v1.0 or v0.9)
		const deprecatedWay = this.props.variant === 'error';

		return isOpen ? (
			<Dialog
				align={align}
				context={this.context}
				closeOnTabKey
				hasStaticAlignment={this.props.hasStaticAlignment}
				onClose={this.handleCancel}
				onRequestTargetElement={() => this.getTooltipTarget()}
				position={this.props.position}
				style={{
					marginBottom: getMargin.bottom(align),
					marginLeft: getMargin.left(align),
					marginRight: getMargin.right(align),
					marginTop: getMargin.top(align),
				}}
				variant="tooltip"
			>
				<div
					id={this.getId()}
					className={classNames(
						'slds-popover',
						'slds-popover--tooltip',
						{
							'slds-theme_error': this.props.theme === 'error' || deprecatedWay,
						},
						getNubbinClassName(align)
					)}
					role="tooltip"
				>
					{this.getTooltipContent()}
				</div>
			</Dialog>
		) : (
			<span />
		);
	}

	getTooltipContent () {
		return (
			<div className="slds-popover__body">
				{this.props.content}
				{this.props.variant === 'learnMore' ? (
					<div className="slds-m-top_x-small">
						{this.props.labels.learnMoreBefore}{' '}
						<Icon
							assistiveText={{
								label: this.props.assistiveText.tooltipTipLearnMoreIcon,
							}}
							category="utility"
							inverse
							name="info"
							size="x-small"
						/>{' '}
						{this.props.labels.learnMoreAfter}{' '}
					</div>
				) : null}
			</div>
		);
	}

	getTooltipTarget () {
		return this.props.target ? this.props.target : this.trigger;
	}

	handleCancel = () => {
		this.setState({
			isOpen: false,
			isClosing: false,
		});
	};

	handleMouseEnter = () => {
		this.setState({
			isOpen: true,
			isClosing: false,
		});
	};

	handleMouseLeave = () => {
		this.setState({ isClosing: true });

		setTimeout(() => {
			if (!this.isUnmounting && this.state.isClosing) {
				this.setState({
					isOpen: false,
					isClosing: false,
				});
			}
		}, this.props.hoverCloseDelay);
	};

	saveTriggerRef = (component) => {
		this.trigger = component;
		// yes, this is a re-render triggered by a render.
		// Dialog/Popper.js cannot place the popover until
		// the trigger/target DOM node is mounted. This
		// way `findDOMNode` is not called and parent
		// DOM nodes are not queried.
		if (!this.state.triggerRendered) {
			this.setState({ triggerRendered: true });
		}
	};

	render () {
		const containerStyles = { display: 'inline', ...this.props.triggerStyle };

		return (
			<div
				className={classNames(
					'slds-tooltip-trigger',
					this.props.triggerClassName
				)}
				style={containerStyles}
				ref={this.saveTriggerRef}
			>
				{this.getContent()}
				{this.getTooltip()}
			</div>
		);
	}
}

Tooltip.contextTypes = {
	iconPath: PropTypes.string,
};

Tooltip.displayName = displayName;
Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export default Tooltip;
