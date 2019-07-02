import React from 'react';
import Files from '~/components/files';
import File from '~/components/files/file';
import IconSettings from '~/components/icon-settings';
import Icon from '~/components/icon';

class Example extends React.Component {
	static displayName = 'filesLoadingExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Files id="files-loading-example">
					<File id="file-without-title-loading" href="javascript:void(0);" isLoading />
					<File
						id="file-with-title-loading"
						href="javascript:void(0);"
						icon={<Icon category="doctype" name="image" />}
						isLoading
						title="Image Title"
						type="image"
					/>
				</Files>
			</IconSettings>
		);
	}
}

export default Example;
