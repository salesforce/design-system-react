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
				<Files id="files-with-no-image-example">
					<File
						id="file-with-no-image"
						labels={{
							title: 'Proposal.pdf',
						}}
						icon={<Icon category="doctype" name="pdf" />}
					/>
				</Files>
			</IconSettings>
		);
	}
}

export default Example;
