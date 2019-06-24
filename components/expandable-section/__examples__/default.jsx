import React from 'react';
// `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';
import ExpandableSection from '~/components/expandable-section';

class Example extends React.Component {
	static displayName = 'ExpandableSectionDefaultExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<ExpandableSection
					id="default-expandable-section"
					title="Section Title"
				>
					<p>
						Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
						vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris
						condimentum nibh, ut fermentum massa justo sit amet risus. Lorem
						ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus
						eget urna mollis ornare vel eu leo.
					</p>
				</ExpandableSection>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
