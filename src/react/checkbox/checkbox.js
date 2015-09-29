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
		selected: React.PropTypes.bool,
		text: React.PropTypes.string.isRequired,
		value: React.PropTypes.string,
		inline: React.PropTypes.bool,
		addon: React.PropTypes.bool,
		highlight: React.PropTypes.bool
	},

	render () {
		const disabledClass = {};
		disabledClass[this.cssClasses.DISABLED] = this.props.disabled;

		return (
			<label className={classNames(this.cssClasses.CONTROL, disabledClass)}>
				<input className="sr-only" type="checkbox" disabled={this.props.disabled} value={this.props.value || this.props.text} /> <span className="checkbox-label">{this.props.text}</span>
			</label>
		);
	}
};

let Checkbox = Lib.merge({}, CheckboxCore, CheckboxObject);

Checkbox = Lib.runHelpers('react', CONTROL, Checkbox);
Checkbox = React.createClass(Checkbox);

export default Checkbox;
