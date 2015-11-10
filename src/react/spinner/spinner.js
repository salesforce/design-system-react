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

	displayName: CONTROL,

	propTypes: {
		size: React.PropTypes.oneOf(Object.keys(SpinnerCore.sizes)),
		theme: React.PropTypes.oneOf(Object.keys(SpinnerCore.fileNames))
	},

	render () {
		const strings = this.getState('strings');
		
		return (
			<div className={this.sizes[this.props.size]}>
				<img src={this.fileNames[this.props.theme]} alt={strings.LOADING} />
			</div>
		);
	}
});

Spinner = Lib.runHelpers('react', CONTROL, Spinner);
Spinner = React.createClass(Spinner);

export default Spinner;
