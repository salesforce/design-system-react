import assign from 'lodash.assign';

const HEX_REGEX = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

const ColorUtils = {
	getNewColor(options, customHexValidator, oldColor = {}) {
		if (options.hex) {
			if (
				customHexValidator
					? !customHexValidator(options.hex)
					: !this.isValidHex(options.hex)
			) {
				return assign({}, oldColor, {
					hex: options.hex,
					errors: assign({}, oldColor.errors, {
						hex: true,
					}),
					hsv: {
						hue: '',
						saturation: '',
						value: '',
					},
					rgb: {
						red: '',
						green: '',
						blue: '',
					},
				});
			}

			return {
				hex: options.hex,
				hsv: this.getHsvFromHex(options.hex),
				rgb: this.getRgbFromHex(options.hex),
			};
		}

		if ('red' in options || 'blue' in options || 'green' in options) {
			const rgb = assign({}, oldColor.rgb, options);
			const errors = this.getRgbErrors(rgb);

			if (Object.values(errors).includes(true)) {
				return assign({}, oldColor, {
					rgb,
					errors: assign({}, oldColor.errors, errors),
				});
			}

			return {
				hex: this.getHexFromRgb(rgb),
				hsv: this.getHsvFromRgb(rgb),
				rgb,
			};
		}

		if ('hue' in options || 'saturation' in options || 'value' in options) {
			const hsv = assign({}, oldColor.hsv, options);
			return {
				hex: this.getHexFromHsv(hsv),
				hsv,
				rgb: this.getRgbFromHsv(hsv),
			};
		}

		return {
			hex: '',
			hsv: {
				hue: '',
				saturation: '',
				value: '',
			},
			rgb: {
				red: '',
				green: '',
				blue: '',
			},
		};
	},

	getDeltaColor(options, customHexValidator, oldColor) {
		const limitValue = (value) => Math.min(Math.max(value, 0), 100);

		return this.getNewColor(
			{
				saturation: limitValue(
					oldColor.hsv.saturation + (options.saturation || 0)
				),
				value: limitValue(oldColor.hsv.value + (options.value || 0)),
			},
			customHexValidator,
			oldColor
		);
	},

	isValidHex(value) {
		return !value || HEX_REGEX.test(this.toSixDigitHex(value));
	},

	getRgbErrors(rgb) {
		const hasError = (value) =>
			isNaN(value) ||
			Math.floor(value) !== Number(value) ||
			value < 0 ||
			value >= 256;

		return Object.entries(rgb).reduce((errors, keyValue) => {
			// eslint-disable-next-line no-param-reassign
			errors[keyValue[0]] = hasError(keyValue[1]);
			return errors;
		}, {});
	},

	getHsvFromHex(hex) {
		return this.getHsvFromRgb(this.getRgbFromHex(hex));
	},

	getHexFromHsv({ hue, saturation, value }) {
		return this.getHexFromRgb(this.getRgbFromHsv({ hue, saturation, value }));
	},

	getHsvFromRgb({ red, green, blue }) {
		const redRatio = red / 255;
		const greenRatio = green / 255;
		const blueRatio = blue / 255;

		const max = Math.max(redRatio, greenRatio, blueRatio);
		const min = Math.min(redRatio, greenRatio, blueRatio);

		const delta = max - min;
		const saturation = max === 0 ? 0 : delta / max * 100;
		const value = max * 100;
		let hue;

		if (max === min) {
			hue = 0;
		} else {
			if (redRatio === max) {
				hue =
					(greenRatio - blueRatio) / delta + (greenRatio < blueRatio ? 6 : 0);
			} else if (greenRatio === max) {
				hue = (blueRatio - redRatio) / delta + 2;
			} else {
				hue = (redRatio - greenRatio) / delta + 4;
			}

			hue *= 60;
		}

		return { hue, saturation, value };
	},

	getRgbFromHsv({ hue, saturation, value }) {
		const hueRatio = hue / 360;
		const satRatio = saturation / 100;
		const valRatio = value / 100;

		let red;
		let green;
		let blue;

		const i = Math.floor(hueRatio * 6);
		const f = hueRatio * 6 - i;
		const p = valRatio * (1 - satRatio);
		const q = valRatio * (1 - f * satRatio);
		const t = valRatio * (1 - (1 - f) * satRatio);

		switch (i % 6) {
			case 0:
				red = valRatio;
				green = t;
				blue = p;
				break;
			case 1:
				red = q;
				green = valRatio;
				blue = p;
				break;
			case 2:
				red = p;
				green = valRatio;
				blue = t;
				break;
			case 3:
				red = p;
				green = q;
				blue = valRatio;
				break;
			case 4:
				red = t;
				green = p;
				blue = valRatio;
				break;
			default:
				red = valRatio;
				green = p;
				blue = q;
		}

		return {
			red: Math.round(red * 255),
			blue: Math.round(blue * 255),
			green: Math.round(green * 255),
		};
	},

	getHexFromRgb({ red, green, blue }) {
		function getHex(color) {
			return `0${Math.round(color).toString(16)}`.substr(-2);
		}
		return `#${getHex(red)}${getHex(green)}${getHex(blue)}`;
	},

	getRgbFromHex(hex) {
		const result = HEX_REGEX.exec(this.toSixDigitHex(hex));
		return {
			red: parseInt(result[1], 16),
			green: parseInt(result[2], 16),
			blue: parseInt(result[3], 16),
		};
	},

	toSixDigitHex(value) {
		const shortHandHex = /^#([a-f\d])([a-f\d])([a-f\d])$/i;
		const match = shortHandHex.exec(value);
		if (match) {
			return `#${match[1]}${match[1]}${match[2]}${match[2]}${match[3]}${
				match[3]
			}`;
		}

		return value;
	},
};

export default ColorUtils;
