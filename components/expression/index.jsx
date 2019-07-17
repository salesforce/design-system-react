/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Visual Picker design pattern](https://lightningdesignsystem.com/components/visual-picker/) in React.
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';
import { EXPRESSION } from '../../utilities/constants';
import ExpressionGroup from './group';

const propTypes = {
	/**
	 * HTML id for component.
	 */
	id: PropTypes.string,
	/**
	 * ExpressionGroup accepts `ExpressionCondition` & `ExpressionGroup`
	 */
	children: PropTypes.node,
	/**
	 * CSS classes to be added to tag with `.slds-expression`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),

	onAddCondition: PropTypes.func,
	onAddGroup: PropTypes.func,

	triggerType: PropTypes.oneOf(['all', 'any', 'custom', 'always', 'formula']),
	onChangeTrigger: PropTypes.func,

	customLogic: PropTypes.string,
	onChangeCustomLogic: PropTypes.func,
};

/**
 * Expression Component
 */
class Expression extends React.Component {
	componentWillMount() {
		this.generatedId = shortid.generate();
	}

	/**
	 * Get the Expression Group's HTML id. Generate a new one if no ID present.
	 */
	getId() {
		return this.props.id || this.generatedId;
	}

	render() {
		return (
			<div
				className={classNames('slds-expression', this.props.className)}
				id={this.getId()}
			>
				<h2 className="slds-expression__title">Conditions</h2>
				<ExpressionGroup
					isChild={false}
					customLogic={this.props.customLogic}
					onChangeCustomLogic={this.props.onChangeCustomLogic}
					triggerType={this.props.triggerType}
					onChangeTrigger={this.props.onChangeTrigger}
					onAddCondition={this.props.onAddCondition}
					onAddGroup={this.props.onAddGroup}
				>
					{this.props.children}
				</ExpressionGroup>
			</div>
		);
	}
}

Expression.displayName = EXPRESSION;
Expression.propTypes = propTypes;

export default Expression;
