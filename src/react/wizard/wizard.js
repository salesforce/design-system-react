/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// WIZARD CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import WizardCore, {CONTROL} from '../../core/wizard';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';

// Children
import WizardStep from './wizard-step';
import WizardActions from './wizard-actions';

let Wizard = Lib.merge({}, WizardCore, {
	mixins: [State, Events, genericWillMount],

	displayName: CONTROL,

	propTypes: {
		// TODO: Modify when wizard data adapter gets set up
		step: React.PropTypes.shape({
			// getText: React.PropTypes.func.isRequired,
			// getContent: React.PropTypes.func.isRequired
		}),
		// TODO: Type of collection unknown until parsed by Data Adapter
		collection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired,
		stepElement: React.PropTypes.element,
		actionsElement: React.PropTypes.element
	},

	_steps (currentIndex) {
		const Step = this.props.stepElement || WizardStep;

		return this._collection.map((item, index) => {
			return <Step strings={this.state.strings} key={index} item={item} index={index + 1} currentIndex={currentIndex} onClicked={this._setSelection.bind(this, item._item)} />;
		});
	},

	render () {
		const currentIndex = this.getIndex();
		const isLast = currentIndex === this._collection.length();

		const Actions = this.props.actionsElement || WizardActions;

		return (
			<div className="wizard">
				<div className="steps-container">
					<ul className="steps">
						{this._steps(currentIndex)}
					</ul>
				</div>
				<Actions strings={this.state.strings} isLast={isLast} onPrevClicked={this.previousStep} onNextClicked={this.nextStep} onFinished={this._onFinished} onJumpToStep={this.setStepByIndex} />
				<div className="step-content">
					{this.props.children}
				</div>
			</div>
		);
	}
});

Wizard = Lib.runHelpers('react', CONTROL, Wizard);
Wizard = React.createClass(Wizard);

export default Wizard;
