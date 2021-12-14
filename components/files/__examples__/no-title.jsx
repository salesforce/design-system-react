import React from 'react';
import Files from '~/components/files';
import File from '~/components/files/file';
import IconSettings from '~/components/icon-settings';

import log from '~/utilities/log';

class Example extends React.Component {
	static displayName = 'filesNoTitleExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Files id="files-with-no-title-example">
					<File
						id="file-with-no-title"
						labels={{
							title: 'Proposal.pdf',
						}}
						hasNoVisibleTitle
						image="/assets/images/placeholder-img@16x9.jpg"
						onClickImage={(event) => {
							event.preventDefault();
							log({
								action: this.props.action,
								event,
								eventName: 'Image Clicked',
							});
						}}
					/>
				</Files>
			</IconSettings>
		);
	}
}

export default Example;
