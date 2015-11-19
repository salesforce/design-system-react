/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React from 'react';
import SLDSUtilityIcon from './SLDSUtilityIcon';

export const ButtonIcon = React.createClass({

    getDefaultProps() {
        return {
            category: 'utility', // Utility Icon Reference: https://www.lightningdesignsystem.com/resources/icons#utility
        };
    },

    render() {
        let className  = 'slds-button__icon';
        let label = null;

        if (this.props.position) {
          //If no position prop given, default to left
          className += ' slds-button__icon--' + this.props.position;
        }
        if (this.props.size) {
          className += ' slds-button__icon--' + this.props.size;
        }
        if (this.props.destructive) {
          className += ' slds-button__icon--destructive';
        }
        if (this.props.hint) {
          className += ' slds-button__icon--hint';
        }
        if (this.props.assistiveText) {
          label = <span className="slds-assistive-text">{this.props.assistiveText}</span>;
        }
        return (
          <span>
          {label}
          <SLDSUtilityIcon name={this.props.name} category={this.props.category} aria-hidden='true' className={className} />
          </span>
        )


    }

});

export const Icon = React.createClass({

    getDefaultProps() {
        return {
            name:'',
            category: 'standard',
        };
    },

    render() {

        const name = this.props.name?this.props.name.replace(/_/g,'-'):'';
        const iconClassName = 'slds-icon-' + this.props.category + '-' + (this.props.theme || name);
        const styles = this.props.category === 'action'?{padding:'.5rem'}:null;
        let label = null;

        let className  = 'slds-icon';
        if (this.props.className) {
            className += ' ' +this.props.className;
        }
        if (this.props.size) {
            className += ' slds-icon--' + this.props.size;
        }
        if (this.props.position) {
            className += ' slds-icon--' + this.props.position;
        }
        if (this.props.assistiveText) {
          label = <span className="slds-assistive-text">{this.props.assistiveText}</span>;
        }
        className = className + ' ' + iconClassName;
        return (
        <span style={styles}>
          {label}
          <SLDSUtilityIcon name={this.props.name} category={this.props.category} aria-hidden='true' className={className} style={this.props.style}  />
        </span>
        );
    }

});

export const InputIcon = React.createClass({

    getDefaultProps() {
        return {
            category: 'utility',
        };
    },

    render() {
        const className  = 'slds-input__icon slds-icon-text-default';
        return <SLDSUtilityIcon name={this.props.name} category={this.props.category} aria-hidden='true' className={className} />;
    }

});

module.exports = {
    InputIcon:InputIcon,
    Icon:Icon,
    ButtonIcon:ButtonIcon
};
