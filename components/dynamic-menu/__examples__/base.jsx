/* eslint-disable no-console, react/prop-types */
import React from 'react';
import DynamicMenu from '~/components/combobox';


class Example extends React.Component {
	render () {
		return (
			<DynamicMenu>...</DynamicMenu>
		);
	}
}

Example.displayName = 'DynamicMenuExample';
export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
