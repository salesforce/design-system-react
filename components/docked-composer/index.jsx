import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import Button from '../button';

const propTypes = {
	/**
	 * HTML id for component.
	 * _Tested with snapshot testing._
	 */
	id: PropTypes.string,
	/**
	 * Whether the docked composer is open or closed.
	 * _Tested with snapshot testing._
	 */
	isOpen: PropTypes.bool,
	/**
	 * Text or node to display in the header.
	 * _Tested with snapshot testing._
	 */
	header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/**
	 * Body of the composer.
	 * _Tested with snapshot testing._
	 */
	body: PropTypes.node,
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `expandButton`: This is a visually hidden label for expand button shown when the composer is minimized.
	 * * `minimizeButton`: This is a visually hidden label for minimize button shown when the composer is expanded.
	 * * `closeButton`: This is a visually hidden label for close button.
	 * _Tested with snapshot testing._
	 */
	assistiveText: PropTypes.shape({
		expandButton: PropTypes.string,
		minimizeButton: PropTypes.string,
		closeButton: PropTypes.string,
	}),
	/**
	 * Additional class name added to the container with slds-docked_container class.
	 * _Tested with snapshot testing._
	 */
	classNameContainer: PropTypes.string,
	/**
	 * Event Callbacks
	 * * `onRequestMinimize`: Called when minimize button is clicked.
	 * * `onRequestExpand`: Called when the expand button is clicked.
	 * * `onRequestClose`: Called when the close button is clicked.
	 * _Tested with Mocha testing._
	 */
	events: PropTypes.shape({
		onRequestMinimize: PropTypes.func,
		onRequestExpand: PropTypes.func,
		onRequestClose: PropTypes.func,
	}),
};

const defaultProps = {
	assistiveText: {
		expandButton: 'Expand',
		minimizeButton: 'Minimize',
		closeButton: 'Close',
	},
};

/**
 * The Docked Composer is a persistent utility bar that allows a user to continually use the app to complete tasks or gather information while expanding/collapsing a composer window. [component blueprint guidelines](https://www.lightningdesignsystem.com/components/docked-composer/).
 */
class DockedComposer extends React.Component {
	constructor(props) {
		super(props);
		this.generatedId = shortid.generate();
	}

	getId() {
		return this.props.id || this.generatedId;
	}

	render() {
		const sectionClassName = this.props.isOpen
			? 'slds-is-open'
			: 'slds-is-closed';
		return (
			<div
				id={`${this.getId()}-container`}
				className={`slds-docked_container${
					this.props.classNameContainer
						? ` ${this.props.classNameContainer}`
						: ''
				}`}
			>
				<section
					className={`slds-docked-composer slds-grid slds-grid_vertical ${sectionClassName}`}
					role="dialog"
					aria-labelledby={`${this.getId()}-dialog-heading`}
					aria-describedby={`${this.getId()}-body`}
				>
					<header
						className="slds-docked-composer__header slds-grid slds-shrink-none"
						aria-live="assertive"
					>
						<div className="slds-media slds-media_center slds-no-space">
							<div className="slds-media__body">
								<h2
									className="slds-truncate"
									id={`${this.getId()}-dialog-heading`}
									title={this.props.header}
								>
									{this.props.header}
								</h2>
							</div>
						</div>
						<div className="slds-col_bump-left slds-shrink-none">
							{this.props.isOpen ? (
								<Button
									id={`${this.getId()}-minimize-button`}
									title={this.props.assistiveText.minimizeButton}
									assistiveText={{
										icon: this.props.assistiveText.minimizeButton,
									}}
									onClick={this.props.events.onRequestMinimize}
									iconCategory="utility"
									iconName="minimize_window"
									iconVariant="bare"
									variant="icon"
								/>
							) : (
								<Button
									id={`${this.getId()}-expand-button`}
									title={this.props.assistiveText.expandButton}
									assistiveText={{
										icon: this.props.assistiveText.expandButton,
									}}
									onClick={this.props.events.onRequestExpand}
									iconCategory="utility"
									iconName="expand_alt"
									iconVariant="bare"
									variant="icon"
								/>
							)}
							<Button
								id={`${this.getId()}-close-button`}
								title={this.props.assistiveText.closeButton}
								assistiveText={{
									icon: this.props.assistiveText.closeButton,
								}}
								onClick={this.props.events.onRequestClose}
								iconCategory="utility"
								iconName="close"
								iconVariant="bare"
								variant="icon"
							/>
						</div>
					</header>
					{this.props.isOpen ? (
						<div
							className="slds-docked-composer__body"
							id={`${this.getId()}-body`}
						>
							{this.props.body}
						</div>
					) : undefined}
				</section>
			</div>
		);
	}
}

DockedComposer.propTypes = propTypes;
DockedComposer.defaultProps = defaultProps;

export default DockedComposer;
