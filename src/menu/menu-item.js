/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// MENU ITEM - REACT FACADE

import isString from 'lodash/lang/isString';

// Framework specific
import React from 'react';

// The [Svg helper](../svg/index.html) for React provides a simple wrapper
// around the markup required to support the old and new `Icon` APIs.
import Svg from '../svg';

// Third party
import classNames from 'classnames';

export const CONTROL = 'MenuItem';

const MenuItem = React.createClass({
	displayName: CONTROL,

	propTypes: {
		checkmark: React.PropTypes.bool,
		disabled: React.PropTypes.bool,
		href: React.PropTypes.string,
		icon: React.PropTypes.string,
		iconCategory: React.PropTypes.string,
		iconName: React.PropTypes.string,
		iconPosition: React.PropTypes.oneOf([
			'left',
			'right'
		]).isRequired,
		id: React.PropTypes.string.isRequired,
		item: React.PropTypes.any,
		onSelected: React.PropTypes.func.isRequired,
		selected: React.PropTypes.bool,
		text: React.PropTypes.any,
		type: React.PropTypes.string
	},

	getDefaultProps () {
		return {
			href: '#',
			type: 'item'
		};
	},

	_renderIcon (position) {
		const invertedPosition = position === 'right' ? 'left' : 'right';
		const iconClasses = `slds-icon slds-icon--x-small slds-icon-text-default slds-m-${invertedPosition}--small`;

		if (position === this.props.iconPosition) {
			const icons = {
				icon: this.props.icon,
				category: this.props.iconCategory,
				name: this.props.iconName
			};

			if (isString(icons.icon) || isString(icons.name)) {
				return (
					<Svg
						className={classNames(iconClasses, 'slds-shrink-none')}
						{...icons}
					/>
				);
			}
		} else if (this.props.checkmark) {
			return (
				<Svg
					className={classNames(iconClasses, 'slds-icon--selected')}
					category="utility"
					name="check"
				/>
			);
		}

		return null;
	},

	render () {
		let html;
		const ariaSelected = this.props.selected ? 'true' : null;

		switch (this.props.type) {
			case 'header': {
				html = (
					<li
						className="slds-dropdown__header"
						id={this.props.id}
					>
						<span className="slds-text-heading--label">{this.props.text}</span>
					</li>
				);
				break;
			}
			case 'divider': {
				html = <li className="slds-has-divider" id={this.props.id}></li>;
				break;
			}
			default: {
				html = (
					<li
						aria-selected = {ariaSelected}
						className = {classNames('slds-dropdown__item', { 'slds-is-selected': this.props.selected })}
						disabled = {this.props.disabled}
						id = {this.props.id}
					>
					<a href={this.props.href} onClick={this.handleClicked} aria-disabled={this.props.disabled}>
						<p className="slds-truncate">
							{this._renderIcon('left')}
							{this.props.text}
						</p>
						{this._renderIcon('right')}
					</a>
					</li>
				);
			}
		}

		return html;
	},

	handleClicked (e) {
		if (this.props.href === '#') {
			e.preventDefault();
			this.props.onSelected(this.props.item);
		}
	}
});

export default MenuItem;
