import React from 'react';
import Files from '~/components/files';
import File from '~/components/files/file';
import IconSettings from '~/components/icon-settings';
import Icon from '~/components/icon';

class Example extends React.Component {
	static displayName = 'filesExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Files id="files-default-example">
					<File
						id="file-default-example"
						labels={{
							title: 'Proposal.pdf',
						}}
						assistiveText={{
							image: 'Placeholder image',
						}}
						icon={<Icon category="doctype" name="pdf" />}
						image="/assets/images/placeholder-img@16x9.jpg"
					/>
				</Files>
			</IconSettings>
		);
	}
}

export default Example;
