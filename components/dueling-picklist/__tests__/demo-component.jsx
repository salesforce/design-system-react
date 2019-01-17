import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '../../icon-settings';
import DuelingPicklist from '../';
import duelingPicklistFilter from '../filter';

const options = 'Car,Truck,Van,Minivan,Race car,Tank,Scooter'
	.split(',')
	.map((label, i) => ({ label, id: `${i}` }));

const defaultSelected = options.slice(-2);
const defaultProps = {
	options: duelingPicklistFilter({ options, selected: defaultSelected }),
	selected: defaultSelected,
};

/* A re-usable demo component fixture outside of `describe` sections
 * can accept props within each test and be unmounted after each tests.
 * This wrapping component will be similar to your wrapping component
 * you will create in the React Storybook for manual testing.
 */
const DemoComponent = createReactClass({
	displayName: 'DuelingPicklistDemoComponent',

	getDefaultProps () {
		return defaultProps;
	},

	getInitialState () {
		return {
			selected: this.props.selected,
			options: [...this.props.options, ...this.props.selected],
		};
	},

	handleChange (selected) {
		this.setState({ selected });
	},

	render () {
		const options = duelingPicklistFilter({
			options: this.state.options,
			selected: this.state.selected,
		});
		return (
			<IconSettings iconPath="/assets/icons">
				<DuelingPicklist
					{...this.props}
					{...this.state}
					options={options}
					events={{
						onChange: this.handleChange,
					}}
				/>
			</IconSettings>
		);
	},
});

export default DemoComponent;
