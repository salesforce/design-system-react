import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import Modal from '~/components/modal'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';
import Lookup from '~/components/lookup';
import Picklist from '~/components/menu-picklist';

const Example = createReactClass({
	displayName: 'ModalExample',

	getInitialState () {
		return {
			isOpen: false
		};
	},

	toggleOpen () {
		this.setState({ isOpen: !this.state.isOpen });
	},

	render () {
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
							<Button label="Save" variant="brand" onClick={this.toggleOpen} />
						]}
						onRequestClose={this.toggleOpen}
						title="New Opportunity"
					>
						<section className="slds-p-around--large">
							<div className="slds-form-element slds-m-bottom--large">
								<label className="slds-form-element__label" htmlFor="opptyName">
									Opportunity Name
								</label>
								<div className="slds-form-element__control">
									<input
										id="opptyName"
										className="-input"
										type="text"
										placeholder="Enter name"
									/>
								</div>
							</div>
							<div className="slds-form-element slds-m-bottom--large">
								<label
									className="slds-form-element__label"
									htmlFor="description"
								>
									Opportunity Description
								</label>
								<div className="slds-form-element__control">
									<textarea
										id="description"
										className="-textarea"
										placeholder="Enter description"
									/>
								</div>
							</div>
							<div className="slds-form-element slds-m-bottom--large">
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
										{ label: 'Acme Construction' }
									]}
									sectionDividerRenderer={Lookup.DefaultSectionDivider}
								/>
							</div>
							<Picklist
								className="slds-m-bottom--large"
								label="Lead Source"
								onSelect={(option) => {
									console.log('selected: ', option.label);
								}}
								options={[
									{ label: 'Third Party Program', value: 'A0' },
									{ label: 'Cold Call', value: 'B0' },
									{ label: 'LinkedIn', value: 'C0' },
									{ label: 'Direct Mail', value: 'D0' },
									{ label: 'Other', value: 'E0' }
								]}
								placeholder="Select Lead Source"
								value="B0"
							/>
							<Picklist
								className="slds-m-bottom--large"
								label="Type"
								onSelect={(option) => {
									console.log('selected: ', option.label);
								}}
								options={[
									{ label: 'Add on Business', value: 'A0' },
									{ label: 'Courtesy', value: 'B0' },
									{ label: 'New Business', value: 'C0' },
									{ label: 'Renewal', value: 'D0' },
									{ label: 'Upgrade', value: 'E0' }
								]}
								placeholder="Select Opportunity Type"
								value="C0"
							/>
							<div className="slds-form-element slds-m-bottom--large">
								<label className="slds-form-element__label" htmlFor="amount">
									Amount
								</label>
								<div className="slds-form-element__control">
									<input
										id="amount"
										className="-input"
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
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
