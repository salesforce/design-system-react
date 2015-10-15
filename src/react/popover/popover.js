// RADIO CONTROL - REACT FACADE

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
		const elementClass = classNames('slds-popover slds-popover-target ' + this._getNubbinClass(), {
			'slds-hide': !this.props.isOpen
		});
		let header;

		if (this.props.header) {
			header = (
				<div className="slds-popover__header">
					<p className="slds-text-heading--small">{this.props.header}</p>
				</div>
			);
		}

		return (
			<div className={elementClass} role="dialog" ref="popover">
				<div className="slds-popover__content">
					{header}
					<div className="slds-popover__body">{this.props.content}</div>
				</div>
			</div>
		);
	},

	componentDidUpdate () {
		const popoverEl = this.refs.popover;
		const position = this._getElementRelativePosition(popoverEl, this.props.target);

		popoverEl.style.top = position.top + 'px';
		popoverEl.style.left = position.left + 'px';
	}

});

Popover = Lib.runHelpers('react', CONTROL, Popover);
Popover = React.createClass(Popover);

export default Popover;
