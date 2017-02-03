/* eslint-disable no-console, react/prop-types */
import React from 'react';
import Navigation from '~/components/navigation';

import { sampleReportCategories } from '../../utilities/sample-data/navigation';

const Example = React.createClass({
	displayName: 'NavigationExample',

	getInitialState () {
		return {
			selectedId: 'recent_reports'
		};
	},

	render () {
		return (
			<div style={{width: '320px'}}>
				<Navigation
					id='sample-navigation'
					categories={sampleReportCategories}
					selectedId={this.state.selectedId}
					onSelect={(event, data) => {
						this.setState({selectedId: data.selectedId})
						if (this.props.action) {
							const dataAsArray = Object.keys(data).map((key) => data[key]);
							this.props.action('onSelect')(event, data, ...dataAsArray);
						} else if (console) {
							console.log('[onSelect] (event, data)', event, data);
						}

					}}
				/>
			</div>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
