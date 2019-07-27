/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Docked Composer design pattern](https://lightningdesignsystem.com/components/docked-composer/) in React.
// Based on SLDS v2.9.4
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import shortid from 'shortid';

import { DOCKED_COMPOSER } from '../../utilities/constants';

import Button from '../button';

const propTypes = {
	actionButton: PropTypes.node,
	composerBody: PropTypes.node,
	header: PropTypes.shape({
		icon: PropTypes.node,
		label: PropTypes.string,
	}),
	id: PropTypes.string,
	isOpen: PropTypes.bool,
};

class DockedComposer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.isOpen,
			hasFocus: false,
		};
	}

	componentWillMount() {
		this.generatedId = shortid.generate();
	}

	getId = () => this.props.id || this.generatedId;

	getIsOpen = () =>
		!!(typeof this.props.isOpen === 'boolean'
			? this.props.isOpen
			: this.state.isOpen);

	getHasFocus = () => {};

	getComposerHeader = () => {
		return (
			<header
				className="slds-docked-composer__header slds-grid slds-shrink-none"
				aria-live="assertive"
			>
				<div className="slds-media slds-media_center slds-no-space">
					<div className="slds-media__figure slds-m-right_x-small">
						<span className="slds-icon_container">
							<svg
								className="slds-icon slds-icon_small slds-icon-text-default"
								aria-hidden="true"
							>
								<use xlinkHref="/assets/icons/standard-sprite/svg/symbols.svg#call" />
							</svg>
						</span>
					</div>
					<div className="slds-media__body">
						<h2
							className="slds-truncate"
							id="dialog-heading-id-1"
							title="Header"
						>
							Header
						</h2>
					</div>
				</div>
				<div className="slds-col_bump-left slds-shrink-none">
					<Button
						assistiveText={{ icon: 'Minimize Composer Panel' }}
						iconName="minimize_window"
						category="utility"
						title="Minimize Window"
						variant="icon"
						onClick={this.handleMinimize}
					/>
					<Button
						assistiveText={{ icon: 'Expand Composer Panel' }}
						iconName="expand_alt"
						category="utility"
						title="Expand Composer"
						variant="icon"
						onClick={this.handleExpand}
					/>
					<Button
						assistiveText={{ icon: 'Close Composer Panel' }}
						iconName="close"
						category="utility"
						title="Close"
						variant="icon"
						onClick={this.handleClose}
					/>
				</div>
			</header>
		);
	};

	getComposerBody = () => {
		return (
			<div className="slds-docked-composer__body" id="dialog-content-id-1">
				{this.props.composerBody}
				{/* <div className="slds-align_absolute-center">
					Docked Composer Panel Body
					<br /> This area consumes the feature
				</div> */}
			</div>
		);
	};

	getComposerFooter = () => {
		return (
			<footer className="slds-docked-composer__footer slds-shrink-none">
				<div className="slds-col_bump-left slds-text-align_right">
					{this.props.actionButton}
				</div>
			</footer>
		);
	};

	handleFocus = () => {};

	handleMinimize = () => {
		this.setState({ isOpen: false });
	};

	handleExpand = () => {
		this.setState({ isOpen: true });
	};

	handleClose = () => {};

	render() {
		return (
			<div className="slds-docked_container">
				<section
					className={classNames(
						'slds-docked-composer slds-grid slds-grid_vertical',
						{
							'slds-is-open': this.getIsOpen(),
							'slds-has-focus': this.getHasFocus(),
							'slds-is-closed': !this.getIsOpen(),
						}
					)}
					role="dialog"
					aria-labelledby="dialog-heading-id-1"
					aria-describedby="dialog-content-id-1"
				>
					{this.getComposerHeader()}
					{this.getComposerBody()}
					{this.getComposerFooter()}
				</section>
			</div>
		);
	}
}

DockedComposer.displayName = DOCKED_COMPOSER;
DockedComposer.propTypes = propTypes;

export default DockedComposer;
