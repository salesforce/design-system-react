import React from 'react';
import Icon from '~/components/icon'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
	displayName: 'IconExample',

	render () {
		return (
			<div className="slds-grid slds-grid--pull-padded slds-grid--vertical-align-center">
				<div className="slds-col--padded">
					<Icon
						assistiveText="Warning"
						category="utility"
						color="warning"
						name="warning"
						size="x-small"
					/>
				</div>
				<div className="slds-col--padded">
					<Icon
						assistiveText="Case"
						category="standard"
						name="case"
						size="small"
					/>
				</div>
				<div className="slds-col--padded">
					<Icon
						assistiveText="Case"
						category="standard"
						name="case"
						size="medium"
					/>
				</div>
				<div className="slds-col--padded">
					<Icon
						assistiveText="Case"
						category="standard"
						name="case"
						size="large"
					/>
				</div>
			</div>
		);
	}
});


export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
