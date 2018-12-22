/* eslint-disable no-console, react/prop-types */
import React from 'react';
import RequiredInputErrorStateComponent from '../required-input-error-state';

class Example extends React.Component {
	render() {
		return <RequiredInputErrorStateComponent />;
	}
}

Example.displayName = 'ComboboxExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
