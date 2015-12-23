import React from 'react';
import {Spinner} from 'design-system-react';

// require('../../../scss/components/grid-system/flavors/automatic-sizing/index.scss');
// require('../../../scss/components/grid-system/flavors/horizontal-alignment-spread/index.scss');
// require('../../../scss/components/grid-system/flavors/vertical-alignment/index.scss');

export default React.createClass({
	render () {
		return (
			<div>
				<div className="slds-col example">
					<div className="slds-grid slds-grid--vertical">
						<div className="slds-col slds-theme--default">
							<div className="slds-float--left spinner">
								<Spinner size="large" theme="base" />
							</div>
							<div className="slds-float--left spinner">
								<Spinner size="medium" theme="base" />
							</div>
							<div className="slds-float--left spinner">
								<Spinner size="small" theme="base" />
							</div>
						</div>
						<div className="slds-col slds-theme--shade">
							<div className="slds-float--left spinner">
								<Spinner size="large" theme="brand" />
							</div>
							<div className="slds-float--left spinner">
								<Spinner size="medium" theme="brand" />
							</div>
							<div className="slds-float--left spinner">
								<Spinner size="small" theme="brand" />
							</div>
						</div>
						<div className="slds-col slds-theme--inverse">
							<div className="slds-float--left spinner">
								<Spinner size="large" theme="inverse" />
							</div>
							<div className="slds-float--left spinner">
								<Spinner size="medium" theme="inverse" />
							</div>
							<div className="slds-float--left spinner">
								<Spinner size="small" theme="inverse" />
							</div>
						</div>
					</div>
				</div>
				<div className="slds-col demo-controls"></div>
			</div>
		);
	}
});
