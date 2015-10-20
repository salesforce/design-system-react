// POPOVER CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import TooltipCore, {CONTROL} from '../../core/tooltip';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';

// Third party
import classNames from 'classnames';

let Tooltip = Lib.merge({}, TooltipCore, {
	mixins: [State, Events],

	render () {
		let position;

		if (this.refs.tooltip) {
			this._setElements();
		}

		position = this._tooltipPosition();

		return (
			<div className={classNames(this.getClassNames(), {'slds-hidden': !this.props.isOpen})} role="tooltip" ref="tooltip" style={position}>
				<div className="slds-tooltip__content">
					<div className="slds-tooltip__body">{this.props.children}</div>
				</div>
			</div>
		);
	},

	componentWillMount () {
		this.elements = {};
	},

	_setElements () {
		this.elements.tooltip = this.refs.tooltip;
		this.elements.container = this.props.container;
		this.elements.align = this.props.align;
	},

	_tooltipPosition () {
		let position;

		if (this.elements && this.elements.tooltip) {
			position = this.getElementAlignment(this.elements.tooltip, this.elements.container || this.refs.tooltip.parentNode, this.elements.align);
		} else {
			position = {
				left: 0,
				top: 0
			};
		}

		return position;
	}

});

Tooltip = Lib.runHelpers('react', CONTROL, Tooltip);
Tooltip = React.createClass(Tooltip);

export default Tooltip;
