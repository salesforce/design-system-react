/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

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
	},
	
	hide () {
		this.setState({
			hidden: this.cssClasses.HIDDEN
		});
	}
};

let Notification = Lib.merge({}, NotificationCore, NotificationObject);

Notification = Lib.runHelpers('react', CONTROL, Notification);
Notification = React.createClass(Notification);

export default Notification;
