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

import EventUtil from '../../utilities/event';
import { POPOVER_TOOLTIP } from '../../utilities/constants';

import Dialog from '../utilities/dialog';
import Icon from '../icon';
// eslint-disable-next-line import/no-cycle
import Button from '../button';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';
import componentDoc from './component.json';
import { IconSettingsContext } from '../icon-settings';

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
	 * CSS classes to be added to the popover dialog. That is the element with `.slds-popover` on it.
	 */
	dialogClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Enabling this hides the default nubbin, replacing it with one attached directly to the tooltip trigger. Note: `hasStaticAlignment` should be set to `true` if using this feature as auto-flipping anchored nubbins are not currently supported.
	 */
	hasAnchoredNubbin: PropTypes.bool,
	/**
	 * By default, dialogs will flip their alignment (such as bottom to top) if they extend beyond a boundary element such as a scrolling parent or a window/viewpoint. `hasStaticAlignment` disables this behavior and allows this component to extend beyond boundary elements. _Not tested._
	 */
	hasStaticAlignment: PropTypes.bool,
	/**
	 * Delay on Tooltip closing in milliseconds. Defaults to 50
	 */
	hoverCloseDelay: PropTypes.number,
	/**
	 * Delay on Tooltip opening in milliseconds. Defaults to 0
	 */
	hoverOpenDelay: PropTypes.number,
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
	 * Callback that returns an element or React `ref` to align the Tooltip with.
	 */
	onRequestTargetElement: PropTypes.func,
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
	variant: PropTypes.oneOf(['base', 'learnMore', 'list-item']),
};

const defaultProps = {
	assistiveText: {
		tooltipTipLearnMoreIcon: 'this link',
		triggerLearnMoreIcon: 'Help',
	},
	align: 'top',
	// eslint-disable-next-line react/jsx-curly-brace-presence
	content: <span>{'Tooltip'}</span>,
	labels: {
		learnMoreAfter: 'to learn more.',
		learnMoreBefore: 'Click',
	},
	hoverCloseDelay: 50,
	hoverOpenDelay: 0,
	position: 'absolute',
	theme: 'info',
	variant: 'base',
};

/**
 * The PopoverTooltip component is variant of the Lightning Design System Popover component. This component wraps an element that triggers it to open. It must be a focusable child element (either a button or an anchor), so that keyboard users can navigate to it.
 */
