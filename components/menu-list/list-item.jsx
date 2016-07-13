/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # List Item Component

// ## Dependencies

// ### React
import React from 'react';
import ReactDOM from 'react-dom';

// ### classNames
import classNames from 'classnames';

// ## Children
import ListItemLabelRenderer from './list-item-label';

// ### Event Helpers
import { EventUtil, KEYS } from '../../utilities';

// ## Constants
import { LIST_ITEM } from '../../utilities/constants';

// Removes the need for `PropTypes`.
const { PropTypes } = React;

/**
 * Component description.
 */
const ListItem = React.createClass({
	displayName: LIST_ITEM,

	propTypes: {
		data: PropTypes.object,
		checkmark: PropTypes.bool,
		index: PropTypes.number,
		inverted: PropTypes.bool,
		isHighlighted: PropTypes.bool,
		isSelected: PropTypes.bool,
		label: PropTypes.string,
		labelRenderer: PropTypes.func,
		value: PropTypes.any,
		onBlur: PropTypes.func, // TODO: Should be implemented?
		onClick: PropTypes.func, // TODO: Should be implemented?
		onFocus: PropTypes.func.isRequired,
		onMoveFocus: PropTypes.func, // TODO: Should be implemented?
		onSelect: PropTypes.func.isRequired
	},

	getDefaultProps () {
		return {
			data: {},
			index: 0,
			inverted: false,
			isHighlighted: false,
			isSelected: false,
			label: '',
			labelRenderer: ListItemLabelRenderer,
			value: null
		};
	},

	handleClick (event) {
		EventUtil.trapImmediate(event);

		if (this.props.onSelect) {
			this.props.onSelect(this.props.index);
		}
	},

	handleMouseDown (event) {
		EventUtil.trapImmediate(event);
	},

	componentDidMount () {
		if (this.props.isHighlighted) {
			this.setFocus();
		}
	},

	componentDidUpdate (prevProps) {
		if (!prevProps.isHighlighted && this.props.isHighlighted) {
			this.setFocus();
		}
	},

	setFocus () {
		if (!this.props.isHover) {
			ReactDOM.findDOMNode(this.refs.link).focus();
		}
	},

	handleKeyDown (event) {
		if (event.keyCode) {
			if (event.keyCode === KEYS.DOWN) {
				EventUtil.trapEvent(event);
				if (this.props.onMoveFocus) {
					this.props.onMoveFocus(1);
				}
			} else if (event.keyCode === KEYS.UP) {
				EventUtil.trapEvent(event);
				if (this.props.onMoveFocus) {
					this.props.onMoveFocus(-1);
				}
			} else if (event.keyCode === KEYS.ENTER ||
					event.keyCode === KEYS.SPACE) {
				EventUtil.trapEvent(event);
				if (this.props.onSelect) {
					this.props.onSelect(this.props.index);
				}
			} else if (event.keyCode === KEYS.ESCAPE) {
				EventUtil.trapEvent(event);
				if (this.props.onCancel) {
					this.props.onCancel();
				}
			} else if (event.keyCode !== KEYS.TAB) {
				EventUtil.trapEvent(event);
				const ch = String.fromCharCode(event.keyCode);
				if (this.props.onSearch) {
					this.props.onSearch(this.props.index, ch);
				}
			}
		}
	},

	handleBlur (event) {
		if (this.props.onBlur) {
			this.props.onBlur(this.props.index, event.relatedTarget, event);
		}
	},

	handleFocus () {
		const height = ReactDOM.findDOMNode(this).offsetHeight;
		if (height && this.props.onFocus) {
			this.props.onFocus(this.props.index, height);
		}
	},

	getLabel () {
		const LabelComp = this.props.labelRenderer;
		return (
			<LabelComp
				checkmark={this.props.checkmark}
				index={this.props.index}
				label={this.props.label}
				value={this.props.value}
				inverted={this.props.inverted}
				isSelected={this.props.isSelected}
				isHighlighted={this.props.isHighlighted}
				data={this.props.data}
			/>
		);
	},

	render () {
		return (
			<li
				className={classNames('slds-dropdown__item', { 'slds-is-selected': this.props.isSelected })}
				onMouseDown={this.handleMouseDown}
			>
				<a
					id={`menu-0-${this.props.index}`}
					href="javascript:void(0);"
					ref="link"
					data-index={this.props.index}
					onClick={this.handleClick}
					onFocus={this.handleFocus}
					aria-checked={this.props.isSelected}
					role="menuitemradio"
					tabIndex={-1}
				>
						{this.getLabel()}
				</a>
			</li>
		);
	}
});

module.exports = ListItem;
