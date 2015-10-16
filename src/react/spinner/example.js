import React from 'react';
import ReactDOM from 'react-dom';
import Spinner from './spinner';

require('../../../scss/components/grid-system/flavors/automatic-sizing/index.scss');
require('../../../scss/components/grid-system/flavors/horizontal-alignment-spread/index.scss');
require('../../../scss/components/grid-system/flavors/vertical-alignment/index.scss');

export default function () {
	ReactDOM.render(
		<div>
			<div className="slds-grid slds-grid--align-spread">
				<div className="slds-box slds-theme--default | slds-col--padded | slds-align-middle ">
					<Spinner size="small" theme="base" />
				</div>
				<div className="slds-box slds-theme--default | slds-col--padded | slds-align-middle "> 
					<Spinner size="medium" theme="base" />
				</div>
				<div className="slds-box slds-theme--default | slds-col--padded | slds-align-middle ">
					<Spinner size="large" theme="base" />
				</div>
			</div>
			
			<div className="slds-grid slds-grid--align-spread">
				<div className="slds-box slds-theme--shade | slds-col--padded | slds-align-middle ">
					<Spinner size="small" theme="brand" />
				</div>
				<div className="slds-box slds-theme--shade | slds-col--padded | slds-align-middle ">
					<Spinner size="medium" theme="brand" />
				</div>
				<div className="slds-box slds-theme--shade | slds-col--padded | slds-align-middle ">
					<Spinner size="large" theme="brand" />
				</div>
			</div>

			<div className="slds-grid slds-grid--align-spread">
				<div className="slds-box slds-theme--inverse | slds-col--padded | slds-align-middle ">
					<Spinner size="small" theme="inverse" />
				</div>
				<div className="slds-box slds-theme--inverse | slds-col--padded | slds-align-middle ">
					<Spinner size="medium" theme="inverse" />
				</div>
				<div className="slds-box slds-theme--inverse | slds-col--padded | slds-align-middle ">
					<Spinner size="large" theme="inverse" />
				</div>
			</div>
		</div>
	, element);
}
