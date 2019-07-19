/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

import Controls from '../controls';
import Info from '../info';
import Label from '../label';
import MediaObject from '../../../media-object';
import Title from '../title';

const displayName = 'PageHeaderRelatedList';
const propTypes = {
	/**
	 * The label property can be a string or a React element
	 */
	label: PropTypes.node,
	/**
	 * The info property can be a string or a React element
	 */
	info: PropTypes.node,
	/**
	 * Content to appear on the right hand side of the page header
	 * prop 'contentRight' will be deprecated soon, use 'onRenderActions' instead
	 */
	onRenderActions: PropTypes.func,
	/**
	 * Nav content which appears in the upper right hand corner.
	 * prop 'navRight' will be deprecated soon, use 'onRenderControls' instead
	 */
	onRenderControls: PropTypes.func,
	/**
	 * The title property can be a string or a React element
	 */
	title: PropTypes.node,
	/**
	 * An array of react elements presumably anchor <a> elements.
	 */
	trail: PropTypes.array,
	/**
	 * The type of component
	 * Note: Extra options are added to make the version backward compatible
	 */
	variant: PropTypes.string,
};
const defaultProps = {};

const RelatedList = (props) => (
	<React.Fragment>
		<div className="slds-page-header__row">
			<div className="slds-page-header__col-title">
				<Label content={props.label} trail={props.trail} />
				<MediaObject
					body={
						<div className="slds-page-header__name">
							<Title content={props.title} label={props.label} />
						</div>
					}
				/>
			</div>
			<Controls
				contentRight={props.contentRight}
				onRenderActions={props.onRenderActions}
				type="actions"
			/>
		</div>
		<div className="slds-page-header__row">
			<div className="slds-page-header__col-meta">
				<Info content={props.info} variant={props.variant} />
			</div>
			<Controls
				navRight={props.navRight}
				onRenderControls={props.onRenderControls}
				type="controls"
			/>
		</div>
	</React.Fragment>
);

RelatedList.displayName = displayName;
RelatedList.propTypes = propTypes;
RelatedList.defaultProps = defaultProps;

export default RelatedList;
