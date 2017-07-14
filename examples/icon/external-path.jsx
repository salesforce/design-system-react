import React from 'react';
import Icon from '~/components/icon'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
	displayName: 'IconExample',

	render () {
		return (
			<Icon
				assistiveText="We got news!"
				inverse
				path="/assets/icons/utility-sprite/svg/symbols.svg#announcement"
				size="medium"
			/>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
