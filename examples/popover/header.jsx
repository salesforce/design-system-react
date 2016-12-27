import React from 'react';
import Popover from '~/components/popover'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';

const Container = React.createClass({
	displayName: 'PopoverExample',

	render () {
		return (
			<div>
				<Popover
					body="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
					heading="Header Title"
				>
					<Button label="Trigger Popover" />
				</Popover>
			</div>
		);
	}
});

export default Container;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
