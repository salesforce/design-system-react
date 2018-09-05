import React from 'react';
import BrandBand from '~/components/brand-band'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	render() {
		return <BrandBand id="brand-band-lightning-blue" theme="lightning-blue" />;
	}
}

Example.displayName = 'BrandBandExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
