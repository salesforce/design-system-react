import React from 'react';
import SummaryDetail from '~/components/summary-detail';
import IconSettings from '~/components/icon-settings';

import log from '~/utilities/log';

class Example extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<SummaryDetail
					title="Summary Title"
					detail="Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo. Nulla vitae elit libero, a pharetra augue."
					onToggleDetails={(event) =>
						log({
							action: this.props.action,
							event,
							eventName: 'Details toggled',
							data: null,
						})
					}
				/>
			</IconSettings>
		);
	}
}

export default Example;
