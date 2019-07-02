import React from 'react';
import Files from '~/components/files';
import File from '~/components/files/file';
import MoreFiles from '~/components/files/more-files';
import IconSettings from '~/components/icon-settings';
import Icon from '~/components/icon';

class Example extends React.Component {
	static displayName = 'filesLoadingExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Files id="files-with-actions-example">
					<File
						id="file-without-title"
						image="/assets/images/placeholder-img@16x9.jpg"
						onClickDownload={() => {
							console.log('Download Button Clicked');
						}}
						onClickMoreActions={() => {
							console.log('Download Button Clicked');
						}}
					/>
					<File
						id="file-with-title"
						href="javascript:void(0);"
						title="Image Title"
						icon={<Icon category="doctype" name="pdf" />}
						image="/assets/images/placeholder-img@16x9.jpg"
						onClickDownload={() => {
							console.log('Download Button Clicked');
						}}
						onClickMoreActions={() => {
							console.log('Download Button Clicked');
						}}
					/>
					<MoreFiles
						id="more-file-card"
						count="22+"
						image="/assets/images/placeholder-img@16x9.jpg"
					/>
				</Files>
			</IconSettings>
		);
	}
}

export default Example;
