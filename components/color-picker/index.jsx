import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import shortid from 'shortid';

import checkProps from './check-props';

import CustomColor from './private/custom-color';
import Swatch from './private/swatch';
import SwatchPicker from './private/swatch-picker';

import Button from '../button';
import Input from '../forms/input';
import Tabs from '../tabs';
import TabsPanel from '../tabs/panel';
import Popover from '../popover';

import ColorUtils from '../../utilities/color';

import { COLOR_PICKER } from '../../utilities/constants';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * * `hueSlider`: Instructions for hue selection input
	 * * `saturationValueGrid`: Instructions for using the grid for saturation
	 * and value selection
	 */
	assistiveText: PropTypes.shape({
		hueSlider: PropTypes.string,
		saturationValueGrid: PropTypes.string,
	}),
	/**
	 * CSS classes to be added to tag with `.slds-color-picker`. Uses `classNames` [API](https://github.com/JedWatson/classnames). _Tested with snapshot testing._
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * CSS classes to be added to tag with `.slds-popover`. Uses `classNames` [API](https://github.com/JedWatson/classnames). _Tested with snapshot testing._
	 */
	classNameMenu: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Unique ID for component
	 */
	id: PropTypes.string,
	/**
	 * Disables the input and button
	 */
	disabled: PropTypes.bool,
	/**
	 * Event Callbacks
	 * * `onChange`: This function is triggered when done is clicked. This function returns `{event, { color: [string] }}`, which is a hex representation of the color.
	 * * `onClose`: This function is triggered when the menu is closed. This function returns `{event, { trigger, componentWillUnmount }}`. Trigger can have the values `cancel`, `clickOutside`, or `newPopover`.
	 * * `onOpen`: This function is triggered when the color-picker menu is mounted and added to the DOM. The parameters are `event, { portal: }`. `portal` can be used as a React tree root node.
	 * * `onRequestClose`:  This function is triggered when the user clicks outside the menu or clicks the close button. You will want to define this if color-picker is to be a controlled component. Most of the time you will want to set `isOpen` to `false` when this is triggered unless you need to validate something.
	 * 						This function returns `{event, {trigger: [string]}}` where `trigger` is either `cancel` or `clickOutside`.
	 * * `onRequestOpen`: Function called when the color-picker menu would like show.
	 * * `onWorkingColorChange`: This function is triggered when working color changes (color inside the custom tab menu). This function returns `{event, { color: [string] }}`, which is a hex representation of the color.
	 * _Tested with Mocha framework._
	 */
	events: PropTypes.shape({
		onChange: PropTypes.func,
		onClose: PropTypes.func,
		onOpen: PropTypes.func,
		onRequestClose: PropTypes.func,
		onRequestOpen: PropTypes.func,
		onWorkingColorChange: PropTypes.func,
	}),
	/**
	 * By default, dialogs will flip their alignment (such as bottom to top) if they extend beyond a boundary element such as a scrolling parent or a window/viewpoint. `hasStaticAlignment` disables this behavior and allows this component to extend beyond boundary elements. _Not tested._
	 */
	hasStaticAlignment: PropTypes.bool,
	/**
	 * Hides the text input
	 */
	hideInput: PropTypes.bool,
	/**
	 * Popover open state
	 */
	isOpen: PropTypes.bool,
	/**
	 * **Text labels for internationalization**
	 * * `blueAbbreviated`: One letter abbreviation of blue color component
	 * * `cancelButton`: Text for cancel button on popover
	 * * `customTab`: Text for custom tab of popover
	 * * `greenAbbreviated`: One letter abbreviation of green color component
	 * * `hexLabel`: Label for input of hexadecimal color
	 * * `invalidColor`: Error message when hex color input is invalid
	 * * `invalidComponent`: Error message when a component input is invalid
	 * * `redAbbreviated`: One letter abbreviation of red color component
	 * * `swatchTab`: Label for swatch tab of popover
	 * * `submitButton`: Text for submit/done button of popover
	 */
	labels: PropTypes.shape({
		blueAbbreviated: PropTypes.string,
		cancelButton: PropTypes.string,
		customTab: PropTypes.string,
		greenAbbreviated: PropTypes.string,
		hexLabel: PropTypes.string,
		invalidColor: PropTypes.string,
		invalidComponent: PropTypes.string,
		redAbbreviated: PropTypes.string,
		swatchTab: PropTypes.string,
		submitButton: PropTypes.string,
	}),
	/**
	 * Please select one of the following:
	 * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
	 * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
	 * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
	 */
	menuPosition: PropTypes.oneOf([
		'absolute',
		'overflowBoundaryElement',
		'relative',
	]),
	/**
	 * An array of hex color values which is used to set the options of the
	 * swatch tab of the colorpicker popover.
	 * To specify transparent, use empty string as a value.
	 */
	swatchColors: PropTypes.arrayOf(PropTypes.string),
	/**
	 * Determines which tab is visible when dialog opens. Use this prop with `base` variant only.
	 * Defaults to `swatch` tab.
	 */
	tabSelector: PropTypes.oneOf('swatches, custom'),
	/**
	 * Selects which tabs are present for the colorpicker.
	 * * `base`: both swatches and custom tabs are present
	 * * `swatches`: only swatch tab is present
	 * * `custom`: only custom tab is present
	 */
	variant: PropTypes.oneOf(['base', 'swatches', 'custom']),
	/**
	 * Current color in hexadecimal string, including # sign (eg: "#000000")
	 */
	value: PropTypes.string,
};

