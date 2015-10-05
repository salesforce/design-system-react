// RADIO CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import RadioCore, {CONTROL} from '../../core/radio';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';

// Third party
import classNames from 'classnames';

export const RadioObject = {
	mixins: [State, Events, genericWillMount],

	propTypes: {
		disabled: React.PropTypes.bool,
		checked: React.PropTypes.bool,
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
		labelClasses[this.cssClasses.CHECKED] = this.props.checked;
		labelClasses[this.cssClasses.INLINE] = this.props.inline || this.props.addon;
		labelClasses[this.cssClasses.ADDON] = this.props.addon;
		labelClasses[this.cssClasses.HIGHLIGHT] = this.props.highlight;

		return (
			<label className={classNames(this.cssClasses.CONTROL, labelClasses)} onClick={this.toggle}>
				<input className="sr-only" type="radio" disabled={this.props.disabled} checked={this.props.checked} value={this.props.value || this.props.text} onClick={this._stopPropagation} />{this._renderText()}
			</label>
		);
	},

	_stopPropagation (e) {
		e.stopPropagation();
		return false;
	}
};

let Radio = Lib.merge({}, RadioCore, RadioObject);

Radio = Lib.runHelpers('react', CONTROL, Radio);
Radio = React.createClass(Radio);

export default Radio;
