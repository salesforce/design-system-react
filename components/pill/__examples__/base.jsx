import React from 'react';
import createReactClass from 'create-react-class';
import Pill from '~/components/pill';
import IconSettings from '~/components/icon-settings';

function noop () {
}

const Example = createReactClass({
	displayName: 'PillExample',

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
							onRemove={noop}
						/>
					</div>
					<div className="slds-p-horizontal_medium">
						<div style={{ width: '220px', position: 'relative' }}>
							<div className="slds-pill_container">
								<Pill
									labels={{
										label: 'Pill label that is longer than the area that contains it',
										removeTitle: 'Remove'
									}}
									onClick={noop}
									onRemove={noop}
								/>
							</div>
						</div>
					</div>
				</div>
			</IconSettings>
		);
	}
});
export default Example;
