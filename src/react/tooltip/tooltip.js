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

let Tooltip = Lib.merge({}, TooltipCore, PopoverMethods, {
	mixins: [State, Events, genericWillMount],

	render () {
		if (this.refs.popover) {
			this._setElements();
		}

		return (
			<div className={this._getClassNames()} role="tooltip" ref="popover">
				<div className="slds-tooltip__content">
					<div className="slds-tooltip__body">{this.props.children}</div>
				</div>
			</div>
		);
	}

});

Tooltip = Lib.runHelpers('react', CONTROL, Tooltip);
Tooltip = React.createClass(Tooltip);

export default Tooltip;
