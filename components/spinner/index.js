define(['module', 'react', 'classnames', '../../utilities/constants'], function (module, _react, _classnames, _constants) {
  'use strict';

  var _react2 = _interopRequireDefault(_react);

  var _classnames2 = _interopRequireDefault(_classnames);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var

  // Removes the need for `PropTypes`.
  PropTypes = _react2.default.PropTypes;


  // ### Prop Types
  var PROP_TYPES = {
    /**
     * Custom css classes applied to Spinner container
     */
    containerClassName: PropTypes.string,
    /**
     * Determines the size of the spinner
     */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Determines the color of the spinner: `base` is gray, `brand` is blue, and `inverse` is white.
     */
    variant: PropTypes.oneOf(['base', 'brand', 'inverse'])
  };

  var DEFAULT_PROPS = {
    size: 'medium',
    variant: 'base'
  };

  // ## Spinner
  var Spinner = function Spinner(props) {
    var containerClassName = props.containerClassName;
    var variant = props.variant;
    var size = props.size;


    var sizeClass = 'slds-spinner--' + props.size;
    var variants = {
      brand: 'slds-spinner--brand',
      inverse: 'slds-spinner--inverse'
    };

    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)(props.containerClassName, 'slds-spinner_container') },
      _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('slds-spinner', sizeClass, variants[props.variant]),
          'aria-hidden': 'false',
          role: 'alert'
        },
        _react2.default.createElement('div', { className: 'slds-spinner__dot-a' }),
        _react2.default.createElement('div', { className: 'slds-spinner__dot-b' })
      )
    );
  };

  Spinner.displayName = _constants.SPINNER;
  Spinner.propTypes = PROP_TYPES;
  Spinner.defaultProps = DEFAULT_PROPS;

  module.exports = Spinner;
});