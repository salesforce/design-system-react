// NOTIFICATION CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import NotificationCore, {CONTROL} from '../../core/notification';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';

// Children
import Button from '../button/button';


// TODO: Internationalize
export const NotificationObject = {
	mixins: [State, Events, genericWillMount],

	displayName: CONTROL,

	propTypes: {
		children: React.PropTypes.string.isRequired,
		theme: React.PropTypes.oneOf(Object.keys(NotificationCore.themes))
	},

	render () {
		const classNames = this._getClassNames();

		return (
			<div className={classNames} role="alert">
				<span className="slds-assistive-text">Info</span>
				<Button
					className="slds-notify__close"
					icon="action.close"
					assistiveText="Close"
					iconStyle="icon-inverse"
					onClick={this.hide} />
				<h2>{this.props.children}</h2>
			</div>
		);
	}
};

let Notification = Lib.merge({}, NotificationCore, NotificationObject);

Notification = Lib.runHelpers('react', CONTROL, Notification);
Notification = React.createClass(Notification);

export default Notification;
