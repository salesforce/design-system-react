// SPINNER CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import SpinnerCore, {CONTROL} from '../../core/spinner';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import genericWillMount from '../mixins/generic-will-mount';

let Spinner = Lib.merge({}, SpinnerCore, {
	mixins: [State, genericWillMount],

	propTypes: {
		size: React.PropTypes.string,
		theme: React.PropTypes.string
	},

	render () {
		return (
			<div className={this.cssClasses[this.props.size]}>
				<img src={this.fileNames[this.props.theme]} alt="Loading..." />
			</div>
		);
	}
});

Spinner = Lib.runHelpers('react', CONTROL, Spinner);
Spinner = React.createClass(Spinner);

export default Spinner;
