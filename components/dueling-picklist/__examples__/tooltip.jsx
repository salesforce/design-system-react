/* eslint-disable no-console, react/prop-types */
import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import DuelingPicklist from '~/components/dueling-picklist';
import duelingPicklistFilter from '~/components/dueling-picklist/filter';
import { fruitOptions } from './constants';
import Tooltip from '~/components/tooltip';
import Icon from '~/components/icon';

const Example = createReactClass({
	displayName: 'DuelingPicklistExample',
	
	getInitialState() {
		return {
			options: fruitOptions,
			selected: fruitOptions.slice(-2),
		}
	},
	
	handleChange(selected) {
		this.setState({ selected })
	},

	render () {
		const { selected } = this.state;
		const options = duelingPicklistFilter({
			options: this.state.options,
			selected
		});
		return (
			<IconSettings iconPath="/assets/icons">
				<DuelingPicklist
					options={options}
					selected={selected}
					events={{
						onChange: this.handleChange
					}}
					tooltip={this.renderTooltip()}
				/>
			</IconSettings>
		);
	},
	
	renderTooltip() {
		return (
			<Tooltip
				align="top left"
				content="Hello World"
			>
				<a href="javascript:void(0)">
					<Icon
						assistiveText={{ label: 'Tooltip with icon' }}
						category="utility"
						name="info"
						size="x-small"
					/>
				</a>
			</Tooltip>
		)
	}
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
