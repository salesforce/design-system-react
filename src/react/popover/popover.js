// POPOVER CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import PopoverCore, {CONTROL} from '../../core/popover';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';

// Third party
import classNames from 'classnames';

let Popover = Lib.merge({}, PopoverCore, {
	mixins: [State, Events],

	render () {
		let position;

		if (this.refs.popover) {
			this._setElements();
		}

		position = this._popoverPosition();

		return (
			<div className={classNames(this._getClassNames(), {'slds-hidden': !this.props.isOpen})} role="dialog" ref="popover" style={position}>
				<div className="slds-popover__content">
					{this._renderHeader()}
					<div className="slds-popover__body">{this.props.children}</div>
				</div>
			</div>
		);
	},
	
	_renderHeader () {
		if (this.props.header) {
			return (
				<div className="slds-popover__header">
					<p className="slds-text-heading--small">{this.props.header}</p>
				</div>
			);
		}
	},

	componentWillMount () {
		this.elements = {};
	},

	_setElements () {
		this.elements.popover = this.refs.popover;
		this.elements.container = this.props.container;
		this.elements.align = this.props.align;
	},

	_popoverPosition () {
		let position;

		if (this.elements && this.elements.popover) {
			position = this._getElementAlignment(this.elements.popover, this.elements.container || this.refs.popover.parentNode, this.elements.align);
		} else {
			position = {
				left: 0,
				top: 0
			};
		}

		return position;
	}

});

Popover = Lib.runHelpers('react', CONTROL, Popover);
Popover = React.createClass(Popover);

export default Popover;
