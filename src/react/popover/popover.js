// POPOVER CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import PopoverCore, {CONTROL} from '../../core/popover';
import Positionable from '../../traits/positionable';

// Framework specific
import React from 'react';
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
		positionedTargetVerticalAttachment: React.PropTypes.oneOf(Object.keys(Positionable.attatchmentOptions))
	},

	_popoverRendered (element) {
		this.state.popoverElement = element;
	},

	render () {
		return (
			<div className={this._getClassNames()} role="dialog" ref={this._popoverRendered}>
				<div className="slds-popover__content">
					<div className="slds-popover__body">{this.props.children}</div>
				</div>
			</div>
		);
	},

	_setPositionableElements () {
		Positionable.setElement(this, this.state.popoverElement);
		Positionable.setContainer(this, this.props.container);
		Positionable.setTarget(this, this.props.alignmentTarget);
	},

	componentWillMount: function () {
		this.setState({
			isOpen: this.props.isOpen
		});
	},
	
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			isOpen: nextProps.isOpen
		});
	},

	componentDidUpdate () {
		if (this.state.popoverElement && this.props.alignmentTarget && this.props.container) {
			this._setPositionableElements();
			Positionable.position(this);
		}
	}
};

let Popover = Lib.merge({}, PopoverCore, PopoverObject);
Popover = Lib.runHelpers('react', CONTROL, Popover);
Popover = React.createClass(Popover);

export default Popover;
