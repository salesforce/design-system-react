import React from 'react';
import VisualPicker from '~/components/visual-picker';
import Coverable from '~/components/visual-picker/private/Coverable';

class Example extends React.Component {
	render() {
		return (
			<div
				style={{
					padding: '4rem 1rem 0px',
					background: 'rgb(244, 246, 249)',
				}}
			>
				<h1>Radio</h1>
				<VisualPicker label="Please Any One Select" inputType="radio">
					<Coverable title="Connected App" icon="connected_apps" />
					<Coverable title="Connected App" icon="custom_apps" />
				</VisualPicker>
				<hr />
				<h1>Checkbox</h1>
				<VisualPicker label="Please Select" inputType="checkbox">
					<Coverable title="Connected App" icon="connected_apps" />
					<Coverable title="Connected App" icon="custom_apps" />
				</VisualPicker>
			</div>
		);
	}
}
Example.displayName = 'VisualPickerCoverable';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
