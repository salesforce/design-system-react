/*
   Copyright (c) 2015, salesforce.com, inc. All rights reserved.
   Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
   Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
   Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
   Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */

"use strict";

import React from "react";
import SLDSButton from "../../../components/SLDSButton";
import SLDSButtonStateful from "../../../components/SLDSButton/SLDSButtonStateful";
import {default as PrismCode} from "react-prism/lib/PrismCode";





module.exports = React.createClass( {

  getDefaultProps () {
    return {};
  },

  getInitialState () {
    return {};
  },

  handleClick (btnType) {
    return function() {
      alert(btnType + " Button Clicked");
    }
  },

  handleStatefulClick(e){
    console.log("the click event is ", e);
  },


  render() {
    let hintBtnParent = {backgroundColor: "#7fdbff", padding: "10px 50px", display: "inline-block"};
    let inverseBtnParent = {backgroundColor: "#16325c", padding: "10px", display: "inline-block"};
    return (

      <div className="slds-p-around--medium">
        <h3 className="slds-text-heading--medium slds-truncate">
          <a href="javascript:void(0)" id="buttonSection">
          Button
          </a>
        </h3>

        <PrismCode className="language-markup">
        {/*require("raw-loader!../../code-snippets/SLDSButton.txt") */}
        </PrismCode>


        <div className="slds-p-vertical--medium">
          <h4 className="slds-text-heading--small">Standard Buttons</h4>
          <SLDSButton label="Base" variant="base" onClick={this.handleClick('Base')} className="slds-m-right--medium"/>
          <SLDSButton label="Neutral" variant="neutral" onClick={this.handleClick('Neutral')} className="slds-m-right--medium"/>
          <SLDSButton label="Neutral Icon" variant="neutral" iconName="download" iconPosition="left" onClick={this.handleClick('Neutral Icon')} className="slds-m-right--medium"/>
          <SLDSButton label="Responsive" variant="neutral" responsive={true} onClick={this.handleClick('Responsive')}  className="slds-m-right--medium"/>
          <SLDSButton label="Brand" variant="brand" onClick={this.handleClick('Brand')} className="slds-m-right--medium"/>
          <SLDSButton label="Brand Disabled" variant="brand" iconName="add" iconPosition="left" disabled={true} onClick={this.handleClick('Brand Disabled')} className="slds-m-right--medium"/>
          <SLDSButton label="Destructive" variant="destructive" onClick={this.handleClick('Destructive')} className="slds-m-right--medium"/>
          <div style={inverseBtnParent}>
            <SLDSButton label="Inverse" variant="inverse" onClick={this.handleClick('Inverse')} className="slds-m-right--medium"/>
          </div>
        </div>

        <div className="slds-p-vertical--medium">
          <h4 className="slds-text-heading--small">Stateful Buttons</h4>
          <SLDSButtonStateful type="icon" iconName="like" iconSize="large" className="slds-m-right--medium"/>
          <span className="slds-m-right--medium">
            <SLDSButtonStateful type="follow"/>
          </span>
          <div style={inverseBtnParent} className="slds-m-right--medium">
            <SLDSButtonStateful type="join" variant="inverse" />
          </div>
        </div>

        <div className="slds-p-vertical--medium">
          <h4 className="slds-text-heading--small">Icon Buttons</h4>
          <table className="slds-container--small">
          <tr>
            <td className="slds-p-vertical--medium"><span className="slds-m-right--medium"> Icon base </span></td>
            <td>
            <SLDSButton assistiveText="Icon Base Small" variant="icon" iconName="settings" iconSize="small" onClick={this.handleClick('Icon')} />
            <SLDSButton assistiveText="Icon Base Medium" variant="icon" iconName="settings" iconSize="medium" onClick={this.handleClick('Icon')} />
            <SLDSButton assistiveText="Icon Base Large" variant="icon" iconName="settings" iconSize="large" onClick={this.handleClick('Icon')} />
            </td>
          </tr>
          <tr>
            <td className="slds-p-vertical--medium"><span className="slds-m-right--medium"> Icon bare </span></td>
            <td>
            <SLDSButton assistiveText="Icon Bare Small" variant="icon" iconName="settings" iconSize="small" iconVariant="bare" onClick={this.handleClick('Icon')} />
            <SLDSButton assistiveText="Icon Bare medium" variant="icon" iconName="settings" iconSize="medium" iconVariant="bare" onClick={this.handleClick('Icon')} />
            <SLDSButton assistiveText="Icon Bare large" variant="icon" iconName="settings" iconSize="large" iconVariant="bare" onClick={this.handleClick('Icon')} />
            </td>
          </tr>
          <tr>
            <td className="slds-p-vertical--medium"><span className="slds-m-right--medium"> Icon container </span></td>
            <td>
            <SLDSButton assistiveText="Icon container small" variant="icon" iconName="settings" iconSize="small" iconVariant="container" onClick={this.handleClick('Icon')} />
            <SLDSButton assistiveText="Icon container medium" variant="icon" iconName="settings" iconSize="medium" iconVariant="container" onClick={this.handleClick('Icon')} />
            <SLDSButton assistiveText="Icon container large" variant="icon" iconName="settings" iconSize="large" iconVariant="container" onClick={this.handleClick('Icon')} />
            </td>
          </tr>
          <tr>
            <td className="slds-p-vertical--medium"><span className="slds-m-right--medium"> Icon border </span></td>
            <td>
            <SLDSButton assistiveText="Icon border small" variant="icon" iconName="settings" iconSize="small" iconVariant="border" onClick={this.handleClick('Icon')} />
            <SLDSButton assistiveText="Icon border medium" variant="icon" iconName="settings" iconSize="medium" iconVariant="border" onClick={this.handleClick('Icon')} />
            <SLDSButton assistiveText="Icon border large" variant="icon" iconName="settings" iconSize="large" iconVariant="border" onClick={this.handleClick('Icon')} />
            </td>
          </tr>
          <tr>
          <td className="slds-p-vertical--medium"><span className="slds-m-right--medium"> Icon border filled </span></td>
            <td>
            <SLDSButton assistiveText="Icon border-filled small" variant="icon" iconName="settings" iconSize="small" iconVariant="border-filled" onClick={this.handleClick('Icon')} />
            <SLDSButton assistiveText="Icon border-filled medium" variant="icon" iconName="settings" iconSize="medium" iconVariant="border-filled" onClick={this.handleClick('Icon')} />
            <SLDSButton assistiveText="Icon border-filled large" variant="icon" iconName="settings" iconSize="large" iconVariant="border-filled" onClick={this.handleClick('Icon')} />
            </td>
            </tr>
          <tr>
          <td className="slds-p-vertical--medium"><span className="slds-m-right--medium"> Icon More </span></td>
            <td>
            <SLDSButton assistiveText="Icon more small" variant="icon" iconName="settings" iconSize="small" iconVariant="more" onClick={this.handleClick('Icon')} />
            <SLDSButton assistiveText="Icon more medium" variant="icon" iconName="settings" iconSize="medium" iconVariant="more" onClick={this.handleClick('Icon')} />
            <SLDSButton assistiveText="Icon more large" variant="icon" iconName="settings" iconSize="large" iconVariant="more" onClick={this.handleClick('Icon')} />
            </td>
            </tr>
          <tr>
            <td className="slds-m-vertical--medium"><span className="slds-m-right--medium"> Icon Inverse </span></td>
            <td>
            <div style={inverseBtnParent}>
            <SLDSButton assistiveText="Icon inverse" variant="icon-inverse" iconName="settings" iconSize="large" onClick={this.handleClick('Icon')} />
            </div>
            </td>
          </tr>
          <tr>
            <td className="slds-m-vertical--medium"><span className="slds-m-right--medium"> Icon Hint </span></td>
            <td>
            <div style={hintBtnParent} className="slds-hint-parent">
            <SLDSButton assistiveText="Icon hint" variant="icon" iconName="settings" iconSize="large" hint={true} onClick={this.handleClick('Icon')} />
            </div>
            </td>
          </tr>
          </table>

        </div>
      </div>


    );
  }
});
