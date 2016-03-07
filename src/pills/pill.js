/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Pills Component: Pill --- SLDS for React

// Renders an individual Pill item for the the [Pills Component](./pills.html)


// ## API

/* @todo Add a full API description of the control here. */

// ## Dependencies

// ### React and ReactDOM
// React and ReactDOM are external dependencies of the project.
import React from 'react';
import ReactDOM from 'react-dom';

// #### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// SLDS for React uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together." Because of the small size of the library, the
// default build includes the entire library rather than requiring it as an
// external dependency.
import classNames from 'classnames';

// #### Button
// [../button/button](../button/button.html)
import Button from '../button/button';

// Since the Pills Component is simpply collection zero or more individual items `<Pill>` in a wrapper, there is
// no need for a common core of the `<Pill>` in SLDS for JavaScript. Therefore we must set `CONTROL`
// manually here.
export const CONTROL = 'lookup-pill';

// ## Pill
const Pill = React.createClass({
	// ### Display Name
	// Always use the canonical component name (set manually above) as the
	// React display name.
	displayName: CONTROL,

	// ### Prop Types
	propTypes: {
		autoFocus  : React.PropTypes.bool,
		bare       : React.PropTypes.bool,
		item       : React.PropTypes.object.isRequired,
		onDeselect : React.PropTypes.func.isRequired,
		renderer   : React.PropTypes.func.isRequired,
		strings    : React.PropTypes.object.isRequired
	},

	// ### Get Default Props
	getDefaultProps () {
		return {
			autoFocus: false,
			bare: false
		};
	},

	// ### Render
	render () {
		return (
			<a className={classNames('slds-pill', { 'slds-pill--bare': this.props.bare })} href="#" tabIndex="0" onClick={this._handlePillClick} onKeyPress={this._handleKeyPressed} onKeyDown={this._handleKeyPressed}>
				{this.props.renderer({
					icon: this.props.item.getIcon(),
					text: this.props.item.getText(),
					item: this.props.item._item,
					strings: this.props.strings
				})}
				<Button className={classNames('slds-pill__remove')} iconStyle="icon-bare" icon="utility.close" assistiveText={this.props.strings.REMOVE} onClick={this._handleCloseClick}/>
			</a>
		);
	},

	// ### Component Did Mount
	componentDidMount () {
		if (this.props.autoFocus) {
			ReactDOM.findDOMNode(this).focus();
		}
	},

	// ## Handle Pill Click
	_handlePillClick (e) {
		e.preventDefault();
	},

	// ## Handle Close Click
	_handleCloseClick () {
		this.props.onDeselect(this.props.item);
	},

	// ## Handle Key Pressed
	_handleKeyPressed (e) {
		if (e.key && /(Backspace|Delete)/.test(e.key)) {
			e.preventDefault();
			this.props.onDeselect(this.props.item);
		}
	}
});

export default Pill;
