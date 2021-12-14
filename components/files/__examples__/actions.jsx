import React from 'react';
import Files from '~/components/files';
import File from '~/components/files/file';
import MoreFiles from '~/components/files/more-files';
import IconSettings from '~/components/icon-settings';
import Icon from '~/components/icon';
import Dropdown from '~/components/menu-dropdown';

class Example extends React.Component {
	static displayName = 'filesLoadingExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Files id="files-with-actions-example">
					<File
						id="file-without-title"
						image="/assets/images/placeholder-img@16x9.jpg"
						hasNoVisibleTitle
						labels={{
							title: 'Proposal.pdf',
						}}
						onClickDownload={() => {
							console.log('Download Button Clicked');
						}}
						moreActionsDropdown={
							<Dropdown
								id="file-more-actions"
								iconCategory="utility"
								iconName="down"
								iconVariant="bare"
								align="right"
								menuStyle={{ minWidth: '50px', width: '125px' }}
								onSelect={(value) => {
									console.log('selected: ', value);
								}}
								options={[
									{ label: 'Menu Item One', value: 'A0' },
									{ label: 'Menu Item Two', value: 'B0' },
								]}
								value="A0"
							/>
						}
					/>
					<File
						id="file-with-title"
						href="https://example.com"
						labels={{
							title: 'Proposal.pdf',
						}}
						icon={<Icon category="doctype" name="pdf" />}
						image="/assets/images/placeholder-img@16x9.jpg"
						onClickDownload={() => {
							console.log('Download Button Clicked');
						}}
						moreActionsDropdown={
							<Dropdown
								id="file-with-title-more-actions"
								iconCategory="utility"
								iconName="down"
								iconVariant="bare"
								align="right"
								menuStyle={{ minWidth: '50px', width: '125px' }}
								onSelect={(value) => {
									console.log('selected: ', value);
								}}
								options={[
									{ label: 'Menu Item One', value: 'A0' },
									{ label: 'Menu Item Two', value: 'B0' },
								]}
								value="A0"
							/>
						}
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
