/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # TabItem Component

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// ### classNames
import classNames from 'classnames';

// ## Constants
import { TAB } from '../../utilities/constants';
import { findDOMNode } from 'react-dom';


const Tab = React.createClass({
	displayName: TAB,

	propTypes: {
		/**
		 * CSS classes to be added to the tab.
		 */
		className: PropTypes.string,

		/**
		 * The HTML ID of this tab. Also used by the `<TabPanel />` it controls as `tabId`.
		 */
		id: PropTypes.string,

		/**
		 * Whether to apply focus to this tab.
		 */
		focus: PropTypes.bool,

		/**
		 * When `true`, the class `.slds-active` is applied.
		 */
		selected: PropTypes.bool,

		/**
		 * When `true`, the HTML attribute `aria-disabled` will be applied.
		 */
		disabled: PropTypes.bool,

		/**
		 * The CSS class to be applied when this tab is selected. Defaults to `.slds-active`. If another class is desired, it should be passed in _along with_ `.slds-active`, not _instead_ of it.
		 */
		activeTabClassName: PropTypes.string,

		/**
		 * The CSS class to be applied when this tab is disabled. Defaults to `.slds-disabled`. If another class is desired, it should be passed in _along with_ `.slds-disabled`, not _instead_ of it.
		 */
		disabledTabClassName: PropTypes.string,

		/**
		 * The HTML ID of `<TabPanel />` this tab controls.
		 */
		panelId: PropTypes.string,
		
		/**
		 * The string that is shown as both the title and the label for this tab.
		 */
		children: PropTypes.string
	},

	getDefaultProps () {
		return {
			focus: false,
			selected: false,
			activeTabClassName: 'slds-active',
			disabledTabClassName: 'slds-disabled'
		};
	},

	componentDidMount () {
		this.checkFocus();
	},

	componentDidUpdate () {
		this.checkFocus();
	},

	checkFocus () {
		if (this.props.selected && this.props.focus) {
			findDOMNode(this).focus();
		}
	},

	render () {
		const {
			selected,
			disabled,
			panelId,
			activeTabClassName,
			disabledTabClassName,
			className,
			children,
			id,
			...attributes } = this.props;

		delete attributes.focus;
	
		return (
			<li
				{...attributes}
				className={classNames(
					'slds-tabs--default__item',
					'slds-text-title--caps',
					className,
					{
						[activeTabClassName]: selected,
						[disabledTabClassName]: disabled
					}
				)}
				role="tab"
				aria-selected={selected ? 'true' : 'false'}
				aria-disabled={disabled}
				aria-controls={panelId}
				tabIndex={selected ? '0' : disabled ? '-1' : null}
				id={id}
				title={children}
				style={disabled ? { opacity: 0.5 } : {}}
			>
				<a
					className="slds-tabs--default__link"
					href="javascript:void(0);"
					role="presentation"
					tabIndex="-1"
					aria-disabled={disabled}
				>
					{children}
				</a>
			</li>
		);
	}
});

module.exports = Tab;
