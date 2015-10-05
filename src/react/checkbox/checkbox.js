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
		checkedValue: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.oneOf([ null ])
		]),
		text: React.PropTypes.string,
		value: React.PropTypes.string,
		inline: React.PropTypes.bool,
		addon: React.PropTypes.bool,
		highlight: React.PropTypes.bool
	},
	
	_renderText () {
		if (this.props.text && !this.props.addon) {
			return <span className={this.cssClasses.LABEL}>{this.props.text}</span>;
		}
	},

	render () {
		const labelClasses = {};
		labelClasses[this.cssClasses.DISABLED] = this.props.disabled;
		labelClasses[this.cssClasses.CHECKED] = this.isChecked();
		labelClasses[this.cssClasses.INLINE] = this.props.inline || this.props.addon;
		labelClasses[this.cssClasses.ADDON] = this.props.addon;
		labelClasses[this.cssClasses.HIGHLIGHT] = this.props.highlight;

		return (
			<label className={classNames(this.cssClasses.CONTROL, labelClasses)} onClick={this.toggle}>
				<input className="sr-only" type="checkbox" disabled={this.props.disabled} checked={this.isChecked()} value={this.props.value || ''} onClick={this._stopPropagation} />{this._renderText()}
			</label>
		);
	},
	
	_stopPropagation (e) {
		e.stopPropagation();
		// return false;	//TODO: it was yelling about this, saying it would be deprecated... should we remove?
	}
};

let Checkbox = Lib.merge({}, CheckboxCore, CheckboxObject);

Checkbox = Lib.runHelpers('react', CONTROL, Checkbox);
Checkbox = React.createClass(Checkbox);

export default Checkbox;
