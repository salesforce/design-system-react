import React from 'react';
import IconSettings from '~/components/icon-settings';
import Tiles from '~/components/tiles';
import TileDetails from '../details';

class Example extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="demo-only" style={{ width: '30rem' }}>
					<Tiles title="Company One beats Company Two to the 200-mile affordable electric car">
						<TileDetails>
							<p>by Steve Author</p>
							<ul className="slds-list_horizontal slds-has-dividers_right">
								<li className="slds-item">Breaking News</li>
								<li className="slds-item">1 day ago</li>
							</ul>
						</TileDetails>
					</Tiles>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'ArticleExample'; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
export default Example;
