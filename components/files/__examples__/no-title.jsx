import React from 'react';
import Files from '~/components/files';
import File from '~/components/files/file';
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	static displayName = 'filesNoTitleExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Files>
					<File
						image="/assets/images/placeholder-img@16x9.jpg"
						href="javascript:void(0);"
					/>
				</Files>
			</IconSettings>
		);
	}
}

export default Example;
