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
import { EventUtil } from '../../utilities';

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
		focusNext: PropTypes.func,
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
		onFocus: PropTypes.func.isRequired,
		onSelect: PropTypes.func.isRequired,
		rightIcon: PropTypes.shape({
			category: PropTypes.string,
			name: PropTypes.string
		}),
		type: PropTypes.string,
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
		if (!this.props.isHover && this.refs.link) {
			ReactDOM.findDOMNode(this.refs.link).focus();
		} else if (!this.props.isHover && this.props.focusNext) {
			this.props.focusNext();
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
		switch (this.props.type) {
			case 'header':
				return (
					<li className="slds-dropdown__header" onMouseDown={this.handleMouseDown} role="separator">
						<span className="slds-text-title--caps">{this.props.label}</span>
					</li>
				);
			default:
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
	}
});

module.exports = ListItem;
