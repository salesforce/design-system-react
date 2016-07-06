import React from 'react';

import { BREAD_CRUMB } from '../../utilities/constants';

/**
 * Breadcrumb based on SLDS 2.1.0-dev
 */
const BreadCrumb = (props) => {
	const {
		assistiveText,
		trail
	} = props;

	return (
		<nav role='navigation' aria-label={assistiveText}>
			<ol className='slds-breadcrumb slds-list--horizontal'>
				{trail.map((crumb, index) =>
					<li
						key={`BreadCrumb.${index}`}
						className='slds-breadcrumb__item slds-text-title--caps'
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

BreadCrumb.defaultProps = {
  assistiveText: 'Breadcrumbs'
};

module.exports = BreadCrumb;
