// RADIO CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import RadioCore, {CONTROL} from '../../core/radio';

// Framework specific
import React from 'react';
import { CheckboxObject } from '../checkbox/checkbox';

export const RadioObject = Lib.merge(CheckboxObject, {
	_onClick () {
		this.check();
	},

	_renderInput () {
		return (<input name={this.props.name}
						type="radio"
						disabled={this.props.disabled}
						checked={this.isChecked()}
						value={this.props.value || ''}
						onChange={this.check}/>);
	}
});

let Radio = Lib.merge({}, RadioCore, RadioObject);

Radio = Lib.runHelpers('react', CONTROL, Radio);
Radio = React.createClass(Radio);

export default Radio;
