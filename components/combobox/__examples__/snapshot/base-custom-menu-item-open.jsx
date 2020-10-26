/* eslint-disable no-console, react/prop-types */
import React from 'react';
import BaseCustomMenuItem from '../base-custom-menu-item';

function Example() {
	return <BaseCustomMenuItem menuPosition="relative" isOpen />;
}

Example.displayName = 'ComboboxExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
