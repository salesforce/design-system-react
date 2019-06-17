import React from 'react';
import VisualPicker from '~/components/visual-picker';
import { Radio, Checkbox } from '~/components';
import Icon from '~/components/icon';
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div
					style={{
						padding: '4rem 1rem 0px',
						background: 'rgb(244, 246, 249)',
					}}
				>
					<h1>Radio</h1>
					<VisualPicker
						label="Select any one"
						id="visual-picker-coverable-radio"
						coverable
					>
						<Radio
							labels={{
								label: 'Connected App',
							}}
							id="visual-picker-coverable-radio-1"
							onRenderVisualPickerSelected={() => (
								<Icon
									assistiveText={this.props.assistiveText}
									category="utility"
									name="check"
									colorVariant="base"
									size="large"
								/>
							)}
							onRenderVisualPickerNotSelected={() => (
								<Icon
									assistiveText={this.props.assistiveText}
									category="utility"
									name="connected_apps"
									size="large"
								/>
							)}
						/>
						<Radio
							labels={{
								label: 'Custom App',
							}}
							id="visual-picker-coverable-radio-2"
							onRenderVisualPickerSelected={() => (
								<Icon
									assistiveText={this.props.assistiveText}
									category="utility"
									name="check"
									colorVariant="base"
									size="large"
								/>
							)}
							onRenderVisualPickerNotSelected={() => (
								<Icon
									assistiveText={this.props.assistiveText}
									category="utility"
									name="custom_apps"
									size="large"
								/>
							)}
						/>
					</VisualPicker>
					<hr />
					<h1>Checkbox</h1>
					<VisualPicker
						label="Add the following object(s)"
						id="visual-picker-coverable-checkbox"
						coverable
					>
						<Checkbox
							labels={{
								label: 'Account',
							}}
							id="visual-picker-coverable-checkbox-1"
							onRenderVisualPickerSelected={() => (
								<Icon
									assistiveText={this.props.assistiveText}
									category="utility"
									name="check"
									colorVariant="base"
									size="large"
								/>
							)}
							onRenderVisualPickerNotSelected={() => (
								<Icon
									assistiveText={this.props.assistiveText}
									category="standard"
									name="account"
									size="large"
								/>
							)}
						/>
						<Checkbox
							labels={{
								label: 'Lead',
							}}
							id="visual-picker-coverable-checkbox-2"
							onRenderVisualPickerSelected={() => (
								<Icon
									assistiveText={this.props.assistiveText}
									category="utility"
									name="check"
									colorVariant="base"
									size="large"
								/>
							)}
							onRenderVisualPickerNotSelected={() => (
								<Icon
									assistiveText={this.props.assistiveText}
									category="standard"
									name="lead"
									size="large"
								/>
							)}
						/>
						<Checkbox
							labels={{
								label: 'Orders',
							}}
							id="visual-picker-coverable-checkbox-3"
							onRenderVisualPickerSelected={() => (
								<Icon
									assistiveText={this.props.assistiveText}
									category="utility"
									name="check"
									colorVariant="base"
									size="large"
								/>
							)}
							onRenderVisualPickerNotSelected={() => (
								<Icon
									assistiveText={this.props.assistiveText}
									category="standard"
									name="orders"
									size="large"
								/>
							)}
						/>
					</VisualPicker>
				</div>
			</IconSettings>
		);
	}
}
Example.displayName = 'VisualPickerCoverable';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
