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
					<File
						id="file-without-title-loading"
						hasNoVisibleTitle
						labels={{
							title: 'Proposal.pdf',
						}}
						isLoading
					/>
					<File
						id="file-with-title-loading"
						icon={<Icon category="doctype" name="image" />}
						isLoading
						labels={{
							title: 'Proposal.pdf',
						}}
					/>
				</Files>
			</IconSettings>
		);
	}
}

export default Example;
