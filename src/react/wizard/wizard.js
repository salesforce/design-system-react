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

let Wizard = Lib.extend({}, WizardCore, {
	mixins: [State, Events, genericWillMount],

	propTypes: {
		step: React.PropTypes.object,
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
