import React from 'react';

import Publisher from '~/components/publishers'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	static displayName = 'PublisherExample';

	render() {
		return <Publisher {...this.props} />;
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
