'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash.assign');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.find');

var _lodash4 = _interopRequireDefault(_lodash3);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _constants = require('../../utilities/constants');

var _step = require('./private/step');

var _step2 = _interopRequireDefault(_step);

var _progress = require('./private/progress');

var _progress2 = _interopRequireDefault(_progress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Progress Indicator design pattern](https://lightningdesignsystem.com/components/progress-indicator/) in React.
// Based on SLDS v2.4.0


// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator


// Child components


var displayName = _constants.PROGRESS_INDICATOR;

var propTypes = {
	/**
  * **Assistive text for accessibility**
  * This object is merged with the default props object on every render.
  * * `percentage`: Label for Progress Bar. The default is `Progress: [this.props.value]%`
  */
	assistiveText: _propTypes2.default.shape({
		percentage: _propTypes2.default.string
	}),
	/**
  * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
  */
	className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
	/**
  * Stores all completed steps. It is an array of step objects.
  */
	completedSteps: _propTypes2.default.array,
	/**
  * Stores all disabled steps. It is an array of step objects. Steps are still clickable/focusable,
  * this only disables cursor change and removes onClick and onFocus event callbacks.
  */
	disabledSteps: _propTypes2.default.array,
	/**
  * Stores all error steps. It is an array of step objects and usually there is only one error step, the current step.
  */
	errorSteps: _propTypes2.default.array,
	/**
  * HTML id for component.
  */
	id: _propTypes2.default.string,
	/**
  * Triggered when an individual step is clicked. By default, it receives an event and returns step state and the step object clicked: `{ isCompleted, isDisabled, isError, isSelected, step }`. Users are able to pass a callback handleClick function in forms of: <function name>(event, data) where data is the callback result.
  * ```
  * const handleStepClick = function(event, data) { console.log(data); };
  *   <ProgressIndicator onStepClick={handleStepClick} />
  * ```
  */
	onStepClick: _propTypes2.default.func,
	/**
  * Triggered when an individual step is focused. By default, it receives an event and returns step state and the step object clicked: `{ isCompleted, isDisabled, isError, isSelected, step }`. Users are able to pass a callback handleClick function in forms of: <function name>(event, data) where data is the callback result.
  * ```
  * const handleStepFocus = function(event, data) { console.log(data); };
  *   <ProgressIndicator onStepFocus={handleStepFocus} />
  * ```
  */
	onStepFocus: _propTypes2.default.func,
	/**
  * Represents the currently selected or active step. It is a step object.
  */
	selectedStep: _propTypes2.default.object.isRequired,
	/**
  * It is an array of step objects in the following form:
  * ```
  *  [{
  *    id: <PropTypes.number> or <PropTypes.string>, has to be unique
  *    label: <PropTypes.string>, representing the tooltip content
  *    assistiveText: <PropTypes.string>, The default is `[Step props.index + 1]: [status]`. Status is if the step has been completed or in an error state.
  *  }],
  *  ```
  */
	steps: _propTypes2.default.array.isRequired,
	/**
  * Stores all steps with opened tooltips. This property is mainly for development purposes. The tooltip should only show on hover for the user.
  */
	tooltipIsOpenSteps: _propTypes2.default.array,
	/**
  * Determines component style.
  */
	variant: _propTypes2.default.oneOf(['base', 'modal'])
};

var defaultSteps = [{ id: 0, label: 'tooltip label #1' }, { id: 1, label: 'tooltip label #2' }, { id: 2, label: 'tooltip label #3' }, { id: 3, label: 'tooltip label #4' }, { id: 4, label: 'tooltip label #5' }];

var defaultProps = {
	assistiveText: {},
	errorSteps: [],
	completedSteps: [],
	disabledSteps: [],
	selectedStep: defaultSteps[0],
	variant: 'base',
	// click/focus callbacks by default do nothing
	onStepClick: function onStepClick() {},
	onStepFocus: function onStepFocus() {}
};

/**
 * Check if the passed steps are valid
 */
function checkSteps(steps) {
	if (steps === undefined) return false;
	for (var i = 0; i < steps.length; ++i) {
		if (steps[i].label === undefined) return false;
	}
	return true;
}

/**
 * Check if an item is from an array of items when 'items' is an array;
 * Check if an item is equal to the other item after being stringified when 'items' is a JSON object
 */
function findStep(item, items) {
	if (Array.isArray(items)) {
		return !!(0, _lodash4.default)(items, item);
	}
	return JSON.stringify(item) === JSON.stringify(items);
}

/**
 * Progress Indicator is a component that communicates to the user the progress of a particular process.
 */

var ProgressIndicator = function (_React$Component) {
	_inherits(ProgressIndicator, _React$Component);

	function ProgressIndicator() {
		_classCallCheck(this, ProgressIndicator);

		return _possibleConstructorReturn(this, (ProgressIndicator.__proto__ || Object.getPrototypeOf(ProgressIndicator)).apply(this, arguments));
	}

	_createClass(ProgressIndicator, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.generatedId = _shortid2.default.generate();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.isUnmounting = true;
		}

		/**
   * Get the progress indicator's HTML id. Generate a new one if no ID present.
   */

	}, {
		key: 'getId',
		value: function getId() {
			return this.props.id || this.generatedId;
		}
	}, {
		key: 'getSteps',
		value: function getSteps() {
			// check if passed steps are valid
			return checkSteps(this.props.steps) ? this.props.steps : defaultSteps;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			// Merge objects of strings with their default object
			var assistiveText = this.props ? (0, _lodash2.default)({}, defaultProps.assistiveText, this.props.assistiveText) : defaultProps.assistiveText;

			/** 1. preparing data */
			var allSteps = this.getSteps();

			var currentStep = 0;
			// find index for the current step
			for (var i = 0; i < allSteps.length; ++i) {
				// assign step an id if it does not have one
				if (allSteps[i].id === undefined) {
					allSteps[i].id = i;
				}
				if (findStep(allSteps[i], this.props.selectedStep)) {
					currentStep = i;
				}
			}

			/** 2. return DOM */
			return _react2.default.createElement(
				_progress2.default,
				{
					assistiveText: assistiveText,
					id: this.getId(),
					value: currentStep === 0 ? '0' : '' + 100 * (currentStep / (allSteps.length - 1)),
					variant: this.props.variant,
					className: this.props.className
				},
				allSteps.map(function (step, i) {
					return _react2.default.createElement(_step2.default, {
						key: _this2.getId() + '-' + step.id,
						id: _this2.getId(),
						index: i,
						isSelected: findStep(step, _this2.props.selectedStep),
						isDisabled: findStep(step, _this2.props.disabledSteps),
						isError: findStep(step, _this2.props.errorSteps),
						isCompleted: findStep(step, _this2.props.completedSteps),
						onClick: _this2.props.onStepClick,
						onFocus: _this2.props.onStepFocus,
						step: step,
						tooltipIsOpen: findStep(step, _this2.props.tooltipIsOpenSteps)
					});
				})
			);
		}
	}]);

	return ProgressIndicator;
}(_react2.default.Component);

ProgressIndicator.displayName = displayName;
ProgressIndicator.propTypes = propTypes;
ProgressIndicator.defaultProps = defaultProps;

exports.default = ProgressIndicator;