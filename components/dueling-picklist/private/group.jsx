import React from 'react';
import PropTypes from 'prop-types';
import Column from './column';
import Options from './options';
import Button from './button';
import ViewOnly from './view-only';
import {
	wrapItemAndAddIsSelected,
	getAriaLiveMessage,
	getHeightForListboxBasedOnNumberOfOptions,
} from './utility';

const Group = ({
	ariaLiveContext,
	assistiveText,
	dragAndDropWithArrowKeys,
	events,
	focusedOptionId,
	hasAutomaticHeightMinimization,
	ids,
	isDragging,
	isDisabled,
	isReorderable,
	isRequired,
	isResponsive,
	isViewOnly,
	labels,
	listboxHeight,
	options,
	refs,
	selected,
	selection,
	tooltip,
}) => {
	if (isViewOnly) {
		return <ViewOnly labels={labels} selected={selected} />;
	}

	const {
		onBeginDrag,
		onEndDrag,
		onDropIntoCategory,
		onDropOntoOption,
		onFocus,
		onKeyDown,
		onKeyUp,
		onMoveSelectionDownClick,
		onMoveSelectionLeftClick,
		onMoveSelectionRightClick,
		onMoveSelectionUpClick,
		onSelect,
	} = events;

	const allOptions = [
		wrapItemAndAddIsSelected(options, selection),
		wrapItemAndAddIsSelected(selected, selection),
	];

	const maxItems =
		options.length > selected.length ? options.length : selected.length;
	const heightProp =
		listboxHeight || hasAutomaticHeightMinimization
			? {
					height:
						listboxHeight ||
						getHeightForListboxBasedOnNumberOfOptions(maxItems),
				}
			: {};

	const groupEvents = { onKeyUp, onKeyDown };

	return (
		<div
			className="slds-form-element"
			role="group"
			aria-labelledby={ids.picklistGroupLabel}
			{...groupEvents}
		>
			<span
				id={ids.picklistGroupLabel}
				className="slds-form-element__label slds-form-element__legend"
			>
				{isRequired && (
					<abbr className="slds-required" title="required">
						*{' '}
					</abbr>
				)}
				{labels.group}
			</span>
			{tooltip}
			<div className="slds-form-element__control">
				<div className="slds-dueling-list">
					<div
						className="slds-assistive-text"
						id={ids.dragLiveRegion}
						aria-live="assertive"
					>
						{getAriaLiveMessage({
							ariaLiveContext,
							assistiveText,
							labels,
							selection,
						})}
					</div>
					<div className="slds-assistive-text" id={ids.optionDragLabel}>
						{assistiveText.optionDragLabel}
					</div>
					<Column responsive={isResponsive}>
						<Options
							options={allOptions[0]}
							ids={{
								label: ids.optionsLabel,
								describedBy: ids.optionDragLabel,
							}}
							label={labels.options}
							onSelect={onSelect}
							disabled={isDisabled}
							assistiveText={assistiveText}
							refs={refs}
							focus={onFocus}
							focusedOptionId={focusedOptionId}
							{...heightProp}
						/>
					</Column>
					<Column>
						<Button
							onClick={onMoveSelectionRightClick}
							assistiveText={
								assistiveText.moveSelectionToSelected ||
								`Move selection to ${labels.selected}`
							}
							direction="right"
							disabled={isDisabled}
						/>
						<Button
							onClick={onMoveSelectionLeftClick}
							assistiveText={
								assistiveText.moveSelectionToOptions ||
								`Move selection to ${labels.options}`
							}
							direction="left"
							disabled={isDisabled}
						/>
					</Column>
					<Column responsive={isResponsive}>
						<Options
							options={allOptions[1]}
							ids={{
								label: ids.selectedLabel,
								describedBy: ids.optionDragLabel,
							}}
							label={labels.selected}
							onSelect={onSelect}
							disabled={isDisabled}
							assistiveText={assistiveText}
							refs={refs}
							focus={onFocus}
							focusedOptionId={focusedOptionId}
							{...heightProp}
							dragAndDropEnabled={isReorderable}
							onDropOntoOption={onDropOntoOption}
							onDropIntoCategory={onDropIntoCategory}
							dragAndDropWithArrowKeys={dragAndDropWithArrowKeys}
							beginDrag={onBeginDrag}
							endDrag={onEndDrag}
							isDragging={isDragging}
						/>
					</Column>
					{isReorderable && (
						<Column>
							<Button
								onClick={onMoveSelectionUpClick}
								assistiveText={assistiveText.moveSelectionUp}
								direction="up"
								disabled={isDisabled}
							/>
							<Button
								onClick={onMoveSelectionDownClick}
								assistiveText={assistiveText.moveSelectionDown}
								direction="down"
								disabled={isDisabled}
							/>
						</Column>
					)}
				</div>
			</div>
		</div>
	);
};

Group.propTypes = {
	assistiveText: PropTypes.shape({
		optionDragLabel: PropTypes.string,
		itemLocked: PropTypes.string,
		itemsSelected: PropTypes.string,
		itemsDeselected: PropTypes.string,
		lockedItemCannotBeMoved: PropTypes.string,
		selectedItemsReordered: PropTypes.string,
		moveSelectionDown: PropTypes.string,
		moveSelectionUp: PropTypes.string,
		moveSelectionToOptions: PropTypes.string,
		moveSelectionToSelected: PropTypes.string,
	}),
	hasAutomaticHeightMinimization: PropTypes.bool,
	ids: PropTypes.shape({
		picklistGroupLabel: PropTypes.string,
		dragLiveRegion: PropTypes.string,
		optionDragLabel: PropTypes.string,
		optionsLabel: PropTypes.string,
		selectedLabel: PropTypes.string,
	}),
	isDisabled: PropTypes.bool,
	isViewOnly: PropTypes.bool,
	isReorderable: PropTypes.bool,
	isRequired: PropTypes.bool,
	isResponsive: PropTypes.bool,
	labels: PropTypes.shape({
		group: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
		options: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
		selected: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
		viewModeSelectedItems: PropTypes.oneOfType([
			PropTypes.node,
			PropTypes.string,
		]),
	}),
	listboxHeight: PropTypes.string,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired,
		})
	).isRequired,
	selected: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired,
			isLocked: PropTypes.bool,
		})
	).isRequired,
	tooltip: PropTypes.node,
	refs: PropTypes.object,
	events: PropTypes.shape({
		onBeginDrag: PropTypes.func.isRequired,
		onEndDrag: PropTypes.func.isRequired,
		onDropOntoOption: PropTypes.func.isRequired,
		onDropIntoCategory: PropTypes.func.isRequired,
		onKeyUp: PropTypes.func.isRequired,
		onKeyDown: PropTypes.func.isRequired,
		onFocus: PropTypes.func.isRequired,
		onMoveSelectionLeftClick: PropTypes.func.isRequired,
		onMoveSelectionRightClick: PropTypes.func.isRequired,
		onMoveSelectionUpClick: PropTypes.func.isRequired,
		onMoveSelectionDownClick: PropTypes.func.isRequired,
		onSelect: PropTypes.func.isRequired,
	}),
};

export default Group;
