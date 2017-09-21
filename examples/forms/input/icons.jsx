import React from 'react';
import Input from '~/components/forms/input'; // `~` is replaced with design-system-react at runtime
import InputIcon from '~/components/icon/input-icon'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
	displayName: 'InputExample',

	render () {
		return (
			<div className="slds-grid slds-grid--pull-padded slds-grid--vertical-align-center">
				<div className="slds-col--padded">
					<Input
						iconLeft={<InputIcon
							assistiveText="Search"
							name="search"
							category="utility"
							onClick={() => { console.log('Icon Clicked'); }}
						/>}
						id="unique-id-2"
						label="Input Label"
						placeholder="Icon on the left"
					/>
				</div>
				<div className="slds-col--padded">
					<Input
						iconLeft={<InputIcon
							assistiveText="Search"
							name="search"
							category="utility"
							onClick={() => { console.log('Icon Clicked'); }}
						/>}
						iconRight={<InputIcon
							assistiveText="Clear"
							name="clear"
							category="utility"
							onClick={() => { console.log('Icon Clicked'); }}
						/>}
						id="unique-id-3"
						label="Input Label"
						placeholder={'"Purple State" Icon (Left and Right)'}
					/>
				</div>
				<div className="slds-col--padded">
					<Input
						iconRight={<InputIcon
							assistiveText="Clear"
							name="clear"
							category="utility"
							onClick={() => { console.log('Icon Clicked'); }}
						/>}
						id="unique-id-3"
						label="Input Label"
						placeholder="Icon on the right"
					/>
				</div>
			</div>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
