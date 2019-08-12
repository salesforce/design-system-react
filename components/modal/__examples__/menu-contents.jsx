import React from 'react';

import IconSettings from '~/components/icon-settings';
import Modal from '~/components/modal'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';
import Lookup from '~/components/lookup';
import Combobox from '~/components/combobox';

const leadSourceOptions = [
	{ id: 1, label: 'Third Party Program', value: 'A0' },
	{ id: 2, label: 'Cold Call', value: 'B0' },
	{ id: 3, label: 'LinkedIn', value: 'C0' },
	{ id: 4, label: 'Direct Mail', value: 'D0' },
	{ id: 5, label: 'Other', value: 'E0' },
];

const opportunityTypeOptions = [
	{ id: 1, label: 'Add on Business', value: 'A0' },
	{ id: 2, label: 'Courtesy', value: 'B0' },
	{ id: 3, label: 'New Business', value: 'C0' },
	{ id: 4, label: 'Renewal', value: 'D0' },
	{ id: 5, label: 'Upgrade', value: 'E0' },
];

class Example extends React.Component {
	static displayName = 'ModalExample';

	state = {
		isOpen: false,
		leadSourceSelection: [leadSourceOptions[0]],
		opportunityTypeSelection: [opportunityTypeOptions[0]],
	};

	toggleOpen = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<Button
						label="Open modal with menu contents"
						onClick={this.toggleOpen}
					/>
					<Modal
						isOpen={this.state.isOpen}
						footer={[
							<Button label="Cancel" onClick={this.toggleOpen} />,
							<Button label="Save" variant="brand" onClick={this.toggleOpen} />,
						]}
						onRequestClose={this.toggleOpen}
						heading="New Opportunity"
					>
						<section className="slds-p-around_large">
							<div className="slds-form-element slds-m-bottom_large">
								<label className="slds-form-element__label" htmlFor="opptyName">
									Opportunity Name
								</label>
								<div className="slds-form-element__control">
									<input
										id="opptyName"
										className="slds-input"
										type="text"
										placeholder="Enter name"
									/>
								</div>
							</div>
							<div className="slds-form-element slds-m-bottom_large">
								<label
									className="slds-form-element__label"
									htmlFor="description"
								>
									Opportunity Description
								</label>
								<div className="slds-form-element__control">
									<textarea
										id="description"
										className="slds-textarea"
										placeholder="Enter description"
									/>
								</div>
							</div>
							<div className="slds-form-element slds-m-bottom_large">
								<Lookup
									emptyMessage="No items found"
									hasError={false}
									label="Account"
									onChange={(newValue) => {
										console.log('New search term: ', newValue);
									}}
									onSelect={(item) => {
										console.log(item, ' Selected');
									}}
									options={[
										{ type: 'section', label: 'SECTION 1' },
										{ label: "Paddy's Pub" },
										{ label: 'Tyrell Corp' },
										{ type: 'section', label: 'SECTION 2' },
										{ label: 'Paper St. Soap Company' },
										{ label: 'Nakatomi Investments' },
										{ label: 'Acme Landscaping' },
										{ type: 'section', label: 'SECTION 3' },
										{ label: 'Acme Construction' },
									]}
									sectionDividerRenderer={Lookup.DefaultSectionDivider}
								/>
							</div>
							<div className="slds-m-bottom_large">
								<Combobox
									events={{
										onSelect: (event, data) => {
											const selection =
												data.selection.length === 0
													? this.state.leadSourceSelection
													: data.selection;
											console.log('selected: ', selection[0].label);
											this.setState({ leadSourceSelection: selection });
										},
									}}
									labels={{
										label: 'Lead Source',
										placeholder: 'Select Lead Source',
									}}
									menuPosition="relative"
									options={leadSourceOptions}
									selection={this.state.leadSourceSelection}
									variant="readonly"
								/>
							</div>
							<div className="slds-m-bottom_large">
								<Combobox
									events={{
										onSelect: (event, data) => {
											const selection =
												data.selection.length === 0
													? this.state.opportunityTypeSelection
													: data.selection;
											console.log('selected: ', selection[0].label);
											this.setState({ opportunityTypeSelection: selection });
										},
									}}
									labels={{
										label: 'Type',
										placeholder: 'Select Opportunity Type',
									}}
									menuPosition="relative"
									options={opportunityTypeOptions}
									selection={this.state.opportunityTypeSelection}
									variant="readonly"
								/>
							</div>
							<div className="slds-form-element slds-m-bottom_large">
								<label className="slds-form-element__label" htmlFor="amount">
									Amount
								</label>
								<div className="slds-form-element__control">
									<input
										id="amount"
										className="slds-input"
										type="text"
										placeholder="Enter Amount"
									/>
								</div>
							</div>
						</section>
					</Modal>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
