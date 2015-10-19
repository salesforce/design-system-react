// NOTIFICATION CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import NotificationCore, {CONTROL} from '../../core/notification';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';

// TODO: Internationalize
export const NotificationObject = {
	mixins: [State, Events, genericWillMount],

	propTypes: {
		children: React.PropTypes.string.isRequired,
		theme: React.PropTypes.string
	},

	render () {
		const classNames = this._getClassNames();

		return (
			<div className={classNames} role="alert">
				<span className="slds-assistive-text">Info</span>
				<button className="slds-button slds-notify__close" onClick={this.hide}>
					<svg aria-hidden="true" className="slds-button__icon slds-button__icon--inverse">
						<use xlinkHref="/assets/design-system/icons/action-sprite/svg/symbols.svg#close"></use>
					</svg>
					<span className="slds-assistive-text">Close</span>
				</button>
				<h2 className="notify-text">{this.props.children}</h2>
			</div>
		);
	}
};

let Notification = Lib.merge({}, NotificationCore, NotificationObject);

Notification = Lib.runHelpers('react', CONTROL, Notification);
Notification = React.createClass(Notification);

export default Notification;
