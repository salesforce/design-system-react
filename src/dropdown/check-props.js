/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import deprecatedProperty from 'slds-for-js-core/lib/warning/deprecated-property';
import sunsetProperty from 'slds-for-js-core/lib/warning/sunset-property';

let checkProps = function () {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function (CONTROL, props) {
		/* eslint-disable max-len */
		// Deprecated and changed to another property
		deprecatedProperty(CONTROL, props.onSelect, 'onSelect', 'onChange');
		deprecatedProperty(CONTROL, props.options, 'options', 'collection');
		deprecatedProperty(CONTROL, props.options, 'value', 'selection');

		// End-of-life properties
		sunsetProperty(CONTROL, props.hoverCloseDelay, 'hoverCloseDelay', 'The slds-dropdown-trigger class which allowed showing the dropdown menu on mouse hover was deprecated in SLDS v1.0.');
		sunsetProperty(CONTROL, props.openOn, 'openOn', 'The slds-dropdown-trigger class, which allowed showing the dropdown menu on mouse hover, was deprecated in SLDS v1.0.');
		sunsetProperty(CONTROL, props.placeholder, 'placeholder', 'If a placeholder is needed and the text of the button will be updated. Please use a picklist.');
		sunsetProperty(CONTROL, props.renderArrow, 'renderArrow', 'All Dropdown Triggers should have an indicator of the presence of a dropdown, unless it is an icon-more or icon-bare button style.');
		sunsetProperty(CONTROL, props.swapIcon, 'swapIcon', 'Please use a Picklist without a text label instead.');

		// API has been moved to Trigger child
		sunsetProperty(CONTROL, props.assistiveText, 'assistiveText', 'Please set assistiveText with a child of Trigger: <Dropdown><Trigger><Button assistiveText="Change settings" /></Trigger></Dropdown>');
		sunsetProperty(CONTROL, props.buttonClass, 'buttonClassName', 'Please set the className with a child of Trigger: <Dropdown><Trigger><Button className="slds-is-cool" /></Trigger></Dropdown>');
		sunsetProperty(CONTROL, props.buttonVariant, 'buttonVariant', 'Please set `variant` with a child of Trigger: <Dropdown><Trigger><Button variant="brand" /></Trigger></Dropdown>');
		sunsetProperty(CONTROL, props.icon, 'icon', 'Please set icon with a child of Trigger: <Dropdown><Trigger><Button iconCategory="utility" iconName="settings" /></Trigger></Dropdown>');
		sunsetProperty(CONTROL, props.label, 'label', 'Please set the label with a child of Trigger: <Dropdown><Trigger><Button text="Noice!" /></Trigger></Dropdown>');
		sunsetProperty(CONTROL, props.onClick, 'onClick', 'Please set onClick with a child of Trigger: <Dropdown><Trigger><Button onClick={myCoolCallback} /></Trigger></Dropdown>');
		sunsetProperty(CONTROL, props.tooltip, 'tooltip', 'Please set the label with a child of Trigger: <Dropdown><Trigger><Button tooltip=NoiceElement /></Trigger></Dropdown>');

		// API has been moved to the Menu child
		sunsetProperty(CONTROL, props.listItemRenderer, 'listItemRenderer', 'Please use a child of Menu instead: <Dropdown><Menu><MenuItems><MenuItem /></MenuItems></Menu></Dropdown>');
		sunsetProperty(CONTROL, props.menuItemRenderer, 'menuItemRenderer', 'Please use a child of Menu instead: <Dropdown><Menu><MenuItems><MenuItem /></MenuItems></Menu></Dropdown>');
		/* eslint-enable max-len */
	};
}

export default checkProps;
