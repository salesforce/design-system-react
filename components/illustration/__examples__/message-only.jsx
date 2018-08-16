import React from 'react';
import createReactClass from 'create-react-class';
import Illustration from '~/components/illustration'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	render () {
		return (
			<Illustration messageBody="Lorem ipsum dolor sit amet, consectetur" />
		);
	}
}

Example.displayName = 'IllustrationExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
