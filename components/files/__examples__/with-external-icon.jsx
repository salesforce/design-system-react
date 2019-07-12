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
}

export default Example;
