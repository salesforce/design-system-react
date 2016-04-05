/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// PICKLIST ITEM - REACT FACADE

import isString from 'lodash/lang/isString';

// Framework specific
import React from 'react';
import Svg from '../svg';

// Third party
import classNames from 'classnames';

export const CONTROL = 'picklist-item';

const PicklistItem = React.createClass({
	displayName: CONTROL,

	cssClasses: {
		ITEMHEADER: 'slds-dropdown__header',
		ITEMHEADERTEXT: 'slds-text-heading--label',
		ITEMDIVIDER: 'slds-has-divider'
	},

	propTypes: {
		id: React.PropTypes.string,
		checkmark: React.PropTypes.bool,
		iconPosition: React.PropTypes.oneOf([
			'left',
			'right'
		]).isRequired,
		// TODO: explore if item PropTypes can be done better
		item: React.PropTypes.shape({
			getType: React.PropTypes.func.isRequired,
			getDisabled: React.PropTypes.func.isRequired,
			// getId: React.PropTypes.func.isRequired,
			getHref: React.PropTypes.func,
			getText: React.PropTypes.func.isRequired,
			// getValue: React.PropTypes.func.isRequired,
			getIcon: React.PropTypes.func.isRequired
		}).isRequired,
		onSelected: React.PropTypes.func.isRequired,
		selected: React.PropTypes.bool
	},

	_renderIcon (position) {
		const invertedPosition = position === 'right' ? 'left' : 'right';
		const iconClasses = `slds-icon slds-icon--x-small slds-icon-text-default slds-m-${invertedPosition}--small`;

		if (position === this.props.iconPosition) {
			const icon = this.props.item.getIcon();

			if (isString(icon)) {
				return (
					<Svg
						className={classNames(iconClasses, 'slds-shrink-none')}
						icon={icon}
					/>
				);
			}
		} else if (this.props.checkmark) {
			return (
				<Svg
					className={classNames(iconClasses, 'slds-icon--selected')}
					icon="utility.check"
				/>
			);
		}

		return false;
	},

	render () {
		let html;
		const ariaSelected = this.props.selected ? 'true' : null;

		switch (this.props.item.getType()) {
			case 'header': {
				html = <li className={this.cssClasses.ITEMHEADER} id={this.props.id}><span className={this.cssClasses.ITEMHEADERTEXT}>{this.props.item.getText()}</span></li>;
				break;
			}
			case 'divider': {
				html = <li className={this.cssClasses.ITEMDIVIDER} id={this.props.id}></li>;
				break;
			}
			default: {
				const disabled = this.props.item.getDisabled();
				const href = this.props.item.getHref() || '#';

				html = (
					<li
						aria-selected = {ariaSelected}
						className     = {classNames('slds-dropdown__item', { 'slds-is-selected': this.props.selected })}
						disabled      = {disabled}
						id            = {this.props.id}
					>
					<a href={href} onClick={this.handleClicked} aria-disabled={disabled}>
						<p className="slds-truncate">
							{this._renderIcon('left')}
							{this.props.item.getText()}
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
		if (!this.props.item.getHref()) {
			e.preventDefault();
		}
		this.props.onSelected(this.props.item);
	}
});

export default PicklistItem;
