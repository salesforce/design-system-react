import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { ICON } from '../../utilities/constants';
import { Icon, Input } from '../../components';


const DemoBackgroundColor = React.createClass({
	displayName: 'DemoBackgroundColor',

	getInitialState () {
		return {
			backgroundColor: 'teal'
		};
	},

	onChange (event) {
		this.setState({ backgroundColor: event.target.value });
	},

	render () {
		return (
			<div>
				<Input
					label="Enter new background-color"
					placeholder="goldenrod, rba(123, 123, 123), #54CABB, etc..."
					onChange={this.onChange}
				/>
				<hr />
				<Icon
					assistiveText="Accounts"
					backgroundColor={this.state.backgroundColor}
					category="standard"
					name="account"
					title="This is a title"
				/>
			</div>
		);
	}
});

storiesOf(ICON, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base: Standard', () => (
		<Icon
			assistiveText="Accounts"
			category="standard"
			name="account"
			title="This is a title"
		/>
	))
	.add('Base: Standard (inverse)', () => (
		<Icon
			assistiveText="Accounts"
			category="standard"
			name="account"
			title="This is a title"
			inverse
		/>
	))
	.add('Base: Standard (custom background)', () => (
		<DemoBackgroundColor />
	))
	.add('Base: Utility', () => (
		<Icon
			assistiveText="Announcement"
			category="utility"
			name="announcement"
			title="Announcement Icon"
		/>
	))
	.add('Base: Utility (inverse)', () => (
		<div style={{ backgroundColor: 'goldenrod', padding: '10px' }}>
			<Icon
				assistiveText="Announcement"
				category="utility"
				name="announcement"
				inverse
			/>
		</div>
	))
	.add('Base: Utility (no assistive)', () => (
		<Icon
			category="utility"
			name="announcement"
		/>
	))
	.add('Base: Action', () => (
		<Icon
			assistiveText="Description"
			category="action"
			name="description"
			size="small"
		/>
	))
	.add('Base: Doctype', () => (
		<Icon
			assistiveText="XML"
			category="doctype"
			name="xml"
		/>
	))
	.add('Base: Custom', () => (
		<Icon
			assistiveText="I think it's a leaf"
			category="custom"
			name="custom5"
		/>
	))
	.add('Size: X-Small', () => (
		<Icon
			assistiveText="Warning Icon"
			category="utility"
			name="warning"
			size="x-small"
		/>
	))
	.add('Size: Small', () => (
		<Icon
			assistiveText="Case Icon"
			category="standard"
			name="case"
			size="small"
		/>
	))
	.add('Size: Medium (default)', () => (
		<Icon
			assistiveText="Case Icon"
			category="standard"
			name="case"
		/>
	))
	.add('Size: Large', () => (
		<Icon
			assistiveText="Case Icon"
			category="standard"
			name="case"
			size="large"
		/>
	));
