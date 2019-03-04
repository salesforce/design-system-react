import React from 'react';
import IconSettings from '~/components/icon-settings';
import Tiles from '~/components/tiles';
import Icon from '~/components/icon'; // `~` is replaced with design-system-react at runtime
import TileDetails from '../details';
import TileMediaFigure from '../mediaFigure';
import TileMediaBody from '../mediaBody';

class Example extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="demo-only" style={{ width: '30rem' }}>
					<Tiles variant="media">
						<TileMediaFigure
							mediaFigure={
								<Icon
									assistiveText={{ label: 'Description of icon' }}
									category="action"
									name="description"
									size="small"
								/>
							}
						/>
						<TileMediaBody title="Salesforce UX">
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
						</TileMediaBody>
					</Tiles>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'IconExample'; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
export default Example;
