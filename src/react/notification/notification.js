// NOTIFICATION CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import NotificationCore, {CONTROL} from '../../core/notification';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';

export const NotificationObject = {
	mixins: [State, Events, genericWillMount],

	propTypes: {
		text: React.PropTypes.string
	},

	getInitialState () {
		return {
			hidden: false
		};
	},

	render () {
		const classNames = NotificationCore._getClassNameByTheme(this.getProperty('theme'), this.state.hidden);

		return (
			<div className={classNames} role="alert">
				<span className="slds-assistive-text">Info</span>
				<button className="slds-button slds-notify__close" onClick={this.hide}>
					<svg aria-hidden="true" className="slds-button__icon slds-button__icon--inverse">
						<use xlinkHref="/examples/assets/icons/action-sprite/svg/symbols.svg#close"></use>
					</svg>
					<span className="slds-assistive-text">Close</span>
				</button>
				<h2 className="notify-text">{this.props.text}</h2>
			</div>
		);
	},

	show () {
		this.setState({ hidden: false });
	},

	hide () {
		this.setState({ hidden: true });
	}
};

let Notification = Lib.merge({}, NotificationCore, NotificationObject);

Notification = Lib.runHelpers('react', CONTROL, Notification);
Notification = React.createClass(Notification);

export default Notification;
