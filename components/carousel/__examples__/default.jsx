import React from 'react';
// `~` is replaced with design-system-react at runtime
import Carousel from '~/components/carousel';

class Example extends React.Component {
	static displayName = 'CheckboxExample';

	render() {
		return (
			<div style={{ width: '480px', maxWidth: '100%' }}>
				<Carousel />
			</div>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
