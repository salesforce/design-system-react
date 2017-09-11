import React from 'react';
import Icon from '~/components/icon'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
	displayName: 'IconExample',

	render () {
		return (
			<div className="slds-grid slds-grid--pull-padded slds-grid--vertical-align-center">
				<div className="slds-col--padded">
					<Icon
						assistiveText="Account"
						category="standard"
						name="account"
						size="small"
					/>
				</div>
				<div className="slds-col--padded">
					<Icon
						assistiveText="Announcement"
						category="utility"
						name="announcement"
						size="small"
					/>
				</div>
				<div className="slds-col--padded">
					<Icon
						assistiveText="Description"
						category="action"
						name="description"
						size="small"
					/>
				</div>
				<div className="slds-col--padded">
					<Icon
						assistiveText="XML"
						category="doctype"
						name="xml"
						size="small"
					/>
				</div>
				<div className="slds-col--padded">
					<Icon
						assistiveText="custom5"
						category="custom"
						name="custom5"
						size="small"
					/>
				</div>
			</div>
		);
	}
});


export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
