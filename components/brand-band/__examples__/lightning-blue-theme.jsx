import React from 'react';
import BrandBand from '~/components/brand-band'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	render() {
		return (
			<BrandBand
				id="brand-band-lightning-blue"
				className="slds-p-around_small"
				theme="lightning-blue"
			>
				<div className="slds-box slds-theme_default">
					<h3 className="slds-text-heading_label slds-truncate">My App</h3>
				</div>
			</BrandBand>
		);
	}
}

Example.displayName = 'BrandBandExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
