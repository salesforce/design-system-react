import React from 'react';
import Files from '~/components/files';
import File from '~/components/files/file';
import IconSettings from '~/components/icon-settings';
import Icon from '~/components/icon';

function Example() {
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

Example.displayName = 'filesNoImageExample';

export default Example;
