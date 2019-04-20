import React from 'react';
import Files from '~/components/files';

class Example extends React.Component {
	static displayName = 'filesNoTitleExample';

	render() {
		return (
			<div style={{ position: 'relative', height: '5rem' }}>
				<div style={{ width: '20rem' }}>
					<Files
						image="/assets/images/placeholder-img@16x9.jpg"
						onClick="javascript:void(0);"
					/>
				</div>
			</div>
		);
	}
}

export default Example;
