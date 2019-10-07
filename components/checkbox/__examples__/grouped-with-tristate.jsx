import React from 'react';
// `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';
import Checkbox from '~/components/checkbox';

class Example extends React.Component {
	static displayName = 'CheckboxExample';

	constructor(props) {
		super(props);
		this.state = {
			mayonnaiseChecked: true,
			mustardChecked: false,
			oilChecked: true,
			vinegarChecked: false,
		};
		this.previousMixedState = { ...this.state };
	}

	getAllCondimentsStatus() {
		let status = 'mixed';

		if (
			this.state.mayonnaiseChecked &&
			this.state.mustardChecked &&
			this.state.oilChecked &&
			this.state.vinegarChecked
		) {
			status = true;
		} else if (
			!this.state.mayonnaiseChecked &&
			!this.state.mustardChecked &&
			!this.state.oilChecked &&
			!this.state.vinegarChecked
		) {
			status = false;
		}

		return status;
	}

	handleSubCheckboxChange(attribute) {
		const newState = { ...this.state };
		newState[attribute] = !this.state[attribute];
		this.previousMixedState = { ...newState };
		this.setState(newState);
	}

	render() {
		const allCondimentsStatus = this.getAllCondimentsStatus();

		return (
			<IconSettings iconPath="/assets/icons">
				<fieldset>
					<legend className="slds-p-bottom_xx-small">
						Grouped with Tristate
					</legend>
					<Checkbox
						aria-checked={allCondimentsStatus}
						aria-controls="checkbox-mayonnaise checkbox-mustard checkbox-oil checkbox-vinegar"
						assistiveText={{
							label: 'All Condiments',
						}}
						checked={allCondimentsStatus === true || undefined}
						id="checkbox-example-all-condiments"
						indeterminate={allCondimentsStatus === 'mixed'}
						labels={{
							label: 'All Condiments',
						}}
						onChange={() => {
							const condimentsStatus = this.getAllCondimentsStatus();

							if (condimentsStatus === false) {
								if (
									!this.previousMixedState.mayonnaiseChecked &&
									!this.previousMixedState.mustardChecked &&
									!this.previousMixedState.oilChecked &&
									!this.previousMixedState.vinegarChecked
								) {
									this.setState({
										mayonnaiseChecked: true,
										mustardChecked: true,
										oilChecked: true,
										vinegarChecked: true,
									});
								} else {
									this.setState({ ...this.previousMixedState });
								}
							} else if (condimentsStatus === 'mixed') {
								this.previousMixedState = { ...this.state };
								this.setState({
									mayonnaiseChecked: true,
									mustardChecked: true,
									oilChecked: true,
									vinegarChecked: true,
								});
							} else {
								this.setState({
									mayonnaiseChecked: false,
									mustardChecked: false,
									oilChecked: false,
									vinegarChecked: false,
								});
							}
						}}
					/>
					<ul className="slds-p-left_large slds-p-top_xx-small">
						<li>
							<Checkbox
								assistiveText={{
									label: 'Mayonnaise',
								}}
								checked={this.state.mayonnaiseChecked}
								id="checkbox-mayonnaise"
								labels={{
									label: 'Mayonnaise',
								}}
								onChange={() => {
									this.handleSubCheckboxChange('mayonnaiseChecked');
								}}
							/>
						</li>
						<li>
							<Checkbox
								assistiveText={{
									label: 'Mustard',
								}}
								checked={this.state.mustardChecked}
								id="checkbox-mustard"
								labels={{
									label: 'Mustard',
								}}
								onChange={() => {
									this.handleSubCheckboxChange('mustardChecked');
								}}
							/>
						</li>
						<li>
							<Checkbox
								assistiveText={{
									label: 'Oil',
								}}
								checked={this.state.oilChecked}
								id="checkbox-oil"
								labels={{
									label: 'Oil',
								}}
								onChange={() => {
									this.handleSubCheckboxChange('oilChecked');
								}}
							/>
						</li>
						<li>
							<Checkbox
								assistiveText={{
									label: 'Vinegar',
								}}
								checked={this.state.vinegarChecked}
								id="checkbox-vinegar"
								labels={{
									label: 'Vinegar',
								}}
								onChange={() => {
									this.handleSubCheckboxChange('vinegarChecked');
								}}
							/>
						</li>
					</ul>
				</fieldset>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
