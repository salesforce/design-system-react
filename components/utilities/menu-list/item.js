define(['exports', 'react', 'create-react-class', 'prop-types', 'classnames', '../../icon', './item-label', '../../../utilities/event', '../../../utilities/constants'], function (exports, _react, _createReactClass, _propTypes, _classnames, _icon, _itemLabel, _event, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _icon2 = _interopRequireDefault(_icon);

	var _itemLabel2 = _interopRequireDefault(_itemLabel);

	var _event2 = _interopRequireDefault(_event);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _extends = Object.assign || function (target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];

			for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}

		return target;
	};

	/**
  * Component description.
  */
	var ListItem = (0, _createReactClass2.default)({
		displayName: _constants.LIST_ITEM,

		propTypes: {
			'aria-disabled': _propTypes2.default.bool,
			className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
			checkmark: _propTypes2.default.bool,
			data: _propTypes2.default.object,
			divider: _propTypes2.default.oneOf(['top', 'bottom']),
			href: _propTypes2.default.string,
			id: _propTypes2.default.string.isRequired,
			index: _propTypes2.default.number.isRequired,
			inverted: _propTypes2.default.bool,
			isSelected: _propTypes2.default.bool,
			label: _propTypes2.default.string,
			labelRenderer: _propTypes2.default.func,
			leftIcon: _propTypes2.default.shape({
				category: _propTypes2.default.string,
				name: _propTypes2.default.string
			}),
			onSelect: _propTypes2.default.func.isRequired,
			rightIcon: _propTypes2.default.shape({
				category: _propTypes2.default.string,
				name: _propTypes2.default.string
			}),
			type: _propTypes2.default.string,
			value: _propTypes2.default.any
		},

		getDefaultProps: function getDefaultProps() {
			return {
				data: {},
				href: 'javascript:void(0);', // eslint-disable-line no-script-url
				inverted: false,
				isSelected: false,
				label: '',
				labelRenderer: _itemLabel2.default,
				value: null
			};
		},
		getLabel: function getLabel() {
			var Label = this.props.labelRenderer;
			return _react2.default.createElement(Label, {
				checkmark: this.props.checkmark,
				data: this.props.data,
				icon: this.getIcon('left'),
				index: this.props.index,
				inverted: this.props.inverted,
				isSelected: this.props.isSelected,
				label: this.props.label,
				value: this.props.value
			});
		},
		getIcon: function getIcon(position) {
			var classnames = ['slds-icon-text-default'];
			var iconProps = this.props[position + 'Icon'];

			if (position === 'left') {
				if (this.props.checkmark) {
					classnames.push('slds-icon--selected');
					iconProps = {
						category: 'utility',
						name: 'check'
					};
				}

				classnames.push('slds-m-right--x-small');
			} else {
				classnames.push('slds-m-left--small');
			}

			if (iconProps) {
				return _react2.default.createElement(_icon2.default, _extends({
					className: (0, _classnames2.default)(classnames),
					position: position,
					size: 'x-small'
				}, iconProps));
			}

			return null;
		},
		handleClick: function handleClick(event) {
			if (this.props.type !== 'link' || this.props.href === 'javascript:void(0);' // eslint-disable-line no-script-url
			) {
					// eslint-disable-line no-script-url
					_event2.default.trapImmediate(event);
				}

			if (this.props.onSelect) {
				this.props.onSelect(this.props.index);
			}
		},
		handleMouseDown: function handleMouseDown(event) {
			_event2.default.trapImmediate(event);
		},
		render: function render() {
			switch (this.props.type) {
				case 'header':
					{
						return _react2.default.createElement(
							'li',
							{
								className: (0, _classnames2.default)('slds-dropdown__header', {
									'slds-has-divider--top-space': this.props.divider === 'top',
									'slds-has-divider--bottom-space': this.props.divider === 'bottom'
								}, this.props.className),
								onMouseDown: this.handleMouseDown,
								role: 'separator'
							},
							_react2.default.createElement(
								'span',
								{ className: 'slds-text-title--caps' },
								this.props.label
							)
						);
					}
				case 'divider':
					{
						return _react2.default.createElement('li', {
							className: (0, _classnames2.default)('slds-has-divider', this.props.className),
							onMouseDown: this.handleMouseDown,
							role: 'separator'
						});
					}
				case 'link':
				case 'item':
				default:
					{
						return (
							/* eslint-disable jsx-a11y/role-supports-aria-props */
							// disabled eslint, but using aria-selected on presentation role seems suspicious...
							_react2.default.createElement(
								'li',
								{
									'aria-selected': this.props.isSelected,
									className: (0, _classnames2.default)('slds-dropdown__item', {
										'slds-is-selected': this.props.isSelected
									}, this.props.className),
									id: this.props.id,
									onMouseDown: this.handleMouseDown,
									role: 'presentation'
								},
								_react2.default.createElement(
									'a',
									{
										'aria-disabled': this.props['aria-disabled'],
										href: this.props.href,
										'data-index': this.props.index,
										onClick: this.handleClick,
										role: 'menuitem',
										tabIndex: '-1'
									},
									this.getLabel(),
									this.getIcon('right')
								)
							)
						);
					}
			}
		}
	});

	exports.default = ListItem;
});