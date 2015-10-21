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

export const PopoverMethods = {

	componentWillMount () {
		this.elements = {};
	},

	_setElements () {
		this.elements.popover = this.refs.popover;
		this.elements.container = this.props.container;
		this.elements.align = this.props.align;
	},

	componentDidUpdate () {
		let position = this.getElementAlignment(this.elements.popover, this.elements.container, this.elements.align);
		const isOffscreen = Lib.isOffscreen(this.elements.popover, true);

		if (isOffscreen === 'top') {
			position = this.getElementAlignment(this.elements.popover, this.elements.container, this.elements.align, 'bottom');
		} else if (isOffscreen === 'bottom') {
			position = this.getElementAlignment(this.elements.popover, this.elements.container, this.elements.align, 'top');
		}

		this.elements.popover.style.top = position.top + 'px';
		this.elements.popover.style.left = position.left + 'px';
		this.elements.popover.className = classNames(this.getClassNames(), {'slds-hidden': this.props.isHidden});
	}

};

let Popover = Lib.merge({}, PopoverCore, PopoverMethods, {
	mixins: [State, Events],

	render () {

		if (this.refs.popover) {
			this._setElements();
		}

		return (
			<div className={classNames(this.getClassNames(), {'slds-hidden': this.props.isHidden})} role="dialog" ref="popover">
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
	}

});

Popover = Lib.runHelpers('react', CONTROL, Popover);
Popover = React.createClass(Popover);

export default Popover;
