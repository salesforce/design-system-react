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
			<div className={classNames(this._getClassNames(), {'slds-hidden': !this.props.isOpen})} role="dialog" ref="popover">
				<div className="slds-popover__content">
					{this._renderHeader()}
					<div className="slds-popover__body">{this.props.content}</div>
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

		this.elements.popover = this.refs.popover;
		this.elements.target = this.props.target ? this.props.target : this.refs.popover.parentNode;
		this.elements.container = this.props.container ? this.props.container : this.refs.popover.parentNode;
		this.elements.align = this.props.align ? this.props.align : this.elements.target;
	},

	componentDidUpdate () {
		let popoverEl;
		let position;

		if (this.props.isOpen) {// Run this each time the modal opens to account for page changes and scrolling
			popoverEl = this.elements.popover;
			position = this._getElementAllignment(popoverEl, this.elements.container, this.elements.align);

			popoverEl.style.top = position.top + 'px';
			popoverEl.style.left = position.left + 'px';
		}
	}

});

Popover = Lib.runHelpers('react', CONTROL, Popover);
Popover = React.createClass(Popover);

export default Popover;
