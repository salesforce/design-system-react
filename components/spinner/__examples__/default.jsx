import React from 'react';
import Spinner from '~/components/spinner';

class Example extends React.Component {
	static displayName = 'SpinnerExample';

	render() {
		return (
			<div style={{ position: 'relative', height: '5rem' }}>
				<Spinner
					size="small"
					variant="base"
					assistiveText={{ label: 'Main Frame Loading...' }}
				/>
			</div>
		);
	}
}

export default Example;
