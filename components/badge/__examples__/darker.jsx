import React from 'react';
import Badge from '~/components/badge';

class Example extends React.Component {
	static displayName = 'BadgeExample';

	render() {
		return <Badge color="inverse">Badge Label</Badge>;
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
