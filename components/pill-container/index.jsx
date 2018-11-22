/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Pill Container Component
// Implements the [Listbox of Pill Options design pattern](https://www.lightningdesignsystem.com/components/pills/?variant=listbox-of-pill-options) in React.

import React from 'react';
import PropTypes from 'prop-types';
import SelectedListBox from '~/components/pill-container/private/selected-listbox';

import { PILL_CONTAINER } from '../../utilities/constants';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * * `listboxLabel`: This is a label for the listbox. The default is `Selected Options:`.
	 * * `removePill`: Used to remove a selected item (pill). Focus is on the pill. This is not a button. The default is `Press delete or backspace to remove`.
	 */
	assistiveText: PropTypes.shape({
		listboxLabel: PropTypes.string,
		removePill: PropTypes.string,
	}),
	/**
	 * HTML id for Pill Container
	 */
	id: PropTypes.string,
	/**
	 * **Text labels for internationalization**
	 * * `removePillTitle`: Title on `X` icon
	 */
	labels: PropTypes.shape({
		removePillTitle: PropTypes.string,
	}),
	/**
	 * Accepts an array of pill item objects.
	 */
	options: PropTypes.array,
	/**
	 * Function called when a pill is clicked
	 */
	onClickPill: PropTypes.func,
	/**
	 * Function called when a pill is 'removed' via the delete key or 'X' icon click
	 */
	onRemovePill: PropTypes.func,
};

/**
 * A PillContainer is a container that holds one or more pills
 */
class PillContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			// seeding initial state with this.props.options[0]
			activeSelectedOption:
				(this.props.options && this.props.options[0]) || undefined,
			activeSelectedOptionIndex: 0,
			listboxHasFocus: false,
		};

		this.activeSelectedOptionRef = null;
	}

	componentDidUpdate() {
		if (
			this.props.options &&
			!this.props.options[this.state.activeSelectedOptionIndex]
		) {
			this.resetActiveSelectedOption();
		}
	}

	getNewActiveOptionIndex = ({ activeOptionIndex, offset, options }) => {
		// used by menu listbox and selected options listbox
		const nextIndex = activeOptionIndex + offset;
		const skipIndex =
			options.length > nextIndex &&
			nextIndex >= 0 &&
			options[nextIndex].type === 'separator';
		const newIndex = skipIndex ? nextIndex + offset : nextIndex;
		const hasNewIndex = options.length > newIndex && newIndex >= 0;
		return hasNewIndex ? newIndex : activeOptionIndex;
	};

	handleBlurPill = () => {
		this.setState({ listboxHasFocus: false });
	};

	handleClickPill = (event, data) => {
		this.setState({
			activeSelectedOption: data.option,
			activeSelectedOptionIndex: data.index,
		});
		if (this.props.onClickPill) {
			this.props.onClickPill(event, {
				index: data.index,
				option: data.option,
			});
		}
	};

	handleNavigatePillContainer = (event, { direction }) => {
		const offsets = { next: 1, previous: -1 };
		this.setState((prevState) => {
			const options = this.props.options;
			const isLastOptionAndRightIsPressed =
				prevState.activeSelectedOptionIndex + 1 === options.length &&
				direction === 'next';
			const isFirstOptionAndLeftIsPressed =
				prevState.activeSelectedOptionIndex === 0 && direction === 'previous';
			let newState;

			if (isLastOptionAndRightIsPressed) {
				newState = {
					activeSelectedOption: options[0],
					activeSelectedOptionIndex: 0,
					listboxHasFocus: true,
				};
			} else if (isFirstOptionAndLeftIsPressed) {
				newState = {
					activeSelectedOption: options[options.length - 1],
					activeSelectedOptionIndex: options.length - 1,
					listboxHasFocus: true,
				};
			} else {
				const newIndex = this.getNewActiveOptionIndex({
					activeOptionIndex: prevState.activeSelectedOptionIndex,
					offset: offsets[direction],
					options,
				});
				newState = {
					activeSelectedOption: options[newIndex],
					activeSelectedOptionIndex: newIndex,
					listboxHasFocus: true,
				};
			}

			return newState;
		});
	};

	handleRequestFocusPillContainer = (event, { ref }) => {
		if (ref) {
			this.activeSelectedOptionRef = ref;
			this.activeSelectedOptionRef.focus();
		}
	};

	handleRequestRemove = (event, data) => {
		if (this.props.onRemovePill) {
			this.props.onRemovePill(event, {
				index: data.index,
				option: data.option,
			});
		}
	};

	resetActiveSelectedOption = () => {
		const options = this.props.options;
		let activeSelectedOptionIndex = this.state.activeSelectedOptionIndex;

		while (
			!options[activeSelectedOptionIndex] &&
			activeSelectedOptionIndex > 0
		) {
			activeSelectedOptionIndex--;
		}

		this.setState({
			activeSelectedOption: options[activeSelectedOptionIndex] || undefined,
			activeSelectedOptionIndex,
		});
	};

	render() {
		return (
			<SelectedListBox
				activeOption={this.state.activeSelectedOption}
				activeOptionIndex={this.state.activeSelectedOptionIndex}
				assistiveText={{
					removePill: this.props.assistiveText.removePill,
					selectedListboxLabel: this.props.assistiveText.listboxLabel,
				}}
				events={{
					onBlurPill: this.handleBlurPill,
					onClickPill: this.handleClickPill,
					onRequestFocus: this.handleRequestFocusPillContainer,
					onRequestFocusOnNextPill: this.handleNavigatePillContainer,
					onRequestFocusOnPreviousPill: this.handleNavigatePillContainer,
					onRequestRemove: this.handleRequestRemove,
				}}
				id={`${this.props.id}-listbox-of-pill-options`}
				isPillContainer
				labels={this.props.labels}
				listboxHasFocus={this.state.listboxHasFocus}
				renderAtSelectionLength={0}
				selection={this.props.options}
			/>
		);
	}
}

PillContainer.displayName = PILL_CONTAINER;

PillContainer.defaultProps = {
	assistiveText: {
		listboxLabel: 'Selected Options:',
		removePill: 'Press delete or backspace to remove',
	},
	labels: {
		removePillTitle: 'Remove',
	},
};

PillContainer.propTypes = propTypes;

export default PillContainer;
