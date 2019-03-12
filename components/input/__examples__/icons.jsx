import React from 'react';

import IconSettings from '~/components/icon-settings';
import Input from '~/components/input'; // `~` is replaced with design-system-react at runtime
import InputIcon from '~/components/icon/input-icon'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	static displayName = 'InputExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<h1 className="slds-text-title_caps slds-p-vertical_medium">
						Input with Icons
					</h1>
					<div className="slds-col_padded">
						<Input
							iconLeft={
								<InputIcon
									assistiveText={{
										icon: 'Search',
									}}
									name="search"
									category="utility"
								/>
							}
							id="unique-id-1"
							label="Input Label"
							placeholder="Static Icon on the left"
						/>
					</div>
					<div className="slds-col_padded">
						<Input
							iconLeft={
								<InputIcon
									assistiveText={{
										icon: 'Search',
									}}
									name="search"
									category="utility"
									onClick={() => {
										console.log('Icon Clicked');
									}}
								/>
							}
							iconRight={
								<InputIcon
									assistiveText={{
										icon: 'Clear',
									}}
									name="clear"
									category="utility"
									onClick={() => {
										console.log('Icon Clicked');
									}}
								/>
							}
							id="unique-id-2"
							label="Input Label"
							placeholder="Clickable Icons (Left and Right)"
						/>
					</div>
					<div className="slds-col_padded">
						<Input
							iconRight={
								<InputIcon
									assistiveText={{
										icon: 'Clear',
									}}
									name="clear"
									category="utility"
									onClick={() => {
										console.log('Icon Clicked');
									}}
								/>
							}
							id="unique-id-3"
							label="Input Label"
							placeholder="Clickable Icon on the right"
						/>
					</div>
					<div className="slds-col_padded">
						<Input
							assistiveText={{ spinner: 'Field data is loading' }}
							iconRight={
								<InputIcon
									assistiveText={{
										icon: 'Clear',
									}}
									name="clear"
									category="utility"
									onClick={() => {
										console.log('Icon Clicked');
									}}
								/>
							}
							hasSpinner
							id="unique-id-4"
							label="Input Label"
							placeholder="Loading Spinner Icon on the right"
						/>
					</div>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
