import React from 'react';
import PropTypes from 'prop-types';
import Scheduler from '~/components/scheduler';

class Example extends React.Component {
	static displayName = 'SchedulerExample';

	render () {
		return (
			<Scheduler
				{...this.props}
			/>
		);
	}
}

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