const defaultProps = {
	assistiveText: {
		saturationValueGrid:
			'Use arrow keys to select a saturation and brightness, on an x and y axis.',
		hueSlider: 'Select Hue',
	},
	events: {},
	labels: {
		blueAbbreviated: 'B',
		cancelButton: 'Cancel',
		customTab: 'Custom',
		greenAbbreviated: 'G',
		hexLabel: 'Hex',
		invalidColor: 'The color entered is invalid',
		invalidComponent: 'The value needs to be an integer from 0-255',
		redAbbreviated: 'R',
		submitButton: 'Done',
		swatchTab: 'Default',
	},
	menuPosition: 'absolute',
	swatchColors: [
		'#e3abec',
		'#c2dbf7',
		'#9fd6ff',
		'#9de7da',
		'#9df0c0',
		'#fff099',
		'#fed49a',
		'#d073e0',
		'#86baf3',
		'#5ebbff',
		'#44d8be',
		'#3be282',
		'#ffe654',
		'#ffb758',
		'#bd35bd',
		'#5779c1',
		'#5679c0',
		'#00aea9',
		'#3cba4c',
		'#f5bc25',
		'#f99221',
		'#580d8c',
		'#001970',
		'#0a2399',
		'#0b7477',
		'#0b6b50',
		'#b67e11',
		'',
	],
	tabSelector: 'swatches',
	variant: 'base',
};

class ColorPicker extends React.Component {
	static displayName = COLOR_PICKER;
	static propTypes = propTypes;
	static defaultProps = defaultProps;

	constructor(props) {
		super(props);

		this.generatedId = this.props.id || shortid.generate();

		this.state = {
			currentColor: this.props.value || '',
			disabled: this.props.disabled,
			isOpen: this.props.isOpen,
			workingColor: ColorUtils.getNewColor({
				hex: this.props.value,
			}),
		};
	}

	componentWillMount() {
		checkProps(COLOR_PICKER, this.props);
	}

	// use getDerivedStateFromProps when available
	componentWillReceiveProps(nextProps) {
		const nextState = {};

		if (nextProps.value) {
			nextState.currentColor = nextProps.value;
			nextState.workingColor = ColorUtils.getNewColor({
				hex: nextProps.value,
			});
		}

		if (nextProps.disabled !== undefined) {
			nextState.disabled = nextProps.disabled;
		}

		this.setState(nextState);
	}

	getInput(activeColor) {
		return this.props.hideInput ? null : (
			<Input
				aria-describedby={`color-picker-summary-error-${this.generatedId}`}
				className={classNames(
					'slds-color-picker__summary-input',
					'slds-align-top',
					{
						'slds-has-error': !!this.state.colorErrorMessage,
					}
				)}
				disabled={this.props.disabled}
				id={`color-picker-summary-input-${this.generatedId}`}
				maxLength="7"
				onChange={this.handleHexInputChange}
				value={activeColor}
			/>
		);
	}

	getDefaultTab() {
		return (
			(this.props.variant === 'base' || this.props.variant === 'swatches') && (
				<TabsPanel label={this.props.labels.swatchTab}>
					<SwatchPicker
						color={this.props.workingColor}
						onSelect={this.handleSwatchSelect}
						swatchColors={this.props.swatchColors}
					/>
				</TabsPanel>
			)
		);
	}

	getCustomTab() {
		return (
			(this.props.variant === 'base' || this.props.variant === 'custom') && (
				<TabsPanel label={this.props.labels.customTab}>
					<CustomColor
						assistiveText={this.props.assistiveText}
						id={this.generatedId}
						color={this.state.workingColor}
						labels={this.props.labels}
						onBlueChange={this.handleColorChange('blue')}
						onGreenChange={this.handleColorChange('green')}
						onHexChange={this.handleColorChange('hex')}
						onHueChange={this.handleColorChange('hue')}
						onRedChange={this.handleColorChange('red')}
						onSaturationValueChange={this.handleSaturationValueChange}
						onSaturationNavigate={this.handleNavigate('saturation')}
						onValueNavigate={this.handleNavigate('value')}
					/>
				</TabsPanel>
			)
		);
	}

