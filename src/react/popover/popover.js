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

export const PopoverMethods = {
	displayName: CONTROL,

	propTypes: {
		alignmentTarget: mountable,
		autoFlip: React.PropTypes.bool,
		container: mountable,
		positionedTargetVerticalAttachment: React.PropTypes.oneOf(Object.keys(Positionable.attatchmentOptions)),
		trigger: React.PropTypes.oneOf(Object.keys(PopoverCore.triggers))
	},

	_setElements () {
		Positionable.setElement(this, this.refs.popover);
		Positionable.setContainer(this, this.props.container || this.element);
		Positionable.setTarget(this, this.props.alignmentTarget || Positionable.getContainer(this));
	},
	
	componentWillMount: function () {
		this.setState({
			isHidden: !this.props.isOpen
		});
	},
	
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			isHidden: !nextProps.isOpen
		});
	},

	componentDidUpdate () {
		Positionable.position(this);
	}
};

let Popover = Lib.merge({}, PopoverCore, PopoverMethods, {
	mixins: [State, Events, genericWillMount],

	render () {
		if (this.refs.popover) {
			this._setElements();
		}

		return (
			<div className={this._getClassNames()} role="dialog" ref="popover">
				<div className="slds-popover__content">
					<div className="slds-popover__body">{this.props.children}</div>
				</div>
			</div>
		);
	}

});

Popover = Lib.runHelpers('react', CONTROL, Popover);
Popover = React.createClass(Popover);

export default Popover;
