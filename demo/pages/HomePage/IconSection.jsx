/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

import React from 'react';
import SLDSButton from '../../../components/SLDSButton';
import {ButtonIcon, Icon} from "./../../../components/SLDSIcons";
import {default as PrismCode} from "react-prism/lib/PrismCode";
import SLDSUtilityIcon from '../../../components/SLDSUtilityIcon';
import CodeMirror from '../CodeMirror';
require('codemirror/mode/javascript/javascript');

module.exports = React.createClass( {
  getInitialState () {
		return {
			code: "<Icon name='announcement' category='action' size='medium' assistiveText='Action' />",
			readOnly: false,
			mode: 'javascript',
		};
	},
	updateCode (newCode) {
		this.setState({
			code: newCode
		});
	},
	changeMode (e) {
		var mode = e.target.value;
		this.setState({
			mode: mode,
			code: defaults[mode]
		});
	},
	toggleReadOnly () {
		this.setState({
			readOnly: !this.state.readOnly
		}, () => this.refs.editor.focus());
	},

  handleButtonClick () {
    alert('Test Button Clicked');
  },

  render() {
    var options = {
      mode: 'text/jsx',
      lineNumbers: false,
      lineWrapping: false,
      matchBrackets: true,
      tabSize: 2,
      theme: 'solarized light',
      readOnly: this.state.readOnly
    };
    var defaultCode = "<Icon name='announcement' category='action' size='medium' assistiveText='Action' />";
    return (

            <div className='slds-p-around--medium'>
              <h3 className='slds-text-heading--medium slds-truncate'>
                <a href="javascript:void(0)" id='iconSection'>
                Icon
                </a>
              </h3>

              <div>
                <CodeMirror ref="editor" defaultCode={defaultCode} value={this.state.code} onChange={this.updateCode} options={options} />
              </div>
      { /*
              <div className='slds-p-vertical--large'>

              <table className="slds-container--small">
              <tr>
                <td className="slds-p-vertical--medium">
                Action
                </td>
                <td>
                <Icon name='announcement' category='action' size="medium" assistiveText='Action' />
                </td>
              </tr>
              <tr>
                <td className="slds-p-vertical--medium">
                Custom
                </td>
                <td>
                <Icon name='custom3' category='custom' size="large" assistiveText='Custom' />
                </td>
              </tr>
              <tr>
                <td className="slds-p-vertical--medium">
                Standard
                </td>
                <td>
                <Icon name='account' category='standard' size="large" assistiveText='Standard' />
                </td>
              </tr>
              <tr>
                <td className="slds-p-vertical--medium">
                Utility
                </td>
                <td>
                <Icon name='open_folder' category='utility' size="medium" assistiveText='Files' className="slds-icon-text-default" />
                </td>
              </tr>
              </table>

              </div>
        */ }
            </div>


    );
  }
});
