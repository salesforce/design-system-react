/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Controls from '../controls';
import Info from '../info';
import Label from '../label';
import MediaObject from '../../../media-object';
import Title from '../title';

const displayName = 'PageHeaderRelatedList';
const propTypes = {
	/**
	 * Title node passed by PageHeader
	 */
	title: PropTypes.node,
	/**
	 * Info node passed by PageHeader
	 */
	info: PropTypes.node,
	/**
	 * Content to appear on the right hand side of the page header
	 * 'contentRight' prop will be deprecated soon, instead use 'onRenderActions'
	 */
	contentRight: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	/**
	 * Nav content which appears in the upper right hand corner.
	 * 'navRight' prop will be deprecated soon, instaed use 'onRenderControls'
	 */
	navRight: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};
const defaultProps = {};

const RelatedList = (props) => (
	<>
		<div className="slds-page-header__row">
			<div className="slds-page-header__col-title">
				<Label content={props.label} trail={props.trail} />
				<MediaObject
					body={
						<div className="slds-page-header__name">
							<Title
								content={props.title}
								label={props.label}
							/>
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
	</>
);

RelatedList.displayName = displayName;
RelatedList.propTypes = propTypes;
RelatedList.defaultProps = defaultProps;

export default RelatedList;
