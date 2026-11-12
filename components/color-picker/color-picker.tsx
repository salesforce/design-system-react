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
import TabsPanel from '../tabs/panel';
import ColorPickerTabs from './private/color-picker-tabs';
import Popover from '../popover';

import ColorUtils from '../../utilities/color';
import { COLOR_PICKER } from '../../utilities/constants';
import generateId from '../../utilities/generate-id';
import { useControllableState, useLatestRef } from '../../utilities/hooks';

import {
	WorkingColor,
	ColorPickerAssistiveText,
	ColorPickerLabels,
	ColorPickerChangeHandler,
	ColorPickerEvents,
	ColorPickerRequestCloseData,
} from './types';

interface ColorPickerBaseProps {
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
	/**
	 * Error message for the outer input. When empty, the message is derived from `value`:
	 * `labels.invalidColor` is shown while `value` fails validation (`validateColor`, or the
	 * built-in hex/named-color check).
	 */
	errorText?: string;
	/** Error message for the custom tab working color input */
	errorTextWorkingColor?: string;
	/** Disable flip behavior for popover alignment */
	hasStaticAlignment?: boolean;
	/** Hides the text input */
	hideInput?: boolean;
	/**
	 * Initial open state of the popover when `isOpen` is not set (uncontrolled). Defaults to `false`.
	 */
	defaultIsOpen?: boolean;
	/**
	 * Whether the popover is open. When set, the popover is controlled: it only opens or closes
	 * when this prop changes, so update it from `onRequestOpen` and `onRequestClose`. When
	 * `undefined`, the popover manages its own open state (see `defaultIsOpen`).
	 */
	isOpen?: boolean;
	/** Text labels for internationalization */
	labels?: ColorPickerLabels;
	/** Popover position strategy */
	menuPosition?: 'absolute' | 'overflowBoundaryElement' | 'relative';
	/**
	 * Current color as a hexadecimal string (or a CSS color name); `''` for no color. Required and
	 * controlled: the summary input and swatch always render this value. Update it from
	 * `events.onChange`, which fires when the user types in the input (`isValid` says whether the
	 * text is a valid color) and when Done is clicked.
	 */
	value: string;
	/**
	 * Working color (the in-popover draft) as a hexadecimal string. When set, the working color
	 * is controlled: update it from `events.onWorkingColorChange`. When `undefined`, the working
	 * color is internal and is reset from `value` each time the popover opens.
	 */
	valueWorking?: string;
	/** @deprecated Use `events.onClose` instead. Still works, and warns. */
	onClose?: ColorPickerEvents['onClose'];
	/** @deprecated Use `events.onOpen` instead. Still works, and warns. */
	onOpen?: ColorPickerEvents['onOpen'];
	/** @deprecated Use `events.onRequestClose` instead. Still works, and warns. */
	onRequestClose?: ColorPickerEvents['onRequestClose'];
	/** @deprecated Use `events.onRequestOpen` instead. Still works, and warns. */
	onRequestOpen?: ColorPickerEvents['onRequestOpen'];
	/**
	 * Replaces the built-in hex/named-color check for the summary input. Returns whether `hex`
	 * is a valid color.
	 */
	validateColor?: (hex: string) => boolean;
	/**
	 * Replaces the built-in hex check for the custom tab's working color input. Returns whether
	 * `hex` is a valid color.
	 */
	validateWorkingColor?: (hex: string) => boolean;
}

/**
 * `variant` sets which tabs are present. `swatchColors` needs the swatch tab
 * and `defaultSelectedTab` only applies when both tabs are present.
 */
export type ColorPickerVariantProps =
	| {
			/** Both the swatch and custom tabs */
			variant?: 'base';
			/** Array of hex color values for swatch options */
			swatchColors?: string[];
			/** Which tab is visible when dialog opens */
			defaultSelectedTab?: 'swatches' | 'custom';
	  }
	| {
			/** Only the swatch tab */
			variant: 'swatches';
			/** Array of hex color values for swatch options */
			swatchColors?: string[];
			defaultSelectedTab?: never;
	  }
	| {
			/** Only the custom tab */
			variant: 'custom';
			swatchColors?: never;
			defaultSelectedTab?: never;
	  };

/**
 * `events.onChange` is required unless the color picker is `disabled`:
 * ColorPicker is controlled, so without it choosing a color does nothing.
 */
export type ColorPickerEventsProps =
	| {
			/** Event callbacks. `events.onChange` is required unless `disabled` is set. */
			events: ColorPickerEvents & { onChange: ColorPickerChangeHandler };
	  }
	| { disabled: true; events?: ColorPickerEvents };

export type ColorPickerProps = ColorPickerBaseProps &
	ColorPickerVariantProps &
	ColorPickerEventsProps;

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

type HexValidator = ((hex: string) => boolean) | undefined;

// A module constant, so a missing `events` doesn't create a new object every render
const NO_EVENTS: ColorPickerEvents = {};

