// SAMPLE COMPONENT CODE -->
import React from 'react';

import SLDSButton from 'design-system-react/components/SLDSButton';

const ButtonExample = React.createClass({
	displayName: 'ButtonExample',

	getInitialState () {
		return {
			buttonStatefulSelected: false,
			buttonStatefulInverseSelected: false,
			buttonIconStateful: false
		};
	},

	render () {
		/* eslint-disable max-len */
		return (
			<div className="slds-grid slds-grid--vertical">

				<div className="slds-col | slds-m-bottom--small">
					<SLDSButton label="Base" />
					<SLDSButton label="Disabled" disabled />
				</div>
			</div>
		);
	},

	handleClickButtonStateful () {
		this.setState({ buttonStatefulSelected: !this.state.buttonStatefulSelected });
	},

	handleClickButtonStatefulInverse () {
		this.setState({ buttonStatefulInverseSelected: !this.state.buttonStatefulInverseSelected });
	},

	handleClickIconStateful () {
		this.setState({ buttonIconStateful: !this.state.buttonIconStateful });
	}
});

// <-- SAMPLE COMPONENT CODE

export default ButtonExample;
