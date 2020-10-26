/* eslint-disable no-console, react/prop-types */
import React from 'react';
import RequiredInputErrorStateComponent from '../required-input-error-state';

function Example() {
	return <RequiredInputErrorStateComponent />;
}

Example.displayName = 'ComboboxExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