class Tooltip extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false,
		};

		this.tooltipTimeout = {};

		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(POPOVER_TOOLTIP, props, componentDoc);

		this.generatedId = shortid.generate();
	}

	componentWillUnmount() {
		this.isUnmounting = true;
	}

	getAnchoredNubbinStyles() {
		if (this.props.hasAnchoredNubbin) {
			const alignment = this.props.align.split(' ')[0];
			const nubbinContainerStyles = {
				height: '0',
				position: 'relative',
				width: '0',
			};
			const nubbinStyles = {
				backgroundColor: '#16325c',
				content: '',
				height: '1rem',
				position: 'absolute',
				transform: 'rotate(45deg)',
				width: '1rem',
			};
			const triggerDimensions = {
				height: this.trigger ? this.trigger.getBoundingClientRect().height : 0,
				width: this.trigger ? this.trigger.getBoundingClientRect().width : 0,
			};

			switch (alignment) {
				case 'bottom': {
					nubbinContainerStyles.left = `${triggerDimensions.width / 2}px`;
					nubbinContainerStyles.top = `${triggerDimensions.height}px`;
					nubbinStyles.left = '-8px';
					nubbinStyles.top = '3px';
					break;
				}
				case 'left': {
					nubbinContainerStyles.left = '0';
					nubbinContainerStyles.top = `${triggerDimensions.height / 2}px`;
					nubbinStyles.left = '-19px';
					nubbinStyles.top = '-9px';
					break;
				}
				case 'right': {
					nubbinContainerStyles.left = `${triggerDimensions.width}px`;
					nubbinContainerStyles.top = `${triggerDimensions.height / 2}px`;
					nubbinStyles.left = '3px';
					nubbinStyles.top = '-9px';
					break;
				}
				default: {
					nubbinContainerStyles.left = `${triggerDimensions.width / 2}px`;
					nubbinContainerStyles.top = '0';
					nubbinStyles.left = '-8px';
					nubbinStyles.top = '-19px';
				}
			}

			return (
				<React.Fragment>
					<style>{`#${this.getId()}:after, #${this.getId()}:before {
	display: none;
}`}</style>
					{this.getIsOpen() ? (
						<div style={nubbinContainerStyles}>
							<div style={nubbinStyles} />
						</div>
					) : null}
				</React.Fragment>
			);
		}

		return null;
	}

	getContent() {
		let children;
		const noChildrenProvided = React.Children.count(this.props.children) === 0;

		if (noChildrenProvided && this.props.onClickTrigger) {
			children = [
				<a
					href="#"
					onClick={EventUtil.trappedHandler(this.props.onClickTrigger)}
				>
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
		} else if (noChildrenProvided) {
			children = [
				<Button
					aria-disabled
					assistiveText={{
						icon: this.props.assistiveText.triggerLearnMoreIcon,
					}}
					iconCategory="utility"
					iconName="info"
					variant="icon"
				/>,
			];
		} else {
			// eslint-disable-next-line prefer-destructuring
			children = this.props.children;
		}

		return React.Children.map(children, (child, i) =>
			React.cloneElement(child, {
				key: i, // eslint-disable-line react/no-array-index-key
				'aria-describedby': this.getIsOpen() ? this.getId() : undefined,
				onBlur: this.handleMouseLeave,
				onFocus: this.handleMouseEnter,
				onMouseEnter: this.handleMouseEnter,
				onMouseLeave: this.handleMouseLeave,
			})
		);
	}

	getId() {
		return this.props.id || this.generatedId;
	}

	getIsOpen() {
		return this.props.isOpen === undefined
			? this.state.isOpen
			: this.props.isOpen;
	}

	getTooltip() {
		const isOpen = this.getIsOpen();
		const { align } = this.props;

		// REMOVE AT NEXT BREAKING CHANGE (v1.0 or v0.9)
		const deprecatedWay = this.props.variant === 'error';

		return isOpen ? (
			<Dialog
				closeOnTabKey
				hasNubbin
				contentsClassName={classNames(
					'slds-popover',
					'slds-popover_tooltip',
					{
						'slds-theme_error': this.props.theme === 'error' || deprecatedWay,
					},
					this.props.dialogClassName
				)}
				align={align}
				context={this.context}
				hasStaticAlignment={this.props.hasStaticAlignment}
				onClose={this.handleCancel}
				onRequestTargetElement={() => this.getTooltipTarget()}
				position={this.props.position}
				variant="tooltip"
				containerProps={{
					id: this.getId(),
				}}
			>
				{this.getTooltipContent()}
			</Dialog>
		) : (
			<span />
		);
	}

	getTooltipContent() {
		return (
			<div className="slds-popover__body">
				{this.props.content}
				{this.props.variant === 'learnMore' && this.props.onClickTrigger ? (
					<div className="slds-m-top_x-small" aria-hidden="true">
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

	getTooltipTarget() {
		if (this.props.onRequestTargetElement) {
			return this.props.onRequestTargetElement();
		}

		// for backwards compatibility
		if (this.props.target) {
			return this.props.target;
		}

		return this.trigger;
	}

	handleCancel = () => {
		clearTimeout(this.tooltipTimeout);

		this.setState({
			isOpen: false,
		});
	};

	handleMouseEnter = () => {
		clearTimeout(this.tooltipTimeout);

		this.tooltipTimeout = setTimeout(() => {
			if (!this.isUnmounting) {
				this.setState({
					isOpen: true,
				});
			}
		}, this.props.hoverOpenDelay);
	};

	handleMouseLeave = () => {
		clearTimeout(this.tooltipTimeout);

		this.tooltipTimeout = setTimeout(() => {
			if (!this.isUnmounting) {
				this.setState({
					isOpen: false,
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

	render() {
		const containerStyles = {
			display: 'inline-block',
			lineHeight: '1',
			...this.props.triggerStyle,
		};

		return (
			<div
				className={classNames(
					'slds-tooltip-trigger',
					this.props.triggerClassName
				)}
				style={containerStyles}
				ref={this.saveTriggerRef}
			>
				{this.getAnchoredNubbinStyles()}
				{this.getContent()}
				{this.getTooltip()}
			</div>
		);
	}
}

Tooltip.contextType = IconSettingsContext;
Tooltip.displayName = displayName;
Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export default Tooltip;
