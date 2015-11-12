// POPOVER CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import TooltipCore, {CONTROL} from '../../core/tooltip';

// Inherited functionality from popover
import { PopoverMethods } from '../popover/popover';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';
import mountable from '../mixins/custom-prop-types/mountable';

let Tooltip = Lib.merge({}, TooltipCore, PopoverMethods, {
	displayName: CONTROL,

	propTypes: {
		align: mountable,
		container: mountable,
		isOpen: React.PropTypes.bool,
		placement: React.PropTypes.string
	},

	mixins: [State, Events, genericWillMount],

	render () {
		if (this.refs.popover) {
			this._setElements();
		}

		return (
			<div className={this._getClassNames()} role="tooltip" ref="popover">
				<div className="slds-popover__body">{this.props.children}</div>
			</div>
		);
	}

});

Tooltip = Lib.runHelpers('react', CONTROL, Tooltip);
Tooltip = React.createClass(Tooltip);

export default Tooltip;