	getPopover(activeColor) {
		const popoverBody = (
			<Tabs defaultSelectedIndex={this.props.tabSelector === 'custom' ? 1 : 0}>
				{this.getDefaultTab()}
				{this.getCustomTab()}
			</Tabs>
		);
		const popoverFooter = (
			<div className="slds-color-picker__selector-footer">
				<Button
					className="slds-color-picker__selector-cancel"
					label={this.props.labels.cancelButton}
					onClick={this.handleCancel}
					variant="neutral"
				/>
				<Button
					className="slds-color-picker__selector-submit"
					disabled={this.state.workingColor.errors}
					label={this.props.labels.submitButton}
					onClick={this.handleSubmitButtonClick}
					variant="brand"
				/>
			</div>
		);
		return (
			<Popover
				align="bottom left"
				body={popoverBody}
				className={classNames(
					'slds-color-picker__selector',
					this.props.classNameMenu
				)}
				footer={popoverFooter}
				hasStaticAlignment={this.props.hasStaticAlignment}
				isOpen={this.state.isOpen}
				onClose={this.props.onClose}
				onOpen={this.props.onOpen}
				onRequestClose={this.handleOnRequestClose}
				position={this.props.menuPosition}
			>
				<Button
					className="slds-color-picker__summary-button"
					disabled={this.props.disabled}
					iconClassName="slds-m-left_xx-small"
					iconPosition="right"
					iconVariant="more"
					label={<Swatch color={activeColor} />}
					onClick={this.handleSwatchButtonClick}
					variant="icon"
				/>
			</Popover>
		);
	}

	setWorkingColor(event, color) {
		const newColor = ColorUtils.getNewColor(color, this.state.workingColor);
		this.setState({
			workingColor: newColor,
		});

		if (this.props.events.onWorkingColorChange) {
			this.props.events.onWorkingColorChange(event, { color: newColor });
		}
	}

	handleOnRequestClose = (event, { trigger }) => {
		if (trigger === 'clickOutside' || trigger === 'cancel') {
			this.handleCancelState();
		}

		if (this.props.onRequestClose) {
			this.props.onRequestClose(event, { trigger });
		}
	};

	handleClickOutside = (event) => {
		this.handleCancelButtonClick(event);
	};

	handleCancel = (event) => {
		this.handleCancelState();

		if (this.props.onRequestClose) {
			this.props.onRequestClose(event, { trigger: 'cancel' });
		}
	};

	handleCancelState = () => {
		this.setState({
			isOpen: false,
			workingColor: ColorUtils.getNewColor({
				hex: this.state.currentColor,
			}),
		});
	};

	handleColorChange(property) {
		return (event) => {
			const colorProperties = {};
			colorProperties[property] = event.target.value;
			this.setWorkingColor(event, colorProperties);
		};
	}

	handleHexInputChange = (event) => {
		const currentColor = event.target.value;
		const isValid = ColorUtils.isValidHex(event.target.value);
		this.setState({
			currentColor,
			colorErrorMessage: isValid ? '' : this.props.labels.invalidColor,
		});

		if (this.props.events.onChange) {
			this.props.events.onChange(event, {
				color: currentColor,
				isValid
			});
		}
	};

	handleNavigate(property) {
		return (event, { delta }) => {
			const colorProperties = {};
			colorProperties[property] = delta;
			const newColor = ColorUtils.getDeltaColor(
				colorProperties,
				this.state.workingColor
			);
			this.setState({
				workingColor: newColor,
			});

			if (this.props.events.onWorkingColorChange) {
				this.props.events.onWorkingColorChange(event, { color: newColor });
			}
		};
	}

	handleSaturationValueChange = (event, { saturation, value }) => {
		this.setWorkingColor(event, {
			saturation,
			value,
		});
	};

	handleSubmitButtonClick = (event) => {
		this.setState({
			isOpen: false,
			currentColor: this.state.workingColor.hex,
			colorErrorMessage: '',
		});

		if (this.props.events.onChange) {
			this.props.events.onChange(event, {
				color: this.state.workingColor.hex,
				isValid: true
			});
		}
	};

	handleSwatchButtonClick = () => {
		this.setState({
			isOpen: !this.state.isOpen,
			workingColor: ColorUtils.getNewColor({
				hex: this.state.currentColor,
			}),
		});
		if (this.props.onRequestOpen) {
			this.props.onRequestOpen();
		}
	};

	handleSwatchSelect = (event, { hex }) => {
		this.setWorkingColor(event, {
			hex,
		});
	};

	render() {
		const activeColor = this.state.isOpen
			? this.state.workingColor.hex
			: this.state.currentColor;
		return (
			<div
				className={classNames('slds-color-picker', this.props.className)}
				ref={(node) => {
					this.wrapper = node;
				}}
			>
				<div className="slds-color-picker__summary">
					<span
						className="slds-color-picker__summary-label"
						htmlFor={`color-picker-summary-input-${this.generatedId}`}
					>
						{this.props.labels.label}
					</span>
					{this.getPopover(activeColor)}
					{this.getInput(activeColor)}
					{!this.state.isOpen && this.state.colorErrorMessage ? (
						<p
							className="slds-form-error"
							id={`color-picker-summary-error-${this.generatedId}`}
						>
							{this.state.colorErrorMessage}
						</p>
					) : (
							''
						)}
				</div>
			</div>
		);
	}
}

export default ColorPicker;
