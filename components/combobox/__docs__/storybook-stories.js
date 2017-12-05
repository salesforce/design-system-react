define(['module', 'react', '@storybook/react', '../../../utilities/constants', '../__examples__/base', '../__examples__/base-predefined-options-only', '../__examples__/inline-single', '../__examples__/inline-multiple', '../__examples__/base-custom-menu-item', '../__examples__/readonly-single', '../__examples__/readonly-single-selection-custom-menu-item', '../__examples__/readonly-multiple', '../__examples__/snapshot/base-open', '../__examples__/snapshot/base-custom-menu-item-open', '../__examples__/snapshot/base-selected', '../__examples__/snapshot/inline-single-selection', '../__examples__/snapshot/inline-single-selection-selected', '../__examples__/snapshot/inline-multiple-selection', '../__examples__/snapshot/inline-multiple-selection-selected', '../__examples__/snapshot/readonly-single-selection', '../__examples__/snapshot/readonly-single-selection-selected', '../__examples__/snapshot/readonly-single-selection-selected-open', '../__examples__/snapshot/readonly-multiple-selection', '../__examples__/snapshot/readonly-multiple-selection-single-item-selected', '../__examples__/snapshot/readonly-multiple-selection-multiple-items-selected', '../__examples__/snapshot/readonly-single-selection-custom-menu-item'], function (module, _react, _react3, _constants, _base, _basePredefinedOptionsOnly, _inlineSingle, _inlineMultiple, _baseCustomMenuItem, _readonlySingle, _readonlySingleSelectionCustomMenuItem, _readonlyMultiple, _baseOpen, _baseCustomMenuItemOpen, _baseSelected, _inlineSingleSelection, _inlineSingleSelectionSelected, _inlineMultipleSelection, _inlineMultipleSelectionSelected, _readonlySingleSelection, _readonlySingleSelectionSelected, _readonlySingleSelectionSelectedOpen, _readonlyMultipleSelection, _readonlyMultipleSelectionSingleItemSelected, _readonlyMultipleSelectionMultipleItemsSelected, _readonlySingleSelectionCustomMenuItem3) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _base2 = _interopRequireDefault(_base);

	var _basePredefinedOptionsOnly2 = _interopRequireDefault(_basePredefinedOptionsOnly);

	var _inlineSingle2 = _interopRequireDefault(_inlineSingle);

	var _inlineMultiple2 = _interopRequireDefault(_inlineMultiple);

	var _baseCustomMenuItem2 = _interopRequireDefault(_baseCustomMenuItem);

	var _readonlySingle2 = _interopRequireDefault(_readonlySingle);

	var _readonlySingleSelectionCustomMenuItem2 = _interopRequireDefault(_readonlySingleSelectionCustomMenuItem);

	var _readonlyMultiple2 = _interopRequireDefault(_readonlyMultiple);

	var _baseOpen2 = _interopRequireDefault(_baseOpen);

	var _baseCustomMenuItemOpen2 = _interopRequireDefault(_baseCustomMenuItemOpen);

	var _baseSelected2 = _interopRequireDefault(_baseSelected);

	var _inlineSingleSelection2 = _interopRequireDefault(_inlineSingleSelection);

	var _inlineSingleSelectionSelected2 = _interopRequireDefault(_inlineSingleSelectionSelected);

	var _inlineMultipleSelection2 = _interopRequireDefault(_inlineMultipleSelection);

	var _inlineMultipleSelectionSelected2 = _interopRequireDefault(_inlineMultipleSelectionSelected);

	var _readonlySingleSelection2 = _interopRequireDefault(_readonlySingleSelection);

	var _readonlySingleSelectionSelected2 = _interopRequireDefault(_readonlySingleSelectionSelected);

	var _readonlySingleSelectionSelectedOpen2 = _interopRequireDefault(_readonlySingleSelectionSelectedOpen);

	var _readonlyMultipleSelection2 = _interopRequireDefault(_readonlyMultipleSelection);

	var _readonlyMultipleSelectionSingleItemSelected2 = _interopRequireDefault(_readonlyMultipleSelectionSingleItemSelected);

	var _readonlyMultipleSelectionMultipleItemsSelected2 = _interopRequireDefault(_readonlyMultipleSelectionMultipleItemsSelected);

	var _readonlySingleSelectionCustomMenuItem4 = _interopRequireDefault(_readonlySingleSelectionCustomMenuItem3);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	(0, _react3.storiesOf)(_constants.COMBOBOX, module).addDecorator(function (getStory) {
		return _react2.default.createElement(
			'div',
			{ className: 'slds-p-around--medium' },
			getStory()
		);
	}).add('Base', function () {
		return _react2.default.createElement(_base2.default, { action: _react3.action });
	}).add('Base Pre-defined Options Only', function () {
		return _react2.default.createElement(_basePredefinedOptionsOnly2.default, { action: _react3.action });
	}).add('Inline Single Selection', function () {
		return _react2.default.createElement(_inlineSingle2.default, { action: _react3.action });
	}).add('Inline Multiple Selection', function () {
		return _react2.default.createElement(_inlineMultiple2.default, { action: _react3.action });
	}).add('Base Custom Menu Item', function () {
		return _react2.default.createElement(_baseCustomMenuItem2.default, { action: _react3.action });
	}).add('Readonly Single Selection', function () {
		return _react2.default.createElement(_readonlySingle2.default, { action: _react3.action });
	}).add('Readonly Multiple Selection', function () {
		return _react2.default.createElement(_readonlyMultiple2.default, { action: _react3.action });
	}).add('Readonly Single Selection Custom Menu Item', function () {
		return _react2.default.createElement(_readonlySingleSelectionCustomMenuItem2.default, { action: _react3.action });
	}).add('Snapshot Base Open', function () {
		return _react2.default.createElement(_baseOpen2.default, { action: _react3.action });
	}).add('Snapshot Base Custom Menu Item Open', function () {
		return _react2.default.createElement(_baseCustomMenuItemOpen2.default, { action: _react3.action });
	}).add('Snapshot Base Selected', function () {
		return _react2.default.createElement(_baseSelected2.default, { action: _react3.action });
	}).add('Snapshot Inline Single Selection', function () {
		return _react2.default.createElement(_inlineSingleSelection2.default, { action: _react3.action });
	}).add('Snapshot Inline Single Selection Selected', function () {
		return _react2.default.createElement(_inlineSingleSelectionSelected2.default, { action: _react3.action });
	}).add('Snapshot Inline Multiple Selection', function () {
		return _react2.default.createElement(_inlineMultipleSelection2.default, { action: _react3.action });
	}).add('Snapshot Inline Multiple Selection Selected', function () {
		return _react2.default.createElement(_inlineMultipleSelectionSelected2.default, { action: _react3.action });
	}).add('Snapshot Readonly Single Selection', function () {
		return _react2.default.createElement(_readonlySingleSelection2.default, { action: _react3.action });
	}).add('Snapshot Readonly Single Selection Selected', function () {
		return _react2.default.createElement(_readonlySingleSelectionSelected2.default, { action: _react3.action });
	}).add('Snapshot Readonly Single Selection Selected Open', function () {
		return _react2.default.createElement(_readonlySingleSelectionSelectedOpen2.default, { action: _react3.action });
	}).add('Snapshot Readonly Multiple Selection', function () {
		return _react2.default.createElement(_readonlyMultipleSelection2.default, { action: _react3.action });
	}).add('Snapshot Readonly Multiple Selection Single Item Selected', function () {
		return _react2.default.createElement(_readonlyMultipleSelectionSingleItemSelected2.default, { action: _react3.action });
	}).add('Snapshot Readonly Multiple Selection Multiple Items Selected', function () {
		return _react2.default.createElement(_readonlyMultipleSelectionMultipleItemsSelected2.default, { action: _react3.action });
	}).add('Snapshot Readonly Single Selection Custom Menu Item', function () {
		return _react2.default.createElement(_readonlySingleSelectionCustomMenuItem4.default, { action: _react3.action });
	});
});