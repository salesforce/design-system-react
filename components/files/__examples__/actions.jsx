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
						image="/assets/images/placeholder-img@16x9.jpg"
						downloadLink="aaa"
					/>
				</div>
				<div style={{ width: '20rem', padding: '1rem' }}>
					<Files
						id="file-with-title"
						onClick="javascript:void(0);"
						title="Image Title"
						type="image"
						image="/assets/images/placeholder-img@16x9.jpg"
						downloadLink="aaa"
					/>
				</div>
			</div>
		);
	}
}

export default Example;
