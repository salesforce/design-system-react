// CHECKBOX CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import CheckboxCore, {CONTROL} from '../../core/checkbox';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';

// Third party
import classNames from 'classnames';

export const CheckboxObject = {
	mixins: [State, Events, genericWillMount],

	propTypes: {
		disabled: React.PropTypes.bool,
		checked: React.PropTypes.bool,
		labelText: React.PropTypes.string,
		value: React.PropTypes.string,
		name: React.PropTypes.string
	},

	render () {
		return (
			<label className={classNames(this.cssClasses.CONTROL)}>
				{this._renderInput()}
				<span className={classNames(this.cssClasses.FAUX)}></span>
				{this._renderLabelText()}
			</label>
		);
	},

	_renderInput () {
		return (<input name={this.props.name}
					type="checkbox"
					disabled={this.props.disabled}
					checked={this.props.checked}
					value={this.props.value || ''}
					onChange={this.toggle}/>);
	},

	_renderLabelText () {
		if (this.props.labelText) {
			return <span className={classNames(this.cssClasses.LABEL)}>{this.props.labelText}</span>;
		}
	}
};

let Checkbox = Lib.merge({}, CheckboxCore, CheckboxObject);

Checkbox = Lib.runHelpers('react', CONTROL, Checkbox);
Checkbox = React.createClass(Checkbox);

export default Checkbox;
