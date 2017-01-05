import React from 'react';
import Datepicker from '~/components/date-picker';
import Input from '~/components/forms/input';

const Example = React.createClass({
	displayName: 'DatepickerExample',

	getInitialState () {
		return {
			isOpen: false
		};
	},

	render () {
		return (
			<Datepicker
				isOpen={this.state.isOpen}
				onRequestClose={() => { this.setState({ isOpen: false }); }}
				onRequestOpen={() => { this.setState({ isOpen: true }); }}
				onDateChange={({ date, formattedDate }) => {
					if (this.props.log) { this.props.log('onDateChange')(date, formattedDate); }
				}}
			>
				<Input placeholder="With custom Input" value="" />
			</Datepicker>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