/** Builds a working color from a color value, resolving CSS color names to hex. */
const getWorkingColorFromValue = (
	color: string,
	validator: HexValidator
): WorkingColor => {
	const namedColorHex = ColorUtils.getHexFromNamedColor(color);
	return ColorUtils.getNewColor(
		{
			hex: namedColorHex || color,
			name: namedColorHex ? color.toLowerCase() : null,
		} as { hex: string; name?: string | null },
		validator
	) as WorkingColor;
};

/** Whether `color` is valid for the summary input. */
const isValidColor = (color: string, validator: HexValidator): boolean => {
	if (validator) {
		return !!validator(color);
	}
	return ColorUtils.getHexFromNamedColor(color)
		? true
		: ColorUtils.isValidHex(color);
};

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
	defaultIsOpen = false,
	disabled = false,
	errorText: errorTextProp,
	errorTextWorkingColor,
	events = NO_EVENTS,
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
	validateColor: validateColorProp,
	validateWorkingColor: validateWorkingColorProp,
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

	// `value` is controlled data. A missing `value` (warned in `checkProps`) renders as no color.
	const value = valueProp ?? '';
	const validateColor = validateColorProp ?? events.onValidateColor;
	const validateWorkingColor =
		validateWorkingColorProp ?? events.onValidateWorkingColor;

	// Handlers read the latest callbacks, so a new `events` object each render doesn't rebuild
	// them. The deprecated top-level callbacks are called after their `events` counterparts.
	const eventsRef = useLatestRef(events);
	const deprecatedEventsRef = useLatestRef({
		onClose,
		onOpen,
		onRequestClose,
		onRequestOpen,
	});

	// Popover open state is ephemeral UI: controlled when `isOpen` is set, internal otherwise
	const [isOpen, setIsOpen] = useControllableState(isOpenProp, defaultIsOpen);

	// The in-popover working color is a draft of `value`. It is reset from `value` when the
	// popover opens and when `value` changes.
	const [draftColor, setDraftColor] = useState<WorkingColor>(() =>
		getWorkingColorFromValue(value, validateWorkingColor)
	);
	const [previousWorkingColor, setPreviousWorkingColor] =
		useState<WorkingColor>(draftColor);
	const [syncedFrom, setSyncedFrom] = useState({ value, isOpen });
	if (syncedFrom.value !== value || syncedFrom.isOpen !== isOpen) {
		// Adjusting state while rendering, so the popover never shows a stale draft
		setSyncedFrom({ value, isOpen });
		if (syncedFrom.value !== value || isOpen) {
			const resetColor = getWorkingColorFromValue(value, validateWorkingColor);
			setDraftColor(resetColor);
			setPreviousWorkingColor(resetColor);
		}
	}

	// A controlled `valueWorking` always wins. The draft is only used for it while it describes
	// the same hex, so partial RGB input and hue are kept while the parent accepts each change.
	const workingColor = useMemo(
		() =>
			valueWorkingProp !== undefined && draftColor.hex !== valueWorkingProp
				? (ColorUtils.getNewColor(
						{ hex: valueWorkingProp },
						validateWorkingColor
					) as WorkingColor)
				: draftColor,
		[valueWorkingProp, draftColor, validateWorkingColor]
	);

	// Derived from `value` on every render rather than seeded once
	const isValueValid = useMemo(
		() => isValidColor(value, validateColor),
		[value, validateColor]
	);
	const colorErrorMessage =
		errorTextProp || (isValueValid ? '' : labels.invalidColor || '');

	// Check props on mount (development only)
	useEffect(() => {
		// checkProps is a no-op in production
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(checkProps as any)(
			COLOR_PICKER,
			{
				assistiveText: assistiveTextProp,
				className,
				classNameMenu,
				id: idProp,
				disabled,
				errorText: errorTextProp,
				errorTextWorkingColor,
				events,
				hasStaticAlignment,
				onClose,
				onOpen,
				onRequestClose,
				onRequestOpen,
				hideInput,
				isOpen: isOpenProp,
				labels: labelsProp,
				menuPosition,
				swatchColors,
				defaultSelectedTab,
				variant,
				value: valueProp,
				valueWorking: valueWorkingProp,
			},
			{}
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Report a new working color. The draft updates, but a controlled `valueWorking` still wins.
	const setNextWorkingColor = useCallback(
		(event: React.SyntheticEvent, newColor: WorkingColor) => {
			setPreviousWorkingColor(workingColor);
			setDraftColor(newColor);

			eventsRef.current.onWorkingColorChange?.(event, { color: newColor });
		},
		[eventsRef, workingColor]
	);

	// Helper to update working color
	const updateWorkingColor = useCallback(
		(
			event: React.SyntheticEvent,
			colorOptions: {
				hex?: string;
				red?: string | number;
				green?: string | number;
				blue?: string | number;
				hue?: number | string;
				saturation?: number;
				value?: number;
			}
		) => {
			setNextWorkingColor(
				event,
				ColorUtils.getNewColor(
					colorOptions,
					validateWorkingColor,
					workingColor
				) as WorkingColor
			);
		},
		[setNextWorkingColor, validateWorkingColor, workingColor]
	);

	// Event handlers
	const handleSwatchChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			updateWorkingColor(event, { hex: event.target.value });
		},
		[updateWorkingColor]
	);

	// Request a close before it happens. Uncontrolled, the popover then closes itself; controlled,
	// the parent decides.
	const requestClose = useCallback(
		(event: React.SyntheticEvent, data: ColorPickerRequestCloseData) => {
			eventsRef.current.onRequestClose?.(event, data);
			deprecatedEventsRef.current.onRequestClose?.(event, data);

			setIsOpen(false);
		},
		[eventsRef, deprecatedEventsRef, setIsOpen]
	);

	const handleClose = useCallback(
		(
			event: React.SyntheticEvent,
			data: { trigger?: string; componentWillUnmount?: boolean }
		) => {
			eventsRef.current.onClose?.(event, data);
			deprecatedEventsRef.current.onClose?.(event, data);
		},
		[eventsRef, deprecatedEventsRef]
	);

	const handleOpen = useCallback(
		(event: React.SyntheticEvent, data: { portal?: HTMLElement }) => {
			eventsRef.current.onOpen?.(event, data);
			deprecatedEventsRef.current.onOpen?.(event, data);
		},
		[eventsRef, deprecatedEventsRef]
	);

	const handleCancel = useCallback(
		(event: React.MouseEvent) => {
			requestClose(event, { trigger: 'cancel' });
		},
		[requestClose]
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

	// The summary input is controlled by `value`: report the typed text and let the parent decide
	const handleHexInputChange = useCallback(
		(event: React.SyntheticEvent, data: InputChangeData) => {
			const isValid = isValidColor(data.value, validateColor);

			eventsRef.current.onChange?.(event, { color: data.value, isValid });
		},
		[eventsRef, validateColor]
	);

	const handleNavigate = useCallback(
		(property: 'saturation' | 'value') =>
			(event: React.KeyboardEvent, data: { delta: number }) => {
				const colorProperties: Record<string, number> = {};
				colorProperties[property] = data.delta;
				setNextWorkingColor(
					event,
					ColorUtils.getDeltaColor(
						colorProperties,
						validateWorkingColor,
						workingColor
					) as WorkingColor
				);
			},
		[setNextWorkingColor, validateWorkingColor, workingColor]
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
			eventsRef.current.onChange?.(event, {
				color: workingColor.hex,
				isValid: true,
			});

			requestClose(event, { trigger: 'submit' });
		},
		[eventsRef, requestClose, workingColor.hex]
	);

	// While open, Popover has already requested a close (`triggerClick`) for this click
	const handleSwatchButtonClick = useCallback(() => {
		if (!isOpen) {
			eventsRef.current.onRequestOpen?.();
			deprecatedEventsRef.current.onRequestOpen?.();

			setIsOpen(true);
		}
	}, [eventsRef, deprecatedEventsRef, isOpen, setIsOpen]);

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
				value={value}
			/>
		);
	};

	const renderDefaultTab = () => {
		if (variant !== 'base' && variant !== 'swatches') return null;

		return (
			<TabsPanel label={labels.swatchTab ?? ''}>
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
			<TabsPanel label={labels.customTab ?? ''}>
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
		<ColorPickerTabs
			id={`color-picker-tabs-${componentId}`}
			defaultValue={defaultSelectedTab === 'custom' ? '1' : '0'}
		>
			{renderDefaultTab()}
			{renderCustomTab()}
		</ColorPickerTabs>
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
						!hideInput ? `color-picker-summary-input-${componentId}` : undefined
					}
					id={`color-picker-label-${componentId}`}
				>
					{assistiveText.label ? assistiveText.label : labels.label}
				</label>
				<Popover
					ariaLabelledby={`color-picker-label-${componentId}`}
					align="bottom left"
					body={popoverBody}
					classNameDialog={classNames(
						'slds-color-picker__selector',
						classNameMenu
					)}
					footer={popoverFooter}
					hasNoCloseButton
					hasNoNubbin
					hasStaticAlignment={hasStaticAlignment}
					id={`slds-color-picker__selector-${componentId}`}
					isOpen={isOpen}
					onClose={
						handleClose as unknown as (
							event?: unknown,
							data?: { componentWillUnmount?: boolean }
						) => void
					}
					onOpen={
						handleOpen as unknown as (
							event?: unknown,
							data?: { portal?: HTMLElement }
						) => void
					}
					onRequestClose={
						requestClose as unknown as
							| ((event?: unknown, data?: { trigger?: string }) => void)
							| undefined
					}
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
									{assistiveText.label ? assistiveText.label : labels.label}
								</span>
								<Swatch color={value} labels={labels} />
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
