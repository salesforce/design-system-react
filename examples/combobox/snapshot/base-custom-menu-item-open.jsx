/* eslint-disable no-console, react/prop-types */
import React from 'react';
import BaseCustomMenuItem from '../base-custom-menu-item';

class Example extends React.Component {
	render () {
		return (
			<BaseCustomMenuItem isInline isOpen />
		);
	}
}

Example.displayName = 'ComboboxExample';
export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
