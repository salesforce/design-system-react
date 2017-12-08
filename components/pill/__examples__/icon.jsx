import React from 'react';
import createReactClass from 'create-react-class';

import Pill from '~/components/pill';
import Icon from '~/components/icon';
import Avatar from '~/components/avatar';
import IconSettings from '~/components/icon-settings';

function noop () {
}

const Example = createReactClass({
	displayName: 'PillWithIconExample',

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid_pull-padded-medium">
					<div className="slds-p-horizontal_medium">
						<Pill
							labels={{
								label: 'Pill Label',
								title: 'Full pill label verbiage mirrored here',
								removeTitle: 'Remove'
							}}
							icon={
								<Icon
									title="Account"
									category="standard"
									name="account"
								/>
							}
							onClick={noop}
							onRemove={noop}
						/>
					</div>
					<div className="slds-p-horizontal_medium">
						<Pill
							labels={{
								label: 'Pill Label',
								title: 'Full pill label verbiage mirrored here',
								removeTitle: 'Remove'
							}}
							avatar={
								<Avatar
									variant="user"
									title="User avatar"
									imgSrc="https://lightningdesignsystem.com/assets/images/avatar2.jpg"
								/>
							}
							onClick={noop}
							onRemove={noop}
						/>
					</div>
					<div className="slds-p-horizontal_medium">
						<Pill
							labels={{
								label: 'Pill Label',
								title: 'Full pill label verbiage mirrored here',
								removeTitle: 'Remove'
							}}
							hasError
							icon={
								<Icon
									title="Error"
									category="utility"
									name="warning"
									className="slds-icon-text-error"
								/>
							}
							onClick={noop}
							onRemove={noop}
						/>
					</div>
				</div>
			</IconSettings>
		);
	}
});
export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
