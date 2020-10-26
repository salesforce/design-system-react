import React from 'react';

import Radio from '~/components/radio'; // `~` is replaced with design-system-react at runtime

function Example() {
	return <Radio id="radioId1" labels={{ label: 'Radio Label' }} />;
}

Example.displayName = 'RadioExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
