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

// ### Icon
import Icon from '../icon';

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
		checkmark: PropTypes.bool,
		data: PropTypes.object,
		href: PropTypes.string,
		index: PropTypes.number,
		inverted: PropTypes.bool,
		isHighlighted: PropTypes.bool,
		isHover: PropTypes.bool,
		isSelected: PropTypes.bool,
		label: PropTypes.string,
		labelRenderer: PropTypes.func,
		leftIcon: PropTypes.shape({
			category: PropTypes.string,
			name: PropTypes.string
		}),
		onBlur: PropTypes.func, // TODO: Should be implemented?
		onClick: PropTypes.func, // TODO: Should be implemented?
		onFocus: PropTypes.func.isRequired,
		onMoveFocus: PropTypes.func, // TODO: Should be implemented?
		onSelect: PropTypes.func.isRequired,
		rightIcon: PropTypes.shape({
			category: PropTypes.string,
			name: PropTypes.string
		}),
		value: PropTypes.any
	},

	getDefaultProps () {
		return {
			data: {},
			href: 'javascript:void(0);', // eslint-disable-line no-script-url
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
		const Label = this.props.labelRenderer;
		return (
			<Label
				checkmark={this.props.checkmark}
				data={this.props.data}
				icon={this.getIcon('left')}
				index={this.props.index}
				inverted={this.props.inverted}
				isHighlighted={this.props.isHighlighted}
				isSelected={this.props.isSelected}
				label={this.props.label}
				value={this.props.value}
			/>
		);
	},

	getIcon (position) {
		const classnames = ['slds-icon-text-default'];
		let iconProps = this.props[`${position}Icon`];

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
			return (
				<Icon
					className={classNames(classnames)}
					position={position}
					size="x-small"
					{...iconProps}
				/>
			);
		}

		return null;
	},

	render () {
		return (
			<li
				aria-selected={this.props.isSelected}
				className={classNames('slds-dropdown__item', { 'slds-is-selected': this.props.isSelected })}
				onMouseDown={this.handleMouseDown}
				role="presentation"
			>
				<a
					id={`menu-0-${this.props.index}`}
					href={this.props.href}
					ref="link"
					data-index={this.props.index}
					onClick={this.handleClick}
					onFocus={this.handleFocus}
					role="menuitem"
					tabIndex={-1}
				>
						{this.getLabel()}
						{this.getIcon('right')}
				</a>
			</li>
		);
	}
});

module.exports = ListItem;
