import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import PageHeader from '~/components/page-header'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';
import ButtonGroup from '~/components/button-group';
import ButtonStateful from '~/components/button-stateful';
import Dropdown from '~/components/menu-dropdown';

const Example = createReactClass({
	displayName: 'PageHeaderExample',

	render () {
		const contentRight = (
			<div>
				<ButtonStateful
					key="PageHeaderFollowButton"
					iconSize="medium"
					stateOne={{ iconName: 'add', label: 'Follow' }}
					stateTwo={{ iconName: 'check', label: 'Following' }}
					stateThree={{ iconName: 'close', label: 'Unfollow' }}
				/>
				<ButtonGroup>
					<Button label="Edit" />
					<Button label="Delete" />
					<Button label="Clone" />
					<Dropdown
						align="right"
						assistiveText={{ icon: 'More Options' }}
						iconCategory="utility"
						iconName="down"
						iconVariant="border-filled"
						options={[
							{ label: 'Menu Item One', value: 'A0' },
							{ label: 'Menu Item Two', value: 'B0' },
							{ label: 'Menu Item Three', value: 'C0' },
							{ type: 'divider' },
							{ label: 'Menu Item Four', value: 'D0' },
						]}
					/>
				</ButtonGroup>
			</div>
		);

		const details = [
			{
				label: 'Field 1',
				content:
					'Description that demonstrates truncation with content. Description that demonstrates truncation with content.',
				truncate: true,
			},
			{ label: 'Field 2', content: 'Multiple Values' },
			{
				label: 'Field 3',
				content: <a href="javascript:void(0);">Hyperlink</a>,
			},
			{
				label: 'Field 4',
				content: 'Description (2-line truncation)',
				truncate: true,
			},
		];

		return (
			<IconSettings iconPath="/assets/icons">
				<PageHeader
					contentRight={contentRight}
					details={details}
					iconAssistiveText={{ icon: 'User' }}
					iconCategory="standard"
					iconName="user"
					label="Record Type"
					title="Record Title"
					variant="recordHome"
				/>
			</IconSettings>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
