// WIZARD CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import WizardCore, {CONTROL} from '../../core/wizard';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';

let Wizard = Lib.extend({}, WizardCore, {
	mixins: [State, Events, genericWillMount],

	render () {
		return (
			<div className="wizard">
				<div className="steps-container">
					<ul className="steps">
						<li data-step="1" data-name="campaign" className="active"><span className="badge">1</span>Campaign<span className="chevron"></span></li>
						<li data-step="2"><span className="badge">2</span>Recipients<span className="chevron"></span></li>
						<li data-step="3" data-name="template"><span className="badge">3</span>Template<span className="chevron"></span></li>
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
