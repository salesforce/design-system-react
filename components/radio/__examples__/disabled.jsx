import React from 'react';

import Radio from '~/components/radio'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	static displayName = 'RadioExample';

	render() {
		return <Radio id="radioId2" labels={{ label: 'Radio Label' }} disabled />;
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
