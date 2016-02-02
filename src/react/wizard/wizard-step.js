/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// Framework specific
import React from 'react';
import classNames from 'classnames';

export const CONTROL = 'wizard-step';

const WizardStep = React.createClass({
	displayName: CONTROL,

	propTypes: {
		currentIndex: React.PropTypes.number.isRequired,
		index: React.PropTypes.number.isRequired,
		item: React.PropTypes.shape({
			getText: React.PropTypes.func.isRequired
		}),
		onClicked: React.PropTypes.func.isRequired
		// TODO: Strings is a prop being passed in but not used
		// strings: React.PropTypes.object
	},

	render () {
		const state = {
			active: this.props.index === this.props.currentIndex,
			complete: this.props.index < this.props.currentIndex
		};
		
		return (
			<li data-step={this.props.index} className={classNames(state)} onClick={state.complete ? this.props.onClicked : undefined}>
				<span className="badge">{this.props.index}</span>{this.props.item.getText()}<span className="chevron"></span>
			</li>
		);
	}
});

export default WizardStep;
