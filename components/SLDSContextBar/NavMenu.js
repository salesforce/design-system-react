/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React from "react";

import styling from "./styling";

const pf = styling.pf;

//import SLDSIcon from "../SLDSIcon";


import SLDSMenuDropdown from "../SLDSMenuDropdown";

const displayName = 'SLDSContextBarNavMenu';


/**
 * The SLDSContextBarTitle component is the Lightning Design System Context Bar component. The SLDSContextBar is a container with dropdown menus.
 */
class NavMenu extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className={pf('context-bar-action grid dropdown-trigger')}>
        <a href="#void" className={pf('context-bar-action__label context-bar-action__label--expand text-link--reset grid grid--vertical-align-center FIX-context-bar-a')}>Menu Item 1</a>
{/*
        <button aria-haspopup="true" className={pf('context-bar-action__trigger button button--icon-bare')}>
          <SLDSIcon className={pf('context-bar-action__trigger-icon')} category="utility" name="down" size="x-small" assistiveText="Open submenu" />
        </button>
*/}

<SLDSMenuDropdown
  assistiveText="More Options"
  buttonVariant="icon-inverse"
  checkmark={true}
  iconName="down"
  iconVariant="bare"
  onMouseEnter={function(){console.log('Mouse enter')}}
  onMouseLeave={function(){console.log('Mouse leave')}}
  onSelect={function(value){console.log("selected: ",value)}}
  openOn="hover"
  options={[
    {label: "A Option Option Super Super Long", value: "A0"},
    {label: "B Option", value: "B0"},
    {label: "C Option", value: "C0"},
    {label: "D Option", value: "D0"},
    {label: "E Option", value: "E0"},
    {label: "A1 Option", value: "A1"},
    {label: "B2 Option", value: "B1"},
    {label: "C2 Option", value: "C1"},
    {label: "D2 Option", value: "D1"},
    {label: "E2 Option Super Super Long", value: "E1"},
  ]}
  value="C0" />
      </li>
    );
  }
}

NavMenu.displayName = displayName;

module.exports = NavMenu;