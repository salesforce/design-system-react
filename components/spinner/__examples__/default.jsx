import React from 'react';
import createReactClass from 'create-react-class';
import Spinner from '~/components/slider';

class Example extends React.Component {
	static displayName = 'SpinnerExample';

	render () {
		return (
			<div style={{ position: 'relative', height: '5rem' }}>
				<Spinner
					size="small"
					variant="base"
					assistiveText={{ label: 'Small spinner' }}
				/>
			</div>
		);
	}
}

export default Example;
