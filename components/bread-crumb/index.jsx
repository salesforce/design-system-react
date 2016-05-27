import React from 'react';

import { BREAD_CRUMB } from '../../utilities/constants';

const BreadCrumb = (props) => {
	const {
		assistiveText,
		trail
	} = props;

	return (
		<nav role="navigation">
			<p id="bread-crumb-label" className="slds-assistive-text">{assistiveText}</p>
			<ol className="slds-breadcrumb slds-list--horizontal" aria-labelledby="bread-crumb-label">
				{trail.map((crumb, index) =>
					<li
						key={`BreadCrumb.${index}`}
						className="slds-list__item slds-text-heading--label"
					>{crumb}</li>
				)}
			</ol>
		</nav>
	);
};

BreadCrumb.displayName = BREAD_CRUMB;

BreadCrumb.propTypes = {
	/**
	 * The assistive text for the breadcrumb trail
	 */
	assistiveText: React.PropTypes.string,
	/**
	 * An array of react elements presumably anchor elements.
	 */
	trail: React.PropTypes.array
};

module.exports = BreadCrumb;
