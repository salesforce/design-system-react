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
				<Files id="files-with-crop-example">
					<File
						id="file-crop-1-1"
						labels={{
							title: 'Proposal.pdf',
						}}
						icon={<Icon category="doctype" name="pdf" />}
						image="/assets/images/placeholder-img@16x9.jpg"
						crop="1-by-1"
					/>
					<File
						id="file-crop-16-9"
						labels={{
							title: 'Proposal.pdf',
						}}
						icon={<Icon category="doctype" name="pdf" />}
						image="/assets/images/placeholder-img@16x9.jpg"
						crop="16-by-9"
					/>
					<File
						id="file-crop-4-3"
						labels={{
							title: 'Proposal.pdf',
						}}
						icon={<Icon category="doctype" name="pdf" />}
						image="/assets/images/placeholder-img@16x9.jpg"
						href="https://example.com"
						crop="4-by-3"
					/>
				</Files>
			</IconSettings>
		);
	}
}

export default Example;
