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

export interface ColorPickerEvents {
	/** Triggered when done is clicked. Returns hex representation of the color */
	onChange?: (
		event: React.SyntheticEvent,
		data: { color: string; isValid?: boolean }
	) => void;
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
	/** Triggered when the user clicks outside the menu or clicks the close button */
	onRequestClose?: (
		event: React.SyntheticEvent,
		data: { trigger: string }
	) => void;
	/** Function called when the color-picker menu would like to show */
	onRequestOpen?: () => void;
	/** Function that overwrites default color validator for outer input */
	onValidateColor?: (hex: string) => boolean;
	/** Function that overwrites default color validator for custom tab inner input */
	onValidateWorkingColor?: (hex: string) => boolean;
	/** Triggered when working color changes (color inside the custom tab) */
	onWorkingColorChange?: (
		event: React.SyntheticEvent,
		data: { color: WorkingColor }
	) => void;
}



