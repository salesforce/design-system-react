import React from 'react';

const ViewOnly = ({ labels, selected }) => (
	<div className="slds-dueling-list">
		<div className="slds-form-element">
			<span className="slds-form-element__label">{labels.selectedItems}</span>
			<div className="slds-form-element__control">
				<span className="slds-form-element__static">
					{selected.map(({ label }) => label).join(', ')}
				</span>
			</div>
		</div>
	</div>
);

export default ViewOnly;
