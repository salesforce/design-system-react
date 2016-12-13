import React from 'react';
import ButtonGroup from '~/components/button-group';
import ButtonStateful from '~/components/button-stateful';
import Dropdown from '~/components/menu-dropdown';

const Example = React.createClass({
	displayName: 'ButtonGroupExample',

	render () {
		return (
			<ButtonGroup>
				<ButtonStateful
					assistiveText="Show Chart"
					buttonVariant="icon"
					iconName="chart"
					iconVariant="border"
					variant="icon"
				/>
				<ButtonStateful
					assistiveText="Filter"
					iconName="filter"
					iconVariant="border"
					variant="icon"
				/>
				<Dropdown
					assistiveText="Sort"
					checkmark
					iconName="sort"
					iconVariant="more"
					onSelect={function (item) { console.log(item.label, 'selected'); }}
					openOn="click"
					options={[
						{ label: 'Sort ascending', value: 'A0' },
						{ label: 'Sort descending', value: 'B0' }
					]}
					value="A0"
					variant="icon"
				/>
			</ButtonGroup>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
