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
import assign from 'lodash.assign';

const propTypes = {
	/**
	 * HTML id for component.
	 */
	id: PropTypes.string,
	/**
	 * ExpressionGroup accepts `ExpressionCondition` & `ExpressionGroup`
	 */
	children: PropTypes.node,

	labels: PropTypes.shape({
		title: PropTypes.string,
		label: PropTypes.string,
		customLogic: PropTypes.string,
		takeAction: PropTypes.string,
		addCondition: PropTypes.string,
		addGroup: PropTypes.string,
	}),

	events: PropTypes.shape({
		onChangeTrigger: PropTypes.func,
		onAddGroup: PropTypes.func,
		onChangeCustomLogicValue: PropTypes.func,
	}),
	/**
	 * CSS classes to be added to tag with `.slds-expression`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),

	onAddCondition: PropTypes.func,

	triggerType: PropTypes.oneOf(['all', 'any', 'custom', 'always', 'formula']),

	customLogicValue: PropTypes.string,
};

const defaultProps = {
		labels: {
			title: 'Conditions'
		}
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

		const labels = assign({}, defaultProps.labels, this.props.labels);

		return (
			<div
				className={classNames('slds-expression', this.props.className)}
				id={this.getId()}
			>
				<h2 className="slds-expression__title">{labels.title}</h2>
				<ExpressionGroup
					isRoot
					events={{
						onChangeCustomLogicValue: this.props.events
							.onChangeCustomLogicValue,
						onChangeTrigger: this.props.events.onChangeTrigger,
						onAddCondition: this.props.events.onAddCondition,
						onAddGroup: this.props.events.onAddGroup,
					}}
					labels={labels}
					customLogicValue={this.props.customLogicValue}
					triggerType={this.props.triggerType}
				>
					{this.props.children}
				</ExpressionGroup>
			</div>
		);
	}
}

Expression.displayName = EXPRESSION;
Expression.propTypes = propTypes;
Expression.defaultProps = defaultProps;

export default Expression;
