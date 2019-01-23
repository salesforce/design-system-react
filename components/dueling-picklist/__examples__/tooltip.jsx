/* eslint-disable no-console, react/prop-types, react/prefer-es6-class */
import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import DuelingPicklist from '~/components/dueling-picklist';
import duelingPicklistFilter from '~/components/dueling-picklist/filter';
import Tooltip from '~/components/tooltip';
import Icon from '~/components/icon';
import { fruitOptions, ids } from './constants';

const Example = createReactClass({
	displayName: 'DuelingPicklistExample',

	getInitialState() {
		return {
			options: fruitOptions,
			selected: fruitOptions.slice(-2),
		};
	},

	handleChange(selected) {
		this.setState({ selected });
	},

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
					tooltip={
						<Tooltip align="top left" content="Hello World" id="tooltip">
							<a href="javascript:void(0)">
								<Icon
									assistiveText={{ label: 'Tooltip with icon' }}
									category="utility"
									name="info"
									size="x-small"
								/>
							</a>
						</Tooltip>
					}
				/>
			</IconSettings>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
