/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Tabs Component

// Implements the [Tabs design pattern](https://www.lightningdesignsystem.com/components/tabs/) in React.

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// ### classNames
import classNames from 'classnames';
import { TAB_PANEL } from '../../utilities/constants';


module.exports = React.createClass({
	displayName: TAB_PANEL,

	propTypes: {
		/**
		 * The `children` are the contents of the tab panel.
		 *
		 * Note that the structure of the `<Tabs />` component **does not** correspond to the DOM structure that is rendered. The `<Tabs />` component requires one or more children of type `<Pane />`, which themselves require a `label` property which will be what shows in the `<Tab />` and has `children`, which end up being the _contents of the tab's corresponding panel_.
		 *
		 * The component iterates through each `<Pane />` and rendering one `<Tab />` and one `<TabPanel />` for each of them. The tab(s) end up being children of the `<TabsList />`.
		 *
		 * ```
		 * <Tabs>
		 * 	<Pane label="Tab 1">
		 * 		<div>
		 * 			<h2 className="slds-text-heading--medium">This is my tab 1 contents!</h2>
		 * 			<p>They show when you click the first tab.</p>
		 * 		</div>
		 * 	</Pane>
		 * 	<Pane label="Tab 2">
		 * 		<div>
		 * 			<h2 className="slds-text-heading--medium">This is my tab 2 contents!</h2>
		 * 			<p>They show when you click the second tab.</p>
		 * 		</div>
		 * 	</Pane>
		 * </Tabs>
		 * ```
		 */
		children: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string
		]),
		className: PropTypes.string,
		id: PropTypes.string,
		
		/**
		 * Whether this panel is hidden or shown. Uses the `.slds-show` and `.slds-hide` classes.
		 */
		selected: PropTypes.bool,
		/**
		 * The HTML ID of the `<Tab />` that controls this panel.
		 */
		tabId: PropTypes.string
	},

	contextTypes: {
		forceRenderTabPanel: PropTypes.bool
	},

	getDefaultProps () {
		return {
			selected: false,
			id: null,
			tabId: null
		};
	},

	render () {
		const { className, children, selected, id, tabId, ...attributes } = this.props;

		return (
			<div
				{...attributes}
				className={classNames(
					'slds-tabs--default__content',
					className,
					{
						'slds-show': selected,
						'slds-hide': !selected
					}
				)}
				role="tabpanel"
				id={id}
				aria-selected={selected ? 'true' : 'false'}
				aria-labelledby={tabId}
			>
				{(this.context.forceRenderTabPanel || selected) ? children : null}
			</div>
		);
	}
});
