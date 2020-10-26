import React from 'react';
import Files from '~/components/files';
import File from '~/components/files/file';
import IconSettings from '~/components/icon-settings';
import Icon from '~/components/icon';

function Example() {
	return (
		<IconSettings iconPath="/assets/icons">
			<Files id="files-with-external-icon-example">
				<File
					id="file-with-external-icon"
					labels={{
						title: 'Proposal.pdf',
					}}
					icon={<Icon category="doctype" name="pdf" />}
					externalIcon={<Icon category="utility" name="salesforce1" />}
				/>
			</Files>
		</IconSettings>
	);
}

Example.displayName = 'filesNoImageExample';

export default Example;
