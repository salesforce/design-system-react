/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import classNames from 'classnames';
import isBoolean from 'lodash.isboolean';

import ToggleButton, { TOGGLE_BUTTON_WIDTH } from './private/toggle-button';

import { SPLIT_VIEW } from '../../utilities/constants';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * * `toggleButtonOpen`: The button used to open the split view.
	 * * `toggleButtonClose`: The button used to close the split view.
	 */
	assistiveText: PropTypes.shape({
		toggleButtonOpen: PropTypes.string,
		toggleButtonClose: PropTypes.string
	}),
	/**
	 * HTML Id for the component.
	 */
	id: PropTypes.string,
	/**
	 * CSS classes to be added to the root `div` tag. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string
	]),
	/**
	 * Sets the split view to be open or closed.
	 */
	isOpen: PropTypes.bool,
	/**
	 * Event Callbacks
	 * * `onClose`: Triggered when the split view has closed.
	 * * `onOpen`: Triggered when the split view has opened.
	 */
	events: PropTypes.shape({
		onClose: PropTypes.func,
		onOpen: PropTypes.func
	}),
	/**
	 * The React component that is rendered in the master section.
	 * You need to pass in an array of elements in order for the scrolling to in the SplitViewList to work correctly.
	 * React requires that you also supply a unique `key` for each element [React Lists and Keys](https://reactjs.org/docs/lists-and-keys.html#keys).
	 */
	master: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.element),
		PropTypes.element
	]).isRequired,
	/**
	 * The width of the master section.
	 */
	masterWidth: PropTypes.string,
	/**
	 * The React component that is rendered in the detail section.
	 */
	detail: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.element),
		PropTypes.element
	]).isRequired
};

const defaultProps = {
	assistiveText: {
		toggleButtonOpen: 'Close split view',
		toggleButtonClose: 'Open split view'
	},
	events: {},
	masterWidth: '20rem'
};

/**
 * Split view is used to navigate between records in a list while staying on the same screen.
 */
class SplitView extends React.Component {
	static displayName = SPLIT_VIEW;
	static propTypes = propTypes;
	static defaultProps = defaultProps;

	constructor (props) {
		super(props);

		this.state = {
			isOpen: true
		};
	}

	componentWillMount () {
		this.generatedId = shortid.generate();

		this.setIsOpen(this.props.isOpen);
	}

	componentWillReceiveProps (nextProps) {
		if (nextProps.isOpen !== this.props.isOpen) {
			this.setIsOpen(nextProps.isOpen);
		}
	}

	getId () {
		return this.props.id || this.generatedId;
	}

	getMasterViewId () {
		return `master_view_${this.getId()}`;
	}

	setIsOpen (isOpen) {
		if (isBoolean(isOpen)) {
			this.setState({
				isOpen
			});
		}
	}

	toggle (event) {
		this.setIsOpen(!this.state.isOpen);

		if (this.state.isOpen && this.props.events.onClose) {
			this.props.events.onClose(event);
		} else if (!this.state.isOpen && this.props.events.onOpen) {
			this.props.events.onOpen(event);
		}
	}

	masterContent () {
		return this.state.isOpen ? (
			<article
				id={this.getMasterViewId()}
				className="slds-split-view slds-grid slds-grid_vertical slds-grow slds-scrollable_none"
			>
				{this.props.master}
			</article>
		) : null;
	}

	render () {
		return (
			<div
				id={this.getId()}
				className={classNames('slds-grid', this.props.className)}
				style={{
					height: '100%'
				}}
			>
				<div
					style={{
						maxWidth: this.state.isOpen ? this.props.masterWidth : '0'
					}}
					className={classNames(
						'slds-split-view_container',
						{ 'slds-is-open': this.state.isOpen },
						{ 'slds-is-closed': !this.state.isOpen }
					)}
				>
					<ToggleButton
						assistiveText={this.props.assistiveText}
						ariaControls={this.getMasterViewId()}
						isOpen={this.state.isOpen}
						events={{
							onClick: (event) => this.toggle(event)
						}}
					/>
					{this.masterContent()}
				</div>
				<div
					style={{
						marginLeft: TOGGLE_BUTTON_WIDTH
					}}
					className="slds-grow slds-scrollable_y"
				>
					{this.props.detail}
				</div>
			</div>
		);
	}
}

export default SplitView;
