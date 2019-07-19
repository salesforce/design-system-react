/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Expression Condition design pattern](https://lightningdesignsystem.com/components/visual-picker/) in React.
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import assign from 'lodash.assign';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

import { EXPRESSION_FORMULA } from '../../utilities/constants';

import Button from '../button';

const propTypes = {
	assistiveText: PropTypes.shape({
		help: PropTypes.string,
	}),
	/**
	 * HTML id for component.
	 */
	id: PropTypes.string,
	/**
	 * CSS classes to be added to tag with `.slds-form-element`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),

	labels: PropTypes.shape({
		label: PropTypes.string,
		checkSyntax: PropTypes.string,
	}),

	resourceCombobox: PropTypes.node,
	functionCombobox: PropTypes.node,
	operatorInput: PropTypes.node,

	onClickHelp: PropTypes.func,
	onClickCheckSyntax: PropTypes.func,
};

const defaultProps = {
	labels: {
		label: 'Formula',
		checkSyntax: 'Check Syntax',
	},
};
/**
 * Expression Formula Component
 */
class ExpressionFormula extends React.Component {
	componentWillMount() {
		this.generatedId = shortid.generate();
	}

	/**
	 * Get the Expression Condition's HTML id. Generate a new one if no ID present.
	 */
	getId() {
		return this.props.id || this.generatedId;
	}

	render() {
		const assistiveText = assign(
			{},
			defaultProps.assistiveText,
			this.props.assistiveText
		);
		const labels = assign({}, defaultProps.labels, this.props.labels);
		return (
			<>
				<div
					id={this.getId()}
					className={classNames(
						`slds-expression_formula__rte`,
						this.props.className
					)}
				>
					<div className="slds-form-element">
						<span className="slds-form-element__label">{labels.label}</span>
						<div className="slds-form-element__control">
							<div className="slds-rich-text-editor slds-grid slds-grid_vertical slds-nowrap">
								<div
									role="toolbar"
									className="slds-rich-text-editor__toolbar slds-shrink-none"
								>
									<div className="slds-rich-text-editor__col slds-rich-text-editor__col_grow">
										{this.props.resourceCombobox}
									</div>
									<div className="slds-rich-text-editor__col slds-rich-text-editor__col_grow">
										{this.props.functionCombobox}
									</div>
									<div className="slds-rich-text-editor__col slds-rich-text-editor__col_grow">
										{this.props.operatorInput}
									</div>
									<div className="slds-rich-text-editor__col">
										<Button
											assistiveText={{
												icon: assistiveText.help,
											}}
											variant="icon"
											iconCategory="utility"
											iconName="help"
											onClick={this.props.onClickHelp}
										/>
									</div>
								</div>
								<div className="slds-rich-text-editor__textarea slds-grid">
									<div
										aria-label="Compose formula"
										className="slds-rich-text-area__content slds-text-color_weak slds-grow"
									>
										Compose formula...
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="slds-m-top_small">
					<Button
						variant="neutral"
						label={labels.checkSyntax}
						onClick={this.props.onClickCheckSyntax}
					/>
				</div>
			</>
		);
	}
}

ExpressionFormula.displayName = EXPRESSION_FORMULA;
ExpressionFormula.propTypes = propTypes;
ExpressionFormula.defaultProps = defaultProps;

export default ExpressionFormula;
