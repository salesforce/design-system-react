/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

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
