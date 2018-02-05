import React from 'react';
import Toast from '~/components/toast'; // `~` is replaced with design-system-react at runtime
import ToastContainer from '~/components/toast/container'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<ToastContainer>
					<Toast
						labels={{
							heading: '26 potential duplicate leads were found.',
							headingLink: 'Select Leads to Merge',
						}}
						onClickHeadingLink={() => {
							console.log('Link clicked.');
						}}
					/>
				</ToastContainer>
			</IconSettings>
		);
	}
}

Example.displayName = 'ToastExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
