/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// LOOKUP MENU ITEMS - REACT FACADE

import React from 'react';
import classNames from 'classnames';

export const CONTROL = 'lookup-menu-items';

const LookupMenuItems = React.createClass({
	displayName: CONTROL,

	propTypes: {
		activeDescendantId: React.PropTypes.string,
		collection: React.PropTypes.object.isRequired,
		getMenuItemId: React.PropTypes.func.isRequired,
		onSelected: React.PropTypes.func.isRequired,
		strings: React.PropTypes.object.isRequired
	},

	render () {
		return (
			<ul className="slds-lookup__list" role="presentation">
				{this.props.collection.map((item, index) => {
					const id = this.props.getMenuItemId(index);
					const isHighlighted = this.props.activeDescendantId === id;
					const renderer = item.getRenderer();
					
					return (
						<li id={id} key={index} className={classNames('slds-lookup__item', {'slds-theme--shade': isHighlighted})}>
							<a href="#" role="option" onClick={this._handleClicked.bind(this, item)} tabIndex="-1">
								{renderer({
									icon: item.getIcon(),
									text: item.getText(),
									item: item._item,
									strings: this.props.strings
								})}
							</a>
						</li>
					);
				})}
			</ul>
		);
	},

	_handleClicked (item, e) {
		e.preventDefault();
		this.props.onSelected(item);
	}
});

export default LookupMenuItems;
