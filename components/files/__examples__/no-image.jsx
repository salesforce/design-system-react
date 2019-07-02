import React from 'react';
import Files from '~/components/files';
import File from '~/components/files/file';
import IconSettings from '~/components/icon-settings';
import Icon from '~/components/icon';

class Example extends React.Component {
	static displayName = 'filesNoImageExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Files>
					<File
						title="Image Title"
						icon={<Icon category="doctype" name="pdf" />}
						href="javascript:void(0);"
					/>
				</Files>
			</IconSettings>
		);
	}
}

export default Example;
