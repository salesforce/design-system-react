/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Tabs: Pane child component

// Helps implement the [Tabs design pattern](https://www.lightningdesignsystem.com/components/tabs/) in React. 

// The `<Pane />` component allows us to simplify the structure of the `<Tabs />` component. 
// Rather than require different (deeply nested) children for tabslist, with its tab(s) as well as tabpanel(s), we provide this Pane component which takes a `label` property that will become what is shown on the `<Tab />` that will be associated with it.
// The `children` of the Pane will be fed to the `<TabPanel />` component, while its `label` is handled in `<Tab />`, via `<TabsList />`.
/**
 *
 * ```
 * <Pane label="Tab 1">
 * 	<div>
 * 		<h2 className="slds-text-heading--medium">This is my tab 1 contents!</h2>
 * 		<p>They show when you click the first tab.</p>
 * 	</div>
 * </Pane>
 * ```
 */

// ## Dependencies

// ### React
import React, {
	PropTypes
} from 'react';

// ## Constants
import { TAB_PANE } from '../../utilities/constants';

const Pane = (props) => (<div>{props.children}</div>);

Pane.displayName = TAB_PANE;
Pane.propTypes = {
	/**
	 * The string that is handed off to the `<Tab />` component, ends up being the title and the label for the tab associated with its tab panel.
	 */
	label: PropTypes.string.isRequired,
	children: PropTypes.element.isRequired
};

module.exports = Pane;
