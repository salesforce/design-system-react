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
	 * Text to display in the header.
	 * _Tested with snapshot testing._
	 */
	header: PropTypes.string,
	/**
	 * Event Callbacks
	 * * `onMinimize`: Called when minimize button is clicked.
	 * * `onExpand`: Called when the expand button is clicked.
	 * * `onClose`: Called when the close button is clicked.
	 * _Tested with Mocha testing._
	 */
	events: PropTypes.shape({
		onMinimize: PropTypes.func,
		onExpand: PropTypes.func,
		onClose: PropTypes.func,
	}),
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
		const thing = this.props.isOpen ? ' slds-is-open' : ' slds-is-closed';
		return (
			<div id={`${this.getId()}-container`} className="slds-docked_container">
				<section
					className={`slds-docked-composer slds-grid slds-grid_vertical${thing}`}
					role="dialog"
					aria-labelledby="dialog-heading-id-1"
					aria-describedby="dialog-content-id-1"
				>
					<header
						className="slds-docked-composer__header slds-grid slds-shrink-none"
						aria-live="assertive"
					>
						<div className="slds-media slds-media_center slds-no-space">
							<div className="slds-media__body">
								<h2
									className="slds-truncate"
									id="dialog-heading-id-1"
									title={this.props.header}
								>
									{this.props.header}
								</h2>
							</div>
						</div>
						<div className="slds-col_bump-left slds-shrink-none">
							<Button
								id={`${this.getId()}-minimize-button`}
								title="Minimize"
								assistiveText={{ icon: 'Minimize' }}
								onClick={this.props.events.onMinimize}
								iconCategory="utility"
								iconName="minimize_window"
								iconVariant="bare"
								variant="icon"
							/>
							<Button
								id={`${this.getId()}-expand-button`}
								title="Expand"
								assistiveText={{ icon: 'Expand' }}
								onClick={this.props.events.onExpand}
								iconCategory="utility"
								iconName="expand_alt"
								iconVariant="bare"
								variant="icon"
							/>
							<Button
								id={`${this.getId()}-close-button`}
								title="Close"
								assistiveText={{ icon: 'Close' }}
								onClick={this.props.events.onClose}
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

export default DockedComposer;
