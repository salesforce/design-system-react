// POPOVER CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import TooltipCore, {CONTROL} from '../../core/tooltip';

// Inherited functionality from popover
import { PopoverMethods } from '../popover/popover';
import Positionable from '../../traits/positionable';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';
import mountable from '../mixins/custom-prop-types/mountable';

let Tooltip = Lib.merge({}, TooltipCore, PopoverMethods, {
	displayName: CONTROL,

	propTypes: {
		alignmentTarget: mountable,
		container: mountable,
		isOpen: React.PropTypes.bool,
		positionedTargetVerticalAttachment: React.PropTypes.oneOf(Object.keys(Positionable.positionable.attatchmentOptions))
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
