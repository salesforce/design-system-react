/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


import React from 'react';
import CodeMirror from 'demo/CodeMirror';
import Samples from 'demo/Samples';
import PropTable from 'demo/PropTable';
import DOCS from 'docs';
import ComponentHeader from 'demo/pages/components/componentHeader';

import SLDSContextBar from '../../components/SLDSContextBar';

const displayName = "ContextBarSection";
const propTypes = {};
const defaultProps = {};

class ContextBarSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  getDescription() {
    const desc = DOCS["SLDSContextBar"].description;
    return {__html: desc };
  }

  handleSelectItem(event, menuItem, menuItemIndex) {
    alert(`Clicked ${menuItem.label} at ${menuItemIndex}`)
  }

  render(){
    const docs = DOCS["SLDSContextBar"] ? true : false;

    const contextBarMenuItems = [
      {
        name: 'home',
        type: 'link',
        label: 'Home'
      },
      {
        name: 'menu1',
        type: 'menu',
        label: 'Menu Item 1',
        menu: [
          // TODO: have an object here....
        ]
      }
    ];

    return (
      <div className='slds-p-around--medium'>
        <ComponentHeader cmpName="SLDSContextBar" cmpUrl="http://www.lightningdesignsystem.com/components/buttons" />

        <div className="copy-text">
          {docs ? <p dangerouslySetInnerHTML={this.getDescription()} className="slds-p-vertical--small mw-readability" /> : null}
        </div>

        <section className="slds-p-vertical--large">
          <SLDSContextBar title="My App" menuItems={contextBarMenuItems} onSelect={this.handleSelectItem.bind(this)}>
            <SLDSContextBar.Title>App Name</SLDSContextBar.Title>
            <SLDSContextBar.Nav>
              <SLDSContextBar.NavMenu
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
                value="C0"
              >
                <SLDSContextBar.NavMenuLink
                  onClick={()=>{alert('click')}}
                >Menu 1</SLDSContextBar.NavMenuLink>
              </SLDSContextBar.NavMenu>
              <SLDSContextBar.NavMenu
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
                value="C0"
              ><SLDSContextBar.NavMenuLink
                onClick={()=>{alert('click')}}
              >Menu 2</SLDSContextBar.NavMenuLink></SLDSContextBar.NavMenu>
            </SLDSContextBar.Nav>
          </SLDSContextBar>
        </section>
        <PropTable component="SLDSContextBar" />
      </div>
    );
  }

}

ContextBarSection.displayName = displayName;
ContextBarSection.propTypes = propTypes;
ContextBarSection.defaultProps = defaultProps;

module.exports = ContextBarSection;

