import React from 'react';
// `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';
import Carousel from '~/components/carousel';

class Example extends React.Component {
	static displayName = 'CheckboxExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<div className="slds-col_padded">
						<Carousel />
					</div>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
