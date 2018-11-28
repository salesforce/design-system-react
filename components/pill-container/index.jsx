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
	 * CSS classes to be added to the pill container
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * HTML id for pill container
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
	options: PropTypes.arrayOf(
		PropTypes.shape({
			avatar: PropTypes.oneOfType([
				PropTypes.node,
				PropTypes.shape({
					imgSrc: PropTypes.string,
					title: PropTypes.string,
					variant: PropTypes.string,
				}),
			]),
			bare: PropTypes.bool,
			error: PropTypes.bool,
			icon: PropTypes.oneOfType([
				PropTypes.node,
				PropTypes.shape({
					category: PropTypes.string,
					name: PropTypes.string,
				}),
			]),
			id: PropTypes.string,
			label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
			title: PropTypes.string,
		})
	),
	/**
	 * Function called when a pill is clicked
	 */
	onClickPill: PropTypes.func,
	/**
	 * Function called when a pill is requested to be 'removed' via the delete key or 'X' icon click
	 */
	onRequestRemovePill: PropTypes.func,
	/**
	 * Custom styles to be passed to the pill container
	 */
	style: PropTypes.object,
	/**
	 * Specifies the pill container styling. Can be `base` or `bare`, `bare` removes border styling from child pills
	 */
	variant: PropTypes.oneOf(['base', 'bare']),
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
		this.preserveFocus = false;
	}

	componentDidUpdate() {
		if (
			(this.props.options &&
				this.props.options.length > 0 &&
				!this.props.options[this.state.activeSelectedOptionIndex]) ||
			this.preserveFocus
		) {
			this.resetActiveSelectedOption();
			this.preserveFocus = false;
		}
	}

	getNewActiveOptionIndex = ({ activeOptionIndex, offset, options }) => {
		const nextIndex = activeOptionIndex + offset;
		return options.length > nextIndex && nextIndex >= 0
			? nextIndex
			: activeOptionIndex;
	};

	handleBlurPill = () => {
		if (!this.preserveFocus) {
			this.setState({ listboxHasFocus: false });
		} else {
			this.preserveFocus = false;
		}
	};

	handleClickPill = (event, data) => {
		this.setState({
			activeSelectedOption: data.option,
			activeSelectedOptionIndex: data.index,
			listboxHasFocus: true,
		});
		if (this.props.onClickPill) {
			this.props.onClickPill(event, {
				index: data.index,
				option: data.option,
			});
		}
	};

	handlePillFocus = () => {
		if (!this.state.listboxHasFocus) {
			this.setState({ listboxHasFocus: true });
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

			this.preserveFocus = true;
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
		if (this.props.onRequestRemovePill) {
			this.preserveFocus = true;
			this.props.onRequestRemovePill(event, {
				index: data.index,
				option: data.option,
			});
		}
	};

	resetActiveSelectedOption = () => {
		const options = this.props.options;
		let activeSelectedOptionIndex = this.state.activeSelectedOptionIndex;

		if (!options[activeSelectedOptionIndex]) {
			if (options.length > 0 && activeSelectedOptionIndex >= options.length) {
				activeSelectedOptionIndex = options.length - 1;
			} else {
				activeSelectedOptionIndex = 0;
			}
		}

		this.setState({
			activeSelectedOption: options[activeSelectedOptionIndex] || undefined,
			activeSelectedOptionIndex,
			listboxHasFocus: !!options[activeSelectedOptionIndex],
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
				className={this.props.className}
				events={{
					onBlurPill: this.handleBlurPill,
					onClickPill: this.handleClickPill,
					onPillFocus: this.handlePillFocus,
					onRequestFocus: this.handleRequestFocusPillContainer,
					onRequestFocusOnNextPill: this.handleNavigatePillContainer,
					onRequestFocusOnPreviousPill: this.handleNavigatePillContainer,
					onRequestRemove: this.handleRequestRemove,
				}}
				id={`${this.props.id}-listbox-of-pill-options`}
				isBare={this.props.variant === 'bare'}
				isPillContainer
				labels={this.props.labels}
				listboxHasFocus={this.state.listboxHasFocus}
				renderAtSelectionLength={0}
				selection={this.props.options}
				style={this.props.style}
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
