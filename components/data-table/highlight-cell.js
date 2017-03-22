define(['module', 'react', './cell', '../utilities/highlighter', '../../utilities/constants'], function (module, _react, _cell, _highlighter, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _cell2 = _interopRequireDefault(_cell);

	var _highlighter2 = _interopRequireDefault(_highlighter);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var PropTypes = _react2.default.PropTypes;


	/**
  * A Cell renderer for the DataTable that automatically highlights search text.
  */
	var DataTableHighlightCell = function DataTableHighlightCell(props) {
		return _react2.default.createElement(
			_cell2.default,
			props,
			_react2.default.createElement(
				_highlighter2.default,
				{ search: props.search },
				props.children
			)
		);
	};

	// ### Display Name
	// The DataTable looks for components with this name to determine what it should use to render a given column's cells.
	DataTableHighlightCell.displayName = _constants.DATA_TABLE_CELL;

	// ### Prop Types
	DataTableHighlightCell.propTypes = {
		/**
   * The contents of the cell. Equivalent to `props.item[props.property]`
   */
		children: PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number, _react2.default.PropTypes.bool]),
		/**
   * The string of text (or Regular Expression) to highlight.
   */
		search: PropTypes.any
	};

	module.exports = DataTableHighlightCell;
});