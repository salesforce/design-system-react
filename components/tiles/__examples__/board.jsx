import React from 'react';
import IconSettings from '~/components/icon-settings';
import Tiles from '~/components/tiles';
import TileDetails from '../details';

class Example extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="demo-only" style={{ width: '30rem' }}>
					<ul className="slds-has-dividers_around-space">
						<li className="slds-item">
							<Tiles title="Anypoint Connectors">
								<TileDetails>
									<p className="slds-text-heading_medium">$500,000</p>
									<p className="slds-truncate" title="Company One">
										Company One
									</p>
									<p className="slds-truncate" title="Closing 9/30/2015">
										Closing 9/30/2015
									</p>
								</TileDetails>
							</Tiles>
						</li>
						<li className="slds-item">
							<Tiles title="600 Widgets">
								<TileDetails>
									<p className="slds-text-heading_medium">$35,000</p>
									<p className="slds-truncate" title="Company Three">
										Company Three
									</p>
									<p className="slds-truncate" title="Closing 10/12/2015">
										Closing 10/12/2015
									</p>
								</TileDetails>
							</Tiles>
						</li>
					</ul>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'ArticleExample'; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
export default Example;
