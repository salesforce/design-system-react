/* eslint-disable no-console, react/prop-types */
import React from 'react';
import IconSettings from '~/components/icon-settings';
import DuelingPicklist from '~/components/dueling-picklist';
import duelingPicklistFilter from '~/components/dueling-picklist/filter';

const fruitOptions = 'Apple,Banana,Orange,Pear,Watermelon'
	.split(',')
	.map((fruit, i) => ({
		id: `${i}`,
		label: fruit,
	}));

const ids = {
	picklistGroupLabel: 'picklist-label-7',
	dragLiveRegion: 'drag-live-region-7',
	optionDragLabel: 'option-drag-label-7',
	optionsLabel: 'options-label-7',
	selectedLabel: 'selected-label-7',
};

class Example extends React.Component {
	static displayName = 'DuelingPicklistExample';

	state = {
		options: fruitOptions,
		selected: fruitOptions.slice(-2),
	};

	handleChange = (selected) => {
		this.setState({ selected });
	};

	render() {
		const { selected } = this.state;
		const options = duelingPicklistFilter({
			options: this.state.options,
			selected,
		});
		return (
			<IconSettings iconPath="/assets/icons">
				<DuelingPicklist
					options={options}
					selected={selected}
					events={{
						onChange: this.handleChange,
					}}
					ids={ids}
					isRequired
				/>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
