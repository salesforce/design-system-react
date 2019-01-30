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
	picklistGroupLabel: 'picklist-label',
	dragLiveRegion: 'drag-live-region',
	optionDragLabel: 'option-drag-label',
	optionsLabel: 'options-label',
	selectedLabel: 'selected-label',
};

class Example extends React.Component {
	static displayName = 'DuelingPicklistExample';

	state = {
		options: fruitOptions,
		selected: fruitOptions.slice(-2).map((fruit, i) => ({
			...fruit,
			isLocked: i === 0,
		})),
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
					isReorderable
				/>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
