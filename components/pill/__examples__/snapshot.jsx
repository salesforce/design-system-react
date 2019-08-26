import React from 'react';

import IconSettings from '~/components/icon-settings';
import Pill from '~/components/pill'; // `~` is replaced with design-system-react at runtime
import Icon from '~/components/icon';
import Avatar from '~/components/avatar';

function noop() {}

class Example extends React.Component {
	static displayName = 'PillExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div
					className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center"
					role="listbox"
				>
					<div className="slds-col_padded">
						<Pill
							labels={{
								label: 'Pill Label',
								title: 'Full pill label verbiage mirrored here',
								removeTitle: 'Remove',
							}}
							onClick={noop}
							onRemove={noop}
						/>
					</div>
					<div className="slds-col_padded">
						<Pill
							labels={{
								label: 'Pill Label',
								title: 'Full pill label verbiage mirrored here',
								removeTitle: 'Remove',
							}}
							onRemove={noop}
						/>
					</div>
					<div className="slds-col_padded">
						<Pill
							labels={{
								label: 'Pill Label',
								title: 'Full pill label verbiage mirrored here',
								removeTitle: 'Remove',
							}}
							icon={<Icon title="Account" category="standard" name="account" />}
							onClick={noop}
							onRemove={noop}
						/>
					</div>
					<div className="slds-col_padded">
						<Pill
							labels={{
								label: 'Pill Label',
								title: 'Full pill label verbiage mirrored here',
								removeTitle: 'Remove',
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
					<div className="slds-col_padded">
						<Pill
							labels={{
								label: 'Pill Label',
								title: 'Full pill label verbiage mirrored here',
								removeTitle: 'Remove',
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
					<div className="slds-col_padded">
						<Pill
							labels={{
								label: 'Pill Label',
								title: 'Full pill label verbiage mirrored here',
								removeTitle: 'Remove',
							}}
							assistiveText={{
								remove: 'Press delete or backspace to remove',
							}}
							bare
							variant="option"
							tabIndex="0"
							aria-selected="true"
							onRemove={noop}
						/>
					</div>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
