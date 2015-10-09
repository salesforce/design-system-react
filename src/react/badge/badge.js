// BADGE CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import BadgeCore, {CONTROL} from '../../core/badge';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';

export const BadgeObject = {
	mixins: [State, Events, genericWillMount],

	propTypes: {
		text: React.PropTypes.string,
		theme: React.PropTypes.string
	},

	render () {
		const classNames = BadgeCore._getClassNameByTheme(this.getProperty('theme'));

		return (
			<span className={classNames}>{this.props.text}</span>
		);
	}
};

let Badge = Lib.merge({}, BadgeCore, BadgeObject);

Badge = Lib.runHelpers('react', CONTROL, Badge);
Badge = React.createClass(Badge);

export default Badge;