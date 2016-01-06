// POPOVER CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import TooltipCore, {CONTROL} from '../../core/tooltip';

// Inherited functionality from popover
import { PopoverObject } from '../popover/popover';
import Positionable from '../../traits/positionable';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';
import mountable from '../mixins/custom-prop-types/mountable';

let Tooltip = Lib.merge({}, TooltipCore, PopoverObject, {
	displayName: CONTROL,

	propTypes: {
		alignmentTarget: mountable,
		container: mountable,
		isOpen: React.PropTypes.bool,
		modal: React.PropTypes.bool,
		positionedTargetVerticalAttachment: React.PropTypes.oneOf(Object.keys(Positionable.attatchmentOptions))
	},

	mixins: [State, Events, genericWillMount],

	componentWillMount () {
		this.setState({
			isOpen: this.props.isOpen
		});

		Positionable.setElement(this, Positionable.attachPositionedElementToBody({attributes: [['role', 'tooltip']]}));
	},

	render () {
		return false;
	}

});

Tooltip = Lib.runHelpers('react', CONTROL, Tooltip);
Tooltip = React.createClass(Tooltip);

export default Tooltip;
