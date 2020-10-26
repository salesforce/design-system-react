import React from 'react';
import Spinner from '~/components/spinner';

function Example() {
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

Example.displayName = 'SpinnerExample';

export default Example;
