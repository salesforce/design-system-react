import React from 'react';

import Radio from '~/components/radio'; // `~` is replaced with design-system-react at runtime

function Example() {
	return <Radio id="radioId2" labels={{ label: 'Radio Label' }} disabled />;
}

Example.displayName = 'RadioExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
