import React from 'react';
import IconSettings from '~/components/icon-settings';
import Tiles from '~/components/tiles';
import Dropdown from '~/components/menu-dropdown';
import TileDetails from '../details';

class Example extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="demo-only" style={{ width: '30rem' }}>
					<Tiles
						title="Salesforce UX"
						dropdownButton={
							<Dropdown
								assistiveText={{ icon: 'More Options' }}
								iconCategory="utility"
								iconName="down"
								iconVariant="border-filled"
								iconSize="x-small"
								onSelect={(value) => {
									console.log('selected: ', value);
								}}
								options={[
									{ label: 'Menu Item One', value: 'A0' },
									{ label: 'Menu Item Two', value: 'B0' },
									{ label: 'Menu Item Three', value: 'C0' },
									{ type: 'divider' },
									{ label: 'Menu Item Four', value: 'D0' },
								]}
							/>
						}
					>
						<TileDetails>
							<dl className="slds-list_horizontal slds-wrap">
								<dt
									className="slds-item_label slds-text-color_weak slds-truncate"
									title="First Label"
								>
									First Label:
								</dt>
								<dd
									className="slds-item_detail slds-truncate"
									title="Description for first label"
								>
									Description for first label
								</dd>
								<dt
									className="slds-item_label slds-text-color_weak slds-truncate"
									title="Second Label"
								>
									Second Label:
								</dt>
								<dd
									className="slds-item_detail slds-truncate"
									title="Description for second label"
								>
									Description for second label
								</dd>
							</dl>
						</TileDetails>
					</Tiles>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'DefaultWithActionsExample'; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
export default Example;
