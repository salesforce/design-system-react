import React from 'react';
import Files from '~/components/files';

class Example extends React.Component {
	static displayName = 'filesNoImageExample';

	render() {
		return (
			<div style={{ position: 'relative', height: '5rem' }}>
				<div style={{ width: '20rem' }}>
					<Files title="Image Title" type="image" onClick="javascript:void(0);" />
				</div>
			</div>
		);
	}
}

export default Example;
