/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Expression Formula design pattern](https://lightningdesignsystem.com/components/expression/) in React.
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import assign from 'lodash.assign';
import ContentEditable from 'react-contenteditable';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

import { EXPRESSION_FORMULA } from '../../utilities/constants';

import Button from '../button';

const propTypes = {
	/**
	 *  **Assistive text for accessibility.**
	 * * `help`: Assistive text for help icon
	 */
	assistiveText: PropTypes.shape({
		help: PropTypes.string,
	}),
	/**
	 * HTML id for component.
	 */
	id: PropTypes.string,
	/**
	 * CSS classes to be added to the element with class `.slds-form-element`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Callbacks for various expression formula events such as text editor change, check syntax etc
	 */
	events: PropTypes.shape({
		onChangeTextEditor: PropTypes.func,
		onClickHelp: PropTypes.func,
		onClickCheckSyntax: PropTypes.func,
	}),
	/**
	 * **Text labels for internationalization**
	 * This object is merged with the default props object on every render.
	 * * `label`: Label for the Expression Formula group.Defaults to "Formula"
	 * * `checkSyntax`: Label for the Check Syntax Button. Defaults to "Check Syntax"
	 * * `textArea`: Label for the `triggerType` selector. Defaults to "Take Action When"
	 */
	labels: PropTypes.shape({
		label: PropTypes.string,
		checkSyntax: PropTypes.string,
		textArea: PropTypes.string,
	}),
	/**
	 *  Accepts a single combobox component, to select resource in the expression formula editor
	 */
	resourceCombobox: PropTypes.node,
	/**
	 *  Accepts a single combobox component, to select function in the expression formula editor
	 */
	functionCombobox: PropTypes.node,
	/**
	 *  Accepts a single input component, to enter operator in the expression formula editor
	 */
	operatorInput: PropTypes.node,
	/**
	 *  Value for the text editor in expression formula editor
	 */
	textEditorValue: PropTypes.node,
};

const defaultProps = {
	assistiveText: {
		help: 'Help',
	},
	labels: {
		label: 'Formula',
		checkSyntax: 'Check Syntax',
		textArea: 'Text Area',
	},
};
/**
 * Expression Formula Component
 */
class ExpressionFormula extends React.Component {
	constructor() {
		super();
		this.textEditorRef = React.createRef();
		this.state = {
			textEditorValue: 'Compose formula...', // default is set here to preserve functionality if not controlled by props.textEditorValue
		};
		this.generatedId = shortid.generate();
	}

	/**
	 * Get the Expression Condition's HTML id. Generate a new one if no ID present.
	 */
	getId() {
		return this.props.id || this.generatedId;
	}

	handleTextEditorChange = (event) => {
		const textEditorValue = event.target.value;

		if (this.props.textEditorValue === undefined) {
			this.setState({ textEditorValue });
		}

		if (this.props.events && this.props.events.onChangeTextEditor) {
			this.props.events.onChangeTextEditor(event, { textEditorValue });
		}
	};

	render() {
		const assistiveText = assign(
			{},
			defaultProps.assistiveText,
			this.props.assistiveText
		);
		const labels = assign({}, defaultProps.labels, this.props.labels);

		return (
			<React.Fragment>
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
											className="slds-button_icon-container"
											id={`${this.getId()}-help-button`}
											variant="icon"
											iconCategory="utility"
											iconName="help"
											onClick={this.props.events.onClickHelp}
											title={assistiveText.help}
										/>
									</div>
								</div>
								<div className="slds-rich-text-editor__textarea slds-grid">
									<ContentEditable
										id={`${this.getId()}-content-editor`}
										aria-label={this.props.labels.textArea}
										className="slds-rich-text-area__content slds-text-color_weak slds-grow"
										innerRef={this.textEditorRef}
										html={
											this.props.textEditorValue !== undefined
												? this.props.textEditorValue
												: this.state.textEditorValue
										}
										onChange={this.handleTextEditorChange}
										disabled={false}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="slds-m-top_small">
					<Button
						id={`${this.getId()}-check-syntax-button`}
						variant="neutral"
						label={labels.checkSyntax}
						onClick={this.props.events.onClickCheckSyntax}
					/>
				</div>
			</React.Fragment>
		);
	}
}

ExpressionFormula.displayName = EXPRESSION_FORMULA;
ExpressionFormula.propTypes = propTypes;
ExpressionFormula.defaultProps = defaultProps;

export default ExpressionFormula;
