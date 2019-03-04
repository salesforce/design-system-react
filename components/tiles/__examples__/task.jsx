import React from 'react';
import IconSettings from '~/components/icon-settings';
import Tiles from '~/components/tiles';
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
								<div className="slds-checkbox">
									<input
										type="checkbox"
										name="options"
										id="checkbox-2"
										value="checkbox-2"
									/>
									<label className="slds-checkbox__label" htmlFor="checkbox-2">
										<span className="slds-checkbox_faux" />
										<span className="slds-form-element__label slds-assistive-text">
											Did you complete the task: Contact Trammel Crow Company?
										</span>
									</label>
								</div>
							}
						/>
						<TileMediaBody title="Contact Trammel Crow Company">
							<TileDetails>
								<p className="slds-truncate" title="Assignee">
									Assignee
								</p>
							</TileDetails>
						</TileMediaBody>
					</Tiles>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'TaskExample'; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
export default Example;
