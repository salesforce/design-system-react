import React from 'react';
import Icon from '~/components/icon'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
	displayName: 'IconExample',

	render () {
		return (
			<div className="slds-grid slds-grid--pull-padded slds-grid--vertical-align-center">
				<div className="slds-col--padded">
					<Icon
						assistiveText="Lead"
						category="standard"
						colorVariant="base"
						name="lead"
					/>
				</div>
				<div className="slds-col--padded">
					<Icon
						assistiveText="Lock"
						category="utility"
						colorVariant="default"
						name="lock"
					/>
				</div>
				<div className="slds-col--padded">
					<Icon
						assistiveText="Warning"
						category="utility"
						colorVariant="warning"
						name="warning"
					/>
				</div>
				<div className="slds-col--padded">
					<Icon
						assistiveText="Warning"
						category="utility"
						colorVariant="error"
						name="warning"
					/>
				</div>
			</div>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
