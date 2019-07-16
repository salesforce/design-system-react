"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash.assign"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HEX_REGEX = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
var ColorUtils = {
  getNewColor: function getNewColor(options, customHexValidator) {
    var oldColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (options.hex) {
      if (customHexValidator ? !customHexValidator(options.hex) : !this.isValidHex(options.hex)) {
        return (0, _lodash.default)({}, oldColor, {
          hex: options.hex,
          errors: (0, _lodash.default)({}, oldColor.errors, {
            hex: true
          }),
          hsv: {
            hue: '',
            saturation: '',
            value: ''
          },
          rgb: {
            red: '',
            green: '',
            blue: ''
          }
        });
      }

      return {
        hex: options.hex,
        hsv: this.getHsvFromHex(options.hex),
        rgb: this.getRgbFromHex(options.hex)
      };
    }

    if ('red' in options || 'blue' in options || 'green' in options) {
      var rgb = (0, _lodash.default)({}, oldColor.rgb, options);
      var errors = this.getRgbErrors(rgb);

      if (Object.values(errors).includes(true)) {
        return (0, _lodash.default)({}, oldColor, {
          rgb: rgb,
          errors: (0, _lodash.default)({}, oldColor.errors, errors)
        });
      }

      return {
        hex: this.getHexFromRgb(rgb),
        hsv: this.getHsvFromRgb(rgb),
        rgb: rgb
      };
    }

    if ('hue' in options || 'saturation' in options || 'value' in options) {
      var hsv = (0, _lodash.default)({}, oldColor.hsv, options);
      return {
        hex: this.getHexFromHsv(hsv),
        hsv: hsv,
        rgb: this.getRgbFromHsv(hsv)
      };
    }

    return {
      hex: '',
      hsv: {
        hue: '',
        saturation: '',
        value: ''
      },
      rgb: {
        red: '',
        green: '',
        blue: ''
      }
    };
  },
  getDeltaColor: function getDeltaColor(options, customHexValidator, oldColor) {
    var limitValue = function limitValue(value) {
      return Math.min(Math.max(value, 0), 100);
    };

    return this.getNewColor({
      saturation: limitValue(oldColor.hsv.saturation + (options.saturation || 0)),
      value: limitValue(oldColor.hsv.value + (options.value || 0))
    }, customHexValidator, oldColor);
  },
  isValidHex: function isValidHex(value) {
    return !value || HEX_REGEX.test(this.toSixDigitHex(value));
  },
  getRgbErrors: function getRgbErrors(rgb) {
    var hasError = function hasError(value) {
      return isNaN(value) || Math.floor(value) !== Number(value) || value < 0 || value >= 256;
    };

    return Object.entries(rgb).reduce(function (errors, keyValue) {
      // eslint-disable-next-line no-param-reassign
      errors[keyValue[0]] = hasError(keyValue[1]);
      return errors;
    }, {});
  },
  getHsvFromHex: function getHsvFromHex(hex) {
    return this.getHsvFromRgb(this.getRgbFromHex(hex));
  },
  getHexFromHsv: function getHexFromHsv(_ref) {
    var hue = _ref.hue,
        saturation = _ref.saturation,
        value = _ref.value;
    return this.getHexFromRgb(this.getRgbFromHsv({
      hue: hue,
      saturation: saturation,
      value: value
    }));
  },
  getHsvFromRgb: function getHsvFromRgb(_ref2) {
    var red = _ref2.red,
        green = _ref2.green,
        blue = _ref2.blue;
    var redRatio = red / 255;
    var greenRatio = green / 255;
    var blueRatio = blue / 255;
    var max = Math.max(redRatio, greenRatio, blueRatio);
    var min = Math.min(redRatio, greenRatio, blueRatio);
    var delta = max - min;
    var saturation = max === 0 ? 0 : delta / max * 100;
    var value = max * 100;
    var hue;

    if (max === min) {
      hue = 0;
    } else {
      if (redRatio === max) {
        hue = (greenRatio - blueRatio) / delta + (greenRatio < blueRatio ? 6 : 0);
      } else if (greenRatio === max) {
        hue = (blueRatio - redRatio) / delta + 2;
      } else {
        hue = (redRatio - greenRatio) / delta + 4;
      }

      hue *= 60;
    }

    return {
      hue: hue,
      saturation: saturation,
      value: value
    };
  },
  getRgbFromHsv: function getRgbFromHsv(_ref3) {
    var hue = _ref3.hue,
        saturation = _ref3.saturation,
        value = _ref3.value;
    var hueRatio = hue / 360;
    var satRatio = saturation / 100;
    var valRatio = value / 100;
    var red;
    var green;
    var blue;
    var i = Math.floor(hueRatio * 6);
    var f = hueRatio * 6 - i;
    var p = valRatio * (1 - satRatio);
    var q = valRatio * (1 - f * satRatio);
    var t = valRatio * (1 - (1 - f) * satRatio);

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
      green: Math.round(green * 255)
    };
  },
  getHexFromRgb: function getHexFromRgb(_ref4) {
    var red = _ref4.red,
        green = _ref4.green,
        blue = _ref4.blue;

    function getHex(color) {
      return "0".concat(Math.round(color).toString(16)).substr(-2);
    }

    return "#".concat(getHex(red)).concat(getHex(green)).concat(getHex(blue));
  },
  getRgbFromHex: function getRgbFromHex(hex) {
    var result = HEX_REGEX.exec(this.toSixDigitHex(hex));
    return {
      red: parseInt(result[1], 16),
      green: parseInt(result[2], 16),
      blue: parseInt(result[3], 16)
    };
  },
  toSixDigitHex: function toSixDigitHex(value) {
    var shortHandHex = /^#([a-f\d])([a-f\d])([a-f\d])$/i;
    var match = shortHandHex.exec(value);

    if (match) {
      return "#".concat(match[1]).concat(match[1]).concat(match[2]).concat(match[2]).concat(match[3]).concat(match[3]);
    }

    return value;
  }
};
var _default = ColorUtils;
exports.default = _default;