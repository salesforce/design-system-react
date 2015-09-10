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

let Wizard = Lib.extend({}, WizardCore, {
	mixins: [State, Events, genericWillMount],

	_steps () {
		return this._collection.map((item, index) => {			
			return <WizardStep key={index} item={item} index={index + 1} currentIndex={this.getIndex()} onClick={this._handleWizardStepClicked} />;
		});
	},

	render () {
		return (
			<div className="wizard">
				<div className="steps-container">
					<ul className="steps">
						{this._steps()}
					</ul>
				</div>
				<div className="actions">
					<button type="button" className="btn btn-default btn-prev"><span className="glyphicon glyphicon-arrow-left"></span>Prev</button>
					<button type="button" className="btn btn-default btn-next" data-last="Complete">Next<span className="glyphicon glyphicon-arrow-right"></span></button>
				</div>
				<div className="step-content">
				</div>
			</div>
		);
	}
});

Wizard = Lib.runHelpers('react', CONTROL, Wizard);
Wizard = React.createClass(Wizard);

export default Wizard;
