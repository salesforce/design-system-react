import React from 'react';
import BrandBand from '~/components/brand-band'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	render() {
		return (
			<BrandBand
				className="custom-brand-band-class"
				id="brand-band-large"
				size="large"
			>
				<span className="slds-assistive-text">Hello World!</span>
			</BrandBand>
		);
	}
}

Example.displayName = 'BrandBandExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
