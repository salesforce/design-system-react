import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';  // `~` is replaced with design-system-react at runtime
import Modal from '~/components/modal'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button'; // `~` is replaced with design-system-react at runtime
import Combobox from '~/components/combobox'; // `~` is replaced with design-system-react at runtime
import Datepicker from '~/components/date-picker'; // `~` is replaced with design-system-react at runtime
import Icon from '~/components/icon'; // `~` is replaced with design-system-react at runtime
import Input from '~/components/forms/input'; // `~` is replaced with design-system-react at runtime
import Textarea from '~/components/forms/textarea'; // `~` is replaced with design-system-react at runtime
import Timepicker from '~/components/time-picker'; // `~` is replaced with design-system-react at runtime

const accounts = [
	{ id: '1', label: 'Acme', subTitle: 'Account • San Francisco', type: 'account' },
	{ id: '2', label: 'Salesforce.com, Inc.', subTitle: 'Account • San Francisco', type: 'account' },
	{ id: '3', label: 'Paddy\'s Pub', subTitle: 'Account • Boston, MA', type: 'account' },
	{ id: '4', label: 'Tyrell Corp', subTitle: 'Account • San Francisco, CA', type: 'account' },
	{ id: '5', label: 'Paper St. Soap Company', subTitle: 'Account • Beloit, WI', type: 'account' },
	{ id: '6', label: 'Nakatomi Investments', subTitle: 'Account • Chicago, IL', type: 'account' },
	{ id: '7', label: 'Acme Landscaping', type: 'account' },
	{ id: '8', label: 'Acme Construction', subTitle: 'Account • Grand Marais, MN', type: 'account' }
];

const accountsWithIcon = accounts.map((elem) => Object.assign(elem, {
	icon: <Icon
		assistiveText="Account"
		category="standard"
		name={elem.type}
	/> })
);

class Example extends React.Component {
	static displayName = 'ModalExample';

	state = {
		isOpen: false
	};

	toggleOpen = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<Button label="Open modal with menu contents" onClick={this.toggleOpen} />
					<Modal
						isOpen={this.state.isOpen}
						footer={[
							<Button key="cancel" label="Cancel" onClick={this.toggleOpen} />,
							<Button key="save" label="Save" variant="brand" onClick={this.toggleOpen} />
						]}
						onRequestClose={this.toggleOpen}
						title="New Opportunity"
						{...this.props}
					>
						<div className="slds-form_stacked slds-p-around_medium">
							<Input
								id="unique-id-1"
								label="Opportunity Name"
								placeholder="Enter name"
							/>
							<Textarea
								id="unique-id-1"
								label="Opportunity Description"
								placeholder="Enter description"
							/>
							<Combobox
								id="combobox-autocomplete-unique-id"
								labels={{
									label: 'Account Name',
									placeholderReadOnly: 'Select account'
								}}
								options={accountsWithIcon}
								variant="base"
							/>
							<Combobox
								id="combobox-readonly-unique-id"
								labels={{
									label: 'Lead Source',
									placeholderReadOnly: 'Select source'
								}}
								options={[
									{ id: 1, label: 'Third Party Program' },
									{ id: 2, label: 'Cold Call' },
									{ id: 3, label: 'LinkedIn' },
									{ id: 4, label: 'Direct Mail' },
									{ id: 5, label: 'Other' }
								]}
								variant="readonly"
							/>
							<Input
								fixedTextLeft="$"
								id="unique-id-1"
								label="Amount"
								placeholder="Enter amount"
							/>
							<div className="slds-form-element">
								<Datepicker
									label="Start Date"
								/>
							</div>
							<div className="slds-form-element">
								<Timepicker
									label="Start Time"
								/>
							</div>
							<Input
								id="unique-id-1"
								label="Additional Input"
								placeholder="To create scrolling modal"
							/>
							<Input
								id="unique-id-1"
								label="Additional Input"
								placeholder="To create scrolling modal"
							/>
							<Input
								id="unique-id-1"
								label="Additional Input"
								placeholder="To create scrolling modal"
							/>
							<Input
								id="unique-id-1"
								label="Additional Input"
								placeholder="To create scrolling modal"
							/>
							<Input
								id="unique-id-1"
								label="Additional Input"
								placeholder="To create scrolling modal"
							/>
							<Input
								id="unique-id-1"
								label="Additional Input"
								placeholder="To create scrolling modal"
							/>
							<Input
								id="unique-id-1"
								label="Additional Input"
								placeholder="To create scrolling modal"
							/>
						</div>
					</Modal>
				</div>
			</IconSettings>
		);
	}
}

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
