// RADIO CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import RadioCore, {CONTROL} from '../../core/radio';

// Framework specific
import React from 'react';
import { CheckboxObject } from '../checkbox/checkbox';

export const RadioObject = Lib.merge(CheckboxObject, {
	propTypes: {
		name: React.PropTypes.string
	},

	_onClick () {
		this.check();
	},

	_renderInput () {
		return (<input className="sr-only" type="radio" disabled={this.props.disabled} checked={this.props.checked} name={this.props.name} value={this.props.value || this.props.text} onClick={this._stopPropagation} />);
	}
});

let Radio = Lib.merge({}, RadioCore, RadioObject);

Radio = Lib.runHelpers('react', CONTROL, Radio);
Radio = React.createClass(Radio);

export default Radio;
