/* eslint-disable max-lines */
import React, {
	useState,
	useCallback,
	useRef,
	useEffect,
	useMemo,
} from 'react';
import classNames from 'classnames';

import checkProps from './check-props';

import CustomColor from './private/custom-color';
import Swatch from './private/swatch';
import SwatchPicker from './private/swatch-picker';

import Button from '../button';
import Input, { type InputChangeData } from '../input';
import Tabs from '../tabs';
import TabsPanel from '../tabs/panel';
import Popover from '../popover';

import ColorUtils from '../../utilities/color';
import { COLOR_PICKER } from '../../utilities/constants';
import generateId from '../../utilities/generate-id';

import {
	WorkingColor,
	ColorPickerAssistiveText,
	ColorPickerLabels,
	ColorPickerEvents,
} from './types';

export interface ColorPickerProps {
	/** Assistive text for accessibility */
	assistiveText?: ColorPickerAssistiveText;
	/** CSS classes for the color-picker container */
	className?: string | string[] | Record<string, boolean>;
	/** CSS classes for the popover menu */
	classNameMenu?: string | string[] | Record<string, boolean>;
	/** Unique ID for the component */
	id?: string;
	/** Disables the input and button */
	disabled?: boolean;
	/** Error message for the outer input */
	errorText?: string;
	/** Error message for the custom tab working color input */
	errorTextWorkingColor?: string;
	/** Event callbacks */
	events?: ColorPickerEvents;
	/** Disable flip behavior for popover alignment */
	hasStaticAlignment?: boolean;
	/** Hides the text input */
	hideInput?: boolean;
	/** Controlled popover open state */
	isOpen?: boolean;
	/** Text labels for internationalization */
	labels?: ColorPickerLabels;
	/** Popover position strategy */
	menuPosition?: 'absolute' | 'overflowBoundaryElement' | 'relative';
	/** Array of hex color values for swatch options */
	swatchColors?: string[];
	/** Which tab is visible when dialog opens (base variant only) */
	defaultSelectedTab?: 'swatches' | 'custom';
	/** Which tabs are present */
	variant?: 'base' | 'swatches' | 'custom';
	/** Current color in hexadecimal string */
	value?: string;
	/** Current working color in hexadecimal string */
	valueWorking?: string;
	/** Callback when popover closes */
	onClose?: (
		event: React.SyntheticEvent,
		data: { trigger?: string; componentWillUnmount?: boolean }
	) => void;
	/** Callback when popover opens */
	onOpen?: (
		event: React.SyntheticEvent,
		data: { portal?: HTMLElement }
	) => void;
	/** Callback when user requests close */
	onRequestClose?: (
		event: React.SyntheticEvent,
		data: { trigger: string }
	) => void;
	/** Callback when popover requests to open */
	onRequestOpen?: () => void;
}

const defaultLabels: ColorPickerLabels = {
	blueAbbreviated: 'B',
	cancelButton: 'Cancel',
	customTab: 'Custom',
	customTabActiveWorkingColorSwatch: 'Working Color',
	customTabTransparentSwatch: 'Transparent Swatch',
	greenAbbreviated: 'G',
	hexLabel: 'Hex',
	invalidColor: 'The color entered is invalid',
	invalidComponent: 'The value needs to be an integer from 0-255',
	redAbbreviated: 'R',
	submitButton: 'Done',
	swatchTab: 'Default',
	swatchTabTransparentSwatch: 'Transparent Swatch',
};

const defaultAssistiveText: ColorPickerAssistiveText = {
	saturationValueGrid:
		'Use arrow keys to select a saturation and brightness, on an x and y axis.',
	hueSlider: 'Select Hue',
};

const defaultSwatchColors = [
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
	'#b85d0d',
	'',
];

/**
 * The Unified Color Picker component allows for a fully accessible and
 * configurable color picker, allowing the user to pick from a set of
 * predefined colors (swatches), or to pick a custom color using a HSB
 * selection interface.
 */
