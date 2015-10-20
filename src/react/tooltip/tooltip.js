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

// Third party
import classNames from 'classnames';

let Tooltip = Lib.merge({}, TooltipCore, PopoverMethods, {
	mixins: [State, Events],

	render () {
		let position;

		if (this.refs.popover) {
			this._setElements();
		}

		position = this._popoverPosition();

		return (
			<div className={classNames(this.getClassNames(), {'slds-hidden': !this.props.isOpen})} role="tooltip" ref="popover" style={position}>
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
