import assign from 'lodash.assign';

const COLOR_NAMES = {
	aliceblue: '#f0f8ff',
	antiquewhite: '#faebd7',
	aqua: '#00ffff',
	aquamarine: '#7fffd4',
	azure: '#f0ffff',
	beige: '#f5f5dc',
	bisque: '#ffe4c4',
	black: '#000000',
	blanchedalmond: '#ffebcd',
	blue: '#0000ff',
	blueviolet: '#8a2be2',
	brown: '#a52a2a',
	burlywood: '#deb887',
	cadetblue: '#5f9ea0',
	chartreuse: '#7fff00',
	chocolate: '#d2691e',
	coral: '#ff7f50',
	cornflowerblue: '#6495ed',
	cornsilk: '#fff8dc',
	crimson: '#dc143c',
	cyan: '#00ffff',
	darkblue: '#00008b',
	darkcyan: '#008b8b',
	darkgoldenrod: '#b8860b',
	darkgray: '#a9a9a9',
	darkgreen: '#006400',
	darkkhaki: '#bdb76b',
	darkmagenta: '#8b008b',
	darkolivegreen: '#556b2f',
	darkorange: '#ff8c00',
	darkorchid: '#9932cc',
	darkred: '#8b0000',
	darksalmon: '#e9967a',
	darkseagreen: '#8fbc8f',
	darkslateblue: '#483d8b',
	darkslategray: '#2f4f4f',
	darkturquoise: '#00ced1',
	darkviolet: '#9400d3',
	deeppink: '#ff1493',
	deepskyblue: '#00bfff',
	dimgray: '#696969',
	dodgerblue: '#1e90ff',
	firebrick: '#b22222',
	floralwhite: '#fffaf0',
	forestgreen: '#228b22',
	fuchsia: '#ff00ff',
	gainsboro: '#dcdcdc',
	ghostwhite: '#f8f8ff',
	gold: '#ffd700',
	goldenrod: '#daa520',
	gray: '#808080',
	green: '#008000',
	greenyellow: '#adff2f',
	honeydew: '#f0fff0',
	hotpink: '#ff69b4',
	indianred: '#cd5c5c',
	indigo: '#4b0082',
	ivory: '#fffff0',
	khaki: '#f0e68c',
	lavender: '#e6e6fa',
	lavenderblush: '#fff0f5',
	lawngreen: '#7cfc00',
	lemonchiffon: '#fffacd',
	lightblue: '#add8e6',
	lightcoral: '#f08080',
	lightcyan: '#e0ffff',
	lightgoldenrodyellow: '#fafad2',
	lightgrey: '#d3d3d3',
	lightgreen: '#90ee90',
	lightpink: '#ffb6c1',
	lightsalmon: '#ffa07a',
	lightseagreen: '#20b2aa',
	lightskyblue: '#87cefa',
	lightslategray: '#778899',
	lightsteelblue: '#b0c4de',
	lightyellow: '#ffffe0',
	lime: '#00ff00',
	limegreen: '#32cd32',
	linen: '#faf0e6',
	magenta: '#ff00ff',
	maroon: '#800000',
	mediumaquamarine: '#66cdaa',
	mediumblue: '#0000cd',
	mediumorchid: '#ba55d3',
	mediumpurple: '#9370d8',
	mediumseagreen: '#3cb371',
	mediumslateblue: '#7b68ee',
	mediumspringgreen: '#00fa9a',
	mediumturquoise: '#48d1cc',
	mediumvioletred: '#c71585',
	midnightblue: '#191970',
	mintcream: '#f5fffa',
	mistyrose: '#ffe4e1',
	moccasin: '#ffe4b5',
	navajowhite: '#ffdead',
	navy: '#000080',
	oldlace: '#fdf5e6',
	olive: '#808000',
	olivedrab: '#6b8e23',
	orange: '#ffa500',
	orangered: '#ff4500',
	orchid: '#da70d6',
	palegoldenrod: '#eee8aa',
	palegreen: '#98fb98',
	paleturquoise: '#afeeee',
	palevioletred: '#d87093',
	papayawhip: '#ffefd5',
	peachpuff: '#ffdab9',
	peru: '#cd853f',
	pink: '#ffc0cb',
	plum: '#dda0dd',
	powderblue: '#b0e0e6',
	purple: '#800080',
	rebeccapurple: '#663399',
	red: '#ff0000',
	rosybrown: '#bc8f8f',
	royalblue: '#4169e1',
	saddlebrown: '#8b4513',
	salmon: '#fa8072',
	sandybrown: '#f4a460',
	seagreen: '#2e8b57',
	seashell: '#fff5ee',
	sienna: '#a0522d',
	silver: '#c0c0c0',
	skyblue: '#87ceeb',
	slateblue: '#6a5acd',
	slategray: '#708090',
	snow: '#fffafa',
	springgreen: '#00ff7f',
	steelblue: '#4682b4',
	tan: '#d2b48c',
	teal: '#008080',
	thistle: '#d8bfd8',
	tomato: '#ff6347',
	turquoise: '#40e0d0',
	violet: '#ee82ee',
	wheat: '#f5deb3',
	white: '#ffffff',
	whitesmoke: '#f5f5f5',
	yellow: '#ffff00',
	yellowgreen: '#9acd32',
};
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

			const returnColor = {
				hex: options.hex,
				hsv: this.getHsvFromHex(options.hex),
				rgb: this.getRgbFromHex(options.hex),
			};

			if (options.name) {
				returnColor.name = options.name;
			}

			return returnColor;
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

	getHexFromNamedColor(name) {
		return COLOR_NAMES[name.toLowerCase()] || null;
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
