import IconSettings from '../../icon-settings';
import Breadcrumb from '../';

export default {
	title: 'Components/Breadcrumb',
	component: Breadcrumb,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
};

// Two items
export const TwoItems = {
	render: () => (
		<Breadcrumb
			trail={[
				<a href="#" key="parent">
					Parent Entity
				</a>,
				<a href="#" key="child">
					Child Entity
				</a>,
			]}
		/>
	),
};

// Single item
export const OneItem = {
	render: () => (
		<Breadcrumb
			trail={[
				<a href="#" key="single">
					Parent Entity
				</a>,
			]}
		/>
	),
};

// Multiple items
export const MultipleItems = {
	render: () => (
		<Breadcrumb
			trail={[
				<a href="#" key="home">
					Home
				</a>,
				<a href="#" key="accounts">
					Accounts
				</a>,
				<a href="#" key="acme">
					Acme Corp
				</a>,
				<a href="#" key="contacts">
					Contacts
				</a>,
			]}
		/>
	),
};

// With custom assistive text
export const CustomAssistiveText = {
	render: () => (
		<Breadcrumb
			assistiveText={{ label: 'You are here:' }}
			trail={[
				<a href="#" key="parent">
					Parent Entity
				</a>,
				<a href="#" key="child">
					Child Entity
				</a>,
			]}
		/>
	),
};

// With custom styles
export const CustomStyles = {
	render: () => (
		<Breadcrumb
			styleContainer={{ backgroundColor: '#f3f3f3', padding: '10px', borderRadius: '4px' }}
			trail={[
				<a href="#" key="home">
					Home
				</a>,
				<a href="#" key="library">
					Library
				</a>,
				<a href="#" key="data">
					Data
				</a>,
			]}
		/>
	),
};
