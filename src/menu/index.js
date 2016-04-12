/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// MENU - REACT FACADE

// Framework specific
import React from 'react';

// Third party
import classNames from 'classnames';

export const CONTROL = 'Menu';
const { PropTypes } = React;

const Menu = React.createClass({
	displayName: CONTROL,

	propTypes: {
		/**
		 * Aligns the right or left side of the menu with the respective side of the trigger. This is not intended for use with `nubbinPosition`.
		 */
		align: PropTypes.oneOf(['left', 'right']),
		/**
		 * Add any children you want to render in the menu. The most common one, typically added as a default by components which consume `Menu`, is `MenuItems`.
		 */
		children: PropTypes.node,
		/**
		 * Class names added to the menu.
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		id: PropTypes.string,
		/**
		 * Positions dropdown menu with a nubbin--that is the arrow notch. The placement options correspond to the placement of the nubbin.
		 */
		nubbinPosition: React.PropTypes.oneOf([
			'top left',
			'top',
			'top right',
			'bottom left',
			'bottom',
			'bottom right'
		]),
		/**
		 * Usually set internally by the enclosing component, shows or hides the menu.
		 */
		show: PropTypes.bool
	},

	getDefaultProps () {
		return {
			align: 'left'
		};
	},

	_getPositionClassName () {
		let positionClassName;

		if (this.props.nubbinPosition) {
			const positions = this.props.nubbinPosition.split(' ');
			positionClassName = classNames(
				`slds-nubbin--${positions.join('-')}`,
				positions.map((position) => `slds-dropdown--${position}`)
			);
		} else if (this.props.align) {
			positionClassName = `slds-dropdown--${this.props.align}`;
		}

		return positionClassName;
	},

	render () {
		return (
			<div
				className={classNames(
					'slds-dropdown slds-dropdown--menu',
					this._getPositionClassName(),
					{ 'slds-hide': !this.props.show },
					this.props.className
				)}
				id={this.props.id}
			>
				{this.props.children}
			</div>
		);
	}
});

export default Menu;
