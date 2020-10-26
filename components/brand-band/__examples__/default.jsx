import React from 'react';
import BrandBand from '~/components/brand-band'; // `~` is replaced with design-system-react at runtime

function Example() {
	return <BrandBand id="brand-band-default" />;
}

Example.displayName = 'BrandBandExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
