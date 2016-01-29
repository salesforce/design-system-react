import React     from 'react';
import { Badge } from 'design-system-react';
import { sampleData } from 'design-system-utilities';

const SAMPLE_DATA_ACCESSOR = 'badge';
const SAMPLE_DATA = sampleData[SAMPLE_DATA_ACCESSOR];
const SAMPLE_DATA_DEFAULT = SAMPLE_DATA.default;

const GroupsWrapper = React.createClass({
	propTypes: {
		data: React.PropTypes.array
	},
	render () {
		return (
			<div className="slds-col | slds-m-bottom--small">
				{this.props.data}
			</div>
		);
	}
});

export default React.createClass({
	render () {
		const groups = [];
		let children = [];
		let groupsCount = 1;
		SAMPLE_DATA_DEFAULT.forEach((node, index) => {
			if ( typeof node === 'object' ) {
				children.push(
					<Badge key={'badges-' + SAMPLE_DATA_DEFAULT[index].theme} theme={SAMPLE_DATA_DEFAULT[index].theme}>{SAMPLE_DATA_DEFAULT[index].text}</Badge>
				);
				if ((index !== 0) && (index % 3 === 0)) {
					groups.push(
						<GroupsWrapper key={'badges-group-' + groupsCount} data={children}/>
					);
					children = [];
					groupsCount += 1;
				}
			}
		});

		return (
			<div className="slds-grid slds-grid--vertical">
				{groups}
			</div>
		);
	}
});
