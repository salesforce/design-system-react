import React from 'react';

import Illustration from '~/components/illustration'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	render() {
		return (
			<Illustration
				heading="Lorem ipsum dolor"
				messageBody="Lorem ipsum dolor sit amet, consectetur"
				name="No Access"
				path="/assets/images/illustrations/empty-state-no-access.svg#no-access"
				size="large"
				silenceDeprecationWarning
			/>
		);
	}
}

Example.displayName = 'IllustrationExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