const ColorPicker: React.FC<ColorPickerProps> = ({
	assistiveText: assistiveTextProp,
	className,
	classNameMenu,
	id: idProp,
	disabled = false,
	errorText: errorTextProp,
	errorTextWorkingColor,
	events = {},
	hasStaticAlignment,
	hideInput = false,
	isOpen: isOpenProp,
	labels: labelsProp,
	menuPosition = 'absolute',
	swatchColors = defaultSwatchColors,
	defaultSelectedTab = 'swatches',
	variant = 'base',
	value: valueProp,
	valueWorking: valueWorkingProp,
	onClose,
	onOpen,
	onRequestClose,
	onRequestOpen,
}) => {
	// Merge labels and assistive text with defaults
	const labels = useMemo(
		() => ({ ...defaultLabels, ...labelsProp }),
		[labelsProp]
	);
	const assistiveText = useMemo(
		() => ({ ...defaultAssistiveText, ...assistiveTextProp }),
		[assistiveTextProp]
	);

	// Generate stable ID
	const generatedId = useRef(idProp || generateId());
	const componentId = idProp || generatedId.current;

	// Refs
	const wrapperRef = useRef<HTMLDivElement>(null);

	// Initialize working color from props
	const getInitialWorkingColor = useCallback((): WorkingColor => {
		return ColorUtils.getNewColor(
			{ hex: valueWorkingProp || valueProp },
			events.onValidateWorkingColor
		) as WorkingColor;
	}, [valueWorkingProp, valueProp, events.onValidateWorkingColor]);

	// State
	const [currentColor, setCurrentColor] = useState<string>(
		valueProp != null ? valueProp : ''
	);
	const [isOpen, setIsOpen] = useState<boolean>(isOpenProp || false);
	const [workingColor, setWorkingColor] = useState<WorkingColor>(
		getInitialWorkingColor
	);
	const [previousWorkingColor, setPreviousWorkingColor] = useState<WorkingColor>(
		getInitialWorkingColor
	);
	const [colorErrorMessage, setColorErrorMessage] = useState<string>(
		errorTextProp || ''
	);

	// Check props on mount (development only)
	useEffect(() => {
		// checkProps is a no-op in production
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(checkProps as any)(COLOR_PICKER, {
			assistiveText: assistiveTextProp,
			className,
			classNameMenu,
			id: idProp,
			disabled,
			errorText: errorTextProp,
			errorTextWorkingColor,
			events,
			hasStaticAlignment,
			hideInput,
			isOpen: isOpenProp,
			labels: labelsProp,
			menuPosition,
			swatchColors,
			defaultSelectedTab,
			variant,
			value: valueProp,
			valueWorking: valueWorkingProp,
		}, {});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Sync props to state when they change externally
	useEffect(() => {
		if (valueProp !== undefined) {
			setCurrentColor(valueProp);
		}
	}, [valueProp]);

	useEffect(() => {
		if (valueWorkingProp !== undefined) {
			setWorkingColor(
				ColorUtils.getNewColor(
					{ hex: valueWorkingProp },
					events.onValidateWorkingColor
				) as WorkingColor
			);
		}
	}, [valueWorkingProp, events.onValidateWorkingColor]);

	useEffect(() => {
		if (isOpenProp !== undefined) {
			setIsOpen(isOpenProp);
		}
	}, [isOpenProp]);

	// Helper to update working color
	const updateWorkingColor = useCallback(
		(
			event: React.SyntheticEvent,
			colorOptions: { hex?: string; red?: string | number; green?: string | number; blue?: string | number; hue?: number | string; saturation?: number; value?: number }
		) => {
			const newColor = ColorUtils.getNewColor(
				colorOptions,
				events.onValidateWorkingColor,
				workingColor
			) as WorkingColor;
			setPreviousWorkingColor(workingColor);
			setWorkingColor(newColor);

			if (events.onWorkingColorChange) {
				events.onWorkingColorChange(event, { color: newColor });
			}
		},
		[events, workingColor]
	);

	// Event handlers
	const handleSwatchChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			updateWorkingColor(event, { hex: event.target.value });
		},
		[updateWorkingColor]
	);

	const handleCancelState = useCallback(() => {
		const resetColor = ColorUtils.getNewColor(
			{ hex: currentColor },
			events.onValidateWorkingColor
		) as WorkingColor;
		setIsOpen(false);
		setWorkingColor(resetColor);
		setPreviousWorkingColor(resetColor);
	}, [currentColor, events.onValidateWorkingColor]);

	const handleOnRequestClose = useCallback(
		(event: React.SyntheticEvent, data: { trigger: string }) => {
			if (data.trigger === 'clickOutside' || data.trigger === 'cancel') {
				handleCancelState();
			}

			if (onRequestClose) {
				onRequestClose(event, data);
			}
		},
		[handleCancelState, onRequestClose]
	);

	const handleCancel = useCallback(
		(event: React.MouseEvent) => {
			handleCancelState();

			if (onRequestClose) {
				onRequestClose(event, { trigger: 'cancel' });
			}
		},
		[handleCancelState, onRequestClose]
	);

	const handleColorChange = useCallback(
		(property: 'hex' | 'red' | 'green' | 'blue') =>
			(event: React.SyntheticEvent, data: InputChangeData) => {
				const colorProperties: Record<string, string | number> = {};
				colorProperties[property] = data.value;
				updateWorkingColor(event, colorProperties);
			},
		[updateWorkingColor]
	);

	const handleHueChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			updateWorkingColor(event, { hue: event.target.value });
		},
		[updateWorkingColor]
	);

	const handleHexInputChange = useCallback(
		(event: React.SyntheticEvent, data: InputChangeData) => {
			const newCurrentColor = data.value;
			const namedColorHex = ColorUtils.getHexFromNamedColor(newCurrentColor);
			let isValid = false;

			if (events.onValidateColor) {
				isValid = events.onValidateColor(newCurrentColor);
			} else {
				isValid = namedColorHex
					? true
					: ColorUtils.isValidHex(newCurrentColor);
			}

		setCurrentColor(newCurrentColor);
		setWorkingColor(
			ColorUtils.getNewColor(
				{
					hex: namedColorHex || newCurrentColor,
					name: namedColorHex ? newCurrentColor.toLowerCase() : null,
				} as { hex: string; name?: string | null },
				events.onValidateWorkingColor
			) as WorkingColor
		);
		setColorErrorMessage(isValid ? '' : labels.invalidColor || '');

			if (events.onChange) {
				events.onChange(event, {
					color: newCurrentColor,
					isValid,
				});
			}
		},
		[events, labels.invalidColor]
	);

	const handleNavigate = useCallback(
		(property: 'saturation' | 'value') =>
			(event: React.KeyboardEvent, data: { delta: number }) => {
				const colorProperties: Record<string, number> = {};
				colorProperties[property] = data.delta;
				const newColor = ColorUtils.getDeltaColor(
					colorProperties,
					events.onValidateWorkingColor,
					workingColor
				) as WorkingColor;
				setPreviousWorkingColor(workingColor);
				setWorkingColor(newColor);

				if (events.onWorkingColorChange) {
					events.onWorkingColorChange(event, { color: newColor });
				}
			},
		[events, workingColor]
	);

	const handleSaturationValueChange = useCallback(
		(
			event: React.MouseEvent | React.KeyboardEvent,
			data: { saturation: number; value: number }
		) => {
			updateWorkingColor(event, {
				saturation: data.saturation,
				value: data.value,
			});
		},
		[updateWorkingColor]
	);

	const handleSubmitButtonClick = useCallback(
		(event: React.MouseEvent) => {
			setIsOpen(false);
			setCurrentColor(workingColor.hex);
			setColorErrorMessage('');

			if (events.onChange) {
				events.onChange(event, {
					color: workingColor.hex,
					isValid: true,
				});
			}
		},
		[events, workingColor.hex]
	);

	const handleSwatchButtonClick = useCallback(() => {
		const newWorkingColor = ColorUtils.getNewColor(
			{ hex: workingColor.hex },
			events.onValidateWorkingColor
		) as WorkingColor;
		setIsOpen((prev) => !prev);
		setWorkingColor(newWorkingColor);

		if (onRequestOpen) {
			onRequestOpen();
		}
	}, [events.onValidateWorkingColor, onRequestOpen, workingColor.hex]);

	const handleSwatchSelect = useCallback(
		(event: React.MouseEvent | React.KeyboardEvent, data: { hex: string }) => {
			updateWorkingColor(event, { hex: data.hex });
		},
		[updateWorkingColor]
	);

	// Render helpers
	const renderInput = () => {
		if (hideInput) return null;

		return (
			<Input
				aria-describedby={
					!isOpen && colorErrorMessage
						? `color-picker-summary-error-${componentId}`
						: undefined
				}
				className={classNames(
					'slds-color-picker__summary-input',
					'slds-align-top',
					{
						'slds-has-error': !!colorErrorMessage,
					}
				)}
				disabled={disabled}
				id={`color-picker-summary-input-${componentId}`}
				onChange={handleHexInputChange}
				value={currentColor}
			/>
		);
	};

	const renderDefaultTab = () => {
		if (variant !== 'base' && variant !== 'swatches') return null;

		return (
			<TabsPanel label={labels.swatchTab ?? ""}>
				<SwatchPicker
					color={workingColor}
					labels={labels}
					onSelect={handleSwatchSelect}
					swatchColors={swatchColors}
				/>
			</TabsPanel>
		);
	};

	const renderCustomTab = () => {
		if (variant !== 'base' && variant !== 'custom') return null;

		return (
			<TabsPanel label={labels.customTab ?? ""}>
				<CustomColor
					assistiveText={assistiveText}
					id={componentId}
					color={workingColor}
					errorTextWorkingColor={errorTextWorkingColor}
					previousColor={previousWorkingColor}
					labels={labels}
					onBlueChange={handleColorChange('blue')}
					onGreenChange={handleColorChange('green')}
					onHexChange={handleColorChange('hex')}
					onHueChange={handleHueChange}
					onRedChange={handleColorChange('red')}
					onSwatchChange={handleSwatchChange}
					onSaturationValueChange={handleSaturationValueChange}
					onSaturationNavigate={handleNavigate('saturation')}
					onValueNavigate={handleNavigate('value')}
				/>
			</TabsPanel>
		);
	};

	const popoverBody = (
		<Tabs
			id={`color-picker-tabs-${componentId}`}
			defaultSelectedIndex={defaultSelectedTab === 'custom' ? 1 : 0}
		>
			{renderDefaultTab()}
			{renderCustomTab()}
		</Tabs>
	);

	const popoverFooter = (
		<div className="slds-color-picker__selector-footer">
			<Button
				className="slds-color-picker__selector-cancel"
				id={`color-picker-footer-cancel-${componentId}`}
				label={labels.cancelButton}
				onClick={handleCancel}
				variant="neutral"
			/>
			<Button
				className="slds-color-picker__selector-submit"
				disabled={Object.keys(workingColor.errors || {}).length > 0}
				id={`color-picker-footer-submit-${componentId}`}
				label={labels.submitButton}
				onClick={handleSubmitButtonClick}
				variant="brand"
			/>
		</div>
	);

	return (
		<div
			className={classNames('slds-color-picker', className)}
			ref={wrapperRef}
		>
			<div className="slds-color-picker__summary">
				<label
					className={classNames(
						'slds-color-picker__summary-label',
						assistiveText.label ? 'slds-assistive-text' : ''
					)}
					htmlFor={
						!hideInput
							? `color-picker-summary-input-${componentId}`
							: undefined
					}
					id={`color-picker-label-${componentId}`}
				>
					{assistiveText.label ? assistiveText.label : labels.label}
				</label>
				<Popover
					ariaLabelledby={`color-picker-label-${componentId}`}
					align="bottom left"
					body={popoverBody}
					className={classNames(
						'slds-color-picker__selector',
						classNameMenu
					)}
					footer={popoverFooter}
					hasNoCloseButton
					hasNoNubbin
					hasStaticAlignment={hasStaticAlignment}
					id={`slds-color-picker__selector-${componentId}`}
					isOpen={isOpen}
					onClose={onClose as unknown as ((event?: unknown, data?: { componentWillUnmount?: boolean }) => void) | undefined}
					onOpen={onOpen as unknown as ((event?: unknown, data?: { portal?: HTMLElement }) => void) | undefined}
					onRequestClose={handleOnRequestClose as unknown as ((event?: unknown, data?: { trigger?: string }) => void) | undefined}
					position={menuPosition}
				>
					<Button
						className="slds-color-picker__summary-button"
						disabled={disabled}
						iconClassName="slds-m-left_xx-small"
						iconPosition="right"
						iconVariant="more"
						id={`slds-color-picker__summary-button-${componentId}`}
						label={
							<div>
								<span className="slds-assistive-text">
									{assistiveText.label
										? assistiveText.label
										: labels.label}
								</span>
								<Swatch color={currentColor} labels={labels} />
							</div>
						}
						onClick={handleSwatchButtonClick}
						variant="icon"
					/>
				</Popover>
				{renderInput()}
				{!isOpen && colorErrorMessage && (
					<p
						className="slds-form-error"
						id={`color-picker-summary-error-${componentId}`}
					>
						{colorErrorMessage}
					</p>
				)}
			</div>
		</div>
	);
};

ColorPicker.displayName = COLOR_PICKER;

export default ColorPicker;

