import React from 'react';
import Files from '~/components/files';

class Example extends React.Component {
	static displayName = 'filesLoadingExample';

	render() {
		return (
			<div style={{ position: 'relative', display: 'flex', height: '5rem' }}>
				<div style={{ width: '20rem', padding: '1rem' }}>
					<Files
						id="file-without-title"
						onClick="javascript:void(0);"
						isLoading
					/>
				</div>
				<div style={{ width: '20rem', padding: '1rem' }}>
					<Files
						id="file-with-title"
						onClick="javascript:void(0);"
						isLoading
						title="Image Title"
						type="image"
					/>
				</div>
			</div>
		);
	}
}

export default Example;
