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
		return (
			<div className={classNames(this._getClassNames(), {'slds-hidden': !this.props.isOpen})} role="dialog" ref="popover" style={this.state.position}>
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

	componentDidMount () {
		this.elements = {};

		this.setElements();
	},

	setElements () {
		this.elements.popover = this.refs.popover;
		this.elements.container = this.props.container;
		this.elements.align = this.props.align;
	},

	componentDidUpdate () {
		// Run this each time the modal opens to account for page changes and scrolling
		if (this.props.isOpen && (this.elements.container !== this.props.container || this.elements.align !== this.props.align)) {
			this.setElements();
			
			const popoverEl = this.elements.popover;
			this._updateElementAllignment(popoverEl, this.elements.container || this.refs.popover.parentNode, this.elements.align);
		}
	}

});

Popover = Lib.runHelpers('react', CONTROL, Popover);
Popover = React.createClass(Popover);

export default Popover;
