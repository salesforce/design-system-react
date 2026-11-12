/**
 * Type definitions for ColorPicker component
 */

export interface HSV {
	hue: number | '';
	saturation: number | '';
	value: number | '';
}

export interface RGB {
	red: number | '';
	green: number | '';
	blue: number | '';
}

export interface ColorErrors {
	hex?: boolean;
	red?: boolean;
	green?: boolean;
	blue?: boolean;
}

export interface WorkingColor {
	hex: string;
	hsv: HSV;
	rgb: RGB;
	errors?: ColorErrors;
	name?: string;
}

export interface ColorPickerAssistiveText {
	/** Visually hidden label but read out loud by screen readers */
	label?: string;
	/** Instructions for hue selection input */
	hueSlider?: string;
	/** Instructions for using the grid for saturation and value selection */
	saturationValueGrid?: string;
}

export interface ColorPickerLabels {
	/** One letter abbreviation of blue color component */
	blueAbbreviated?: string;
	/** Text for cancel button on popover */
	cancelButton?: string;
	/** Text for custom tab of popover */
	customTab?: string;
	/** Label for custom tab active working color swatch */
	customTabActiveWorkingColorSwatch?: string;
	/** Label for custom tab active transparent swatch */
	customTabTransparentSwatch?: string;
	/** One letter abbreviation of green color component */
	greenAbbreviated?: string;
	/** Label for input of hexadecimal color */
	hexLabel?: string;
	/** Error message when hex color input is invalid */
	invalidColor?: string;
	/** Error message when a component input is invalid */
	invalidComponent?: string;
	/** An input label as for a form */
	label?: string;
	/** One letter abbreviation of red color component */
	redAbbreviated?: string;
	/** Label for swatch tab of popover */
	swatchTab?: string;
	/** Label for transparent swatch in swatch tab */
	swatchTabTransparentSwatch?: string;
	/** Text for submit/done button of popover */
	submitButton?: string;
}

export type ColorPickerChangeHandler = (
	event: React.SyntheticEvent,
	data: { color: string; isValid?: boolean }
) => void;

/**
 * Why the popover requested to close:
 * * `cancel`: the Cancel button or Escape
 * * `submit`: the Done button
 * * `clickOutside`: a click outside the popover
 * * `triggerClick`: the swatch button was clicked while open
 * * `newPopover`: another popover opened
 */
export type ColorPickerRequestCloseTrigger =
	'cancel' | 'submit' | 'clickOutside' | 'triggerClick' | 'newPopover';

/** Data passed to `events.onRequestClose` */
export interface ColorPickerRequestCloseData {
	/** What caused the close request */
	trigger: ColorPickerRequestCloseTrigger;
}

export interface ColorPickerEvents {
	/**
	 * Triggered when the user types in the input and when Done is clicked. Returns the hex
	 * representation of the color. Required unless `disabled` is set.
	 */
	onChange?: ColorPickerChangeHandler;
	/** Triggered when the menu is closed */
	onClose?: (
		event: React.SyntheticEvent,
		data: { trigger?: string; componentWillUnmount?: boolean }
	) => void;
	/** Triggered when the color-picker menu is mounted */
	onOpen?: (
		event: React.SyntheticEvent,
		data: { portal?: HTMLElement }
	) => void;
	/**
	 * Called when the popover requests to close, before it closes. `data.trigger` says why. When
	 * `isOpen` is controlled, set it to `false` here (or leave it `true` to keep the popover open).
	 */
	onRequestClose?: (
		event: React.SyntheticEvent,
		data: ColorPickerRequestCloseData
	) => void;
	/**
	 * Called when the swatch button is clicked while the popover is closed, before it opens. When
	 * `isOpen` is controlled, set it to `true` here.
	 */
	onRequestOpen?: () => void;
	/**
	 * @deprecated Use the top-level `validateColor` prop instead. Still works, and warns.
	 */
	onValidateColor?: (hex: string) => boolean;
	/**
	 * @deprecated Use the top-level `validateWorkingColor` prop instead. Still works, and warns.
	 */
	onValidateWorkingColor?: (hex: string) => boolean;
	/** Triggered when working color changes (color inside the custom tab) */
	onWorkingColorChange?: (
		event: React.SyntheticEvent,
		data: { color: WorkingColor }
	) => void;
}
