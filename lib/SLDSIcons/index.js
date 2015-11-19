/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SLDSUtilityIcon = require('./SLDSUtilityIcon');

var _SLDSUtilityIcon2 = _interopRequireDefault(_SLDSUtilityIcon);

var ButtonIcon = _react2['default'].createClass({
    displayName: 'ButtonIcon',

    getDefaultProps: function getDefaultProps() {
        return {
            category: 'utility' };
    },

    // Utility Icon Reference: https://www.lightningdesignsystem.com/resources/icons#utility
    render: function render() {
        var className = 'slds-button__icon';
        var label = null;

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
            label = _react2['default'].createElement(
                'span',
                { className: 'slds-assistive-text' },
                this.props.assistiveText
            );
        }
        return _react2['default'].createElement(
            'span',
            null,
            label,
            _react2['default'].createElement(_SLDSUtilityIcon2['default'], { name: this.props.name, category: this.props.category, 'aria-hidden': 'true', className: className })
        );
    }

});

exports.ButtonIcon = ButtonIcon;
var Icon = _react2['default'].createClass({
    displayName: 'Icon',

    getDefaultProps: function getDefaultProps() {
        return {
            name: '',
            category: 'standard'
        };
    },

    render: function render() {

        var name = this.props.name ? this.props.name.replace(/_/g, '-') : '';
        var iconClassName = 'slds-icon-' + this.props.category + '-' + (this.props.theme || name);
        var styles = this.props.category === 'action' ? { padding: '.5rem' } : null;
        var label = null;

        var className = 'slds-icon';
        if (this.props.className) {
            className += ' ' + this.props.className;
        }
        if (this.props.size) {
            className += ' slds-icon--' + this.props.size;
        }
        if (this.props.position) {
            className += ' slds-icon--' + this.props.position;
        }
        if (this.props.assistiveText) {
            label = _react2['default'].createElement(
                'span',
                { className: 'slds-assistive-text' },
                this.props.assistiveText
            );
        }
        className = className + ' ' + iconClassName;
        return _react2['default'].createElement(
            'span',
            { style: styles },
            label,
            _react2['default'].createElement(_SLDSUtilityIcon2['default'], { name: this.props.name, category: this.props.category, 'aria-hidden': 'true', className: className, style: this.props.style })
        );
    }

});

exports.Icon = Icon;
var InputIcon = _react2['default'].createClass({
    displayName: 'InputIcon',

    getDefaultProps: function getDefaultProps() {
        return {
            category: 'utility'
        };
    },

    render: function render() {
        var className = 'slds-input__icon slds-icon-text-default';
        return _react2['default'].createElement(_SLDSUtilityIcon2['default'], { name: this.props.name, category: this.props.category, 'aria-hidden': 'true', className: className });
    }

});

exports.InputIcon = InputIcon;
module.exports = {
    InputIcon: InputIcon,
    Icon: Icon,
    ButtonIcon: ButtonIcon
};