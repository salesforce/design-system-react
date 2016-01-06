// POPOVER CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import PopoverCore, {CONTROL} from '../../core/popover';

// Traits
import Positionable from '../../traits/positionable';
import Openable from '../../traits/openable';

// Framework specific
import React from 'react';
import ReactDOM from 'react-dom';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';
import mountable from '../mixins/custom-prop-types/mountable';

export const PopoverObject = {
	mixins: [State, Events, genericWillMount],
	displayName: CONTROL,

	propTypes: {
		alignmentTarget: mountable,
		autoFlip: React.PropTypes.bool,
		container: mountable,
		modal: React.PropTypes.bool,
		positionedTargetVerticalAttachment: React.PropTypes.oneOf(Object.keys(Positionable.attatchmentOptions))
	},

	_renderPopoverContent () {
		return (
				<div className="slds-popover__content">
					<div className="slds-popover__body">{this.props.children}</div>
				</div>
		);
	},

	// This function renders popover as an absolutely-positioned `div` based on the target. If the property `modal` is true, then the listeners will be created for scrolling and resizing.
	_renderModalPopover () {
		Positionable.setContainer(this, this.props.container || document.querySelector('body'));
		Positionable.setTarget(this, this.props.alignmentTarget || document.querySelector('body'));

		const isOpen = Openable.isOpen(this);
		if (this.props.modal && isOpen) {
			Positionable.addEventListeners(this);
		} else if (this.props.modal && !isOpen) {
			Positionable.removeEventListeners(this);
		}

		// `_setControlElement` is part of the `genericWillMount` mixin.
		this._setControlElement(Positionable.getElement(this));

		const popoverContent = this._renderPopoverContent();
		ReactDOM.render(popoverContent, Positionable.getElement(this));
		Positionable.position(this);
	},

	// The real render occurs within `_renderModalPopover`.
	render () {
		return false;
	},

	_onOpened () {
		Positionable.show(this);
	},

	_onClosed () {
		Positionable.hide(this);
	},

	componentWillMount () {
		this.setState({
			isOpen: this.props.isOpen
		});

		Positionable.setElement(this, Positionable.attachPositionedElementToBody({attributes: [['role', 'dialog']]}));
	},

	componentWillUnmount () {
		if (this.props.modal) {
			Positionable.removeEventListeners(this);
		}
	},
	
	componentWillReceiveProps (nextProps) {
		this.setState({
			isOpen: nextProps.isOpen
		});
	},

	componentDidUpdate () {
		this._renderModalPopover();
	}
};

let Popover = Lib.merge({}, PopoverCore, PopoverObject);
Popover = Lib.runHelpers('react', CONTROL, Popover);
Popover = React.createClass(Popover);

export default Popover;
