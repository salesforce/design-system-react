import IconSettings from '../../icon-settings';
import PageHeader from '../';
import Icon from '../../icon';
import Button from '../../button';
import ButtonGroup from '../../button-group';

export default {
	title: 'Components/PageHeader',
	component: PageHeader,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['base', 'object-home', 'record-home', 'related-list'],
		},
	},
};

// Base variant
export const Base = {
	render: () => (
		<PageHeader
			icon={<Icon category="standard" name="opportunity" size="large" />}
			title="Rohde Corp - 80,000 Widgets"
			label="Opportunity"
			info="Mark Jaeckal • Unlimited Customer • 11/13/15"
		/>
	),
};

// Object home variant
export const ObjectHome = {
	render: () => (
		<PageHeader
			variant="object-home"
			icon={<Icon category="standard" name="opportunity" size="large" />}
			title="Opportunities"
			info="10 items • Updated 13 minutes ago"
			onRenderActions={() => (
				<ButtonGroup>
					<Button label="New" variant="neutral" />
					<Button label="Import" variant="neutral" />
				</ButtonGroup>
			)}
			onRenderControls={() => (
				<ButtonGroup>
					<Button
						assistiveText={{ icon: 'Chart' }}
					iconCategory="utility"
					iconName="chart"
						iconVariant="border"
					variant="icon"
				/>
					<Button
						assistiveText={{ icon: 'Filter List' }}
					iconCategory="utility"
					iconName="filterList"
						iconVariant="border"
					variant="icon"
					/>
				</ButtonGroup>
			)}
		/>
	),
};

// Record home variant
export const RecordHome = {
	render: () => (
		<PageHeader
			variant="record-home"
			icon={<Icon category="standard" name="opportunity" size="large" />}
			title="Acme - 1,200 Widgets"
			label="Opportunity"
			details={[
				{ label: 'Account', content: 'Acme' },
				{ label: 'Amount', content: '$25,000.00' },
				{ label: 'Close Date', content: '11/30/2016' },
			]}
			onRenderActions={() => (
				<ButtonGroup>
					<Button label="Follow" variant="neutral" />
					<Button label="Edit" variant="neutral" />
					<Button label="Delete" variant="neutral" />
				</ButtonGroup>
			)}
		/>
	),
};

// Related list variant
export const RelatedList = {
	render: () => (
		<PageHeader
			variant="related-list"
			icon={<Icon category="standard" name="contact" size="large" />}
			title="Contacts"
			label="Acme"
			trail={[
				<a key="1" href="#" onClick={(e) => e.preventDefault()}>
					Accounts
				</a>,
				<a key="2" href="#" onClick={(e) => e.preventDefault()}>
					Acme
				</a>,
			]}
			info="10 items • Sorted by Name"
			onRenderActions={() => (
				<ButtonGroup>
					<Button label="Add Contact" variant="neutral" />
				</ButtonGroup>
			)}
		/>
	),
};

// Joined with DataTable
export const Joined = {
	render: () => (
		<PageHeader
			variant="object-home"
			joined
			icon={<Icon category="standard" name="account" size="large" />}
			title="Accounts"
			info="12 items"
		/>
	),
};
