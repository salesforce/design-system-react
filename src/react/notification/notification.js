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

	render () {
		const classNames = NotificationCore._getClassNameByTheme(this.getProperty('theme'));

		return (
			<div className={classNames} role="alert">
				<span className="slds-assistive-text">Info</span>
				<button className="slds-button slds-notify__close">

					<span className="slds-assistive-text">Close</span>
				</button>
				<h2 className="notify-text">{this.props.text}</h2>
			</div>
		);
	}

};

let Notification = Lib.merge({}, NotificationCore, NotificationObject);

Notification = Lib.runHelpers('react', CONTROL, Notification);
Notification = React.createClass(Notification);

export default Notification;
