import React from 'react';
import Column from './column';
import Options from './options';
import Button from './button';
import ViewOnly from './view-only';
import { wrapItemAndAddIsSelected } from './utility';
import { AriaLiveMoveContexts } from './constants';

const Group = ({
	assistiveText,
	dragAndDropWithArrowKeys,
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
	onBeginDrag,
	onEndDrag,
	onDropIntoCategory,
	onDropOntoOption,
	onFocus,
	onKeyDown,
	onKeyUp,
	onMoveSelectionLeftClick,
	onMoveSelectionRightClick,
	onSelect,
	options,
	refs,
	selected,
	selection,
	tooltip,
}) => {
	if (isViewOnly) {
		return <ViewOnly labels={labels} selected={selected} />;
	}

	const allOptions = [
		wrapItemAndAddIsSelected(options, selection),
		wrapItemAndAddIsSelected(selected, selection),
	];

	const maxItems =
		options.length > selected.length ? options.length : selected.length;
	const heightProp =
		listboxHeight || hasAutomaticHeightMinimization
			? {
				height: listboxHeight || `${2.25 * maxItems + 1}rem`,
			}
			: {};

	return (
		<div
			className="slds-form-element"
			role="group"
			aria-labelledby={ids.picklistGroupLabel}
			onKeyUp={onKeyUp}
			onKeyDown={onKeyDown}
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
						{getAriaLiveMessage(ariaLiveContext, assistiveText)}
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

function getAriaLiveMessage (ariaLiveContext, assistiveText) {
	if (!ariaLiveContext) {
		return null;
	}

	const {
		itemsMovedToSelection,
		itemsRemovedFromSelection,
		itemsReorderedInSelection,
	} = assistiveText;

	switch (ariaLiveContext) {
		case AriaLiveMoveContexts.ItemsMovedToSelection:
			return (
				itemsMovedToSelection || getAriaLiveLabel('moved to', labels, selection)
			);
		case AriaLiveMoveContexts.ItemsRemovedFromSelection:
			return (
				itemsRemovedFromSelection ||
				getAriaLiveLabel('removed from', labels, selection)
			);
		case AriaLiveMoveContexts.ItemsReorderedInSelection:
			return (
				itemsReorderedInSelection ||
				getAriaLiveLabel('reordered in', labels, selection)
			);
	}
}

function getAriaLiveLabel (message, labels, selection) {
	const itemLabels = selection.map((item) => item.label);

	let words;
	if (itemLabels.length > 1) {
		words = `${itemLabels.slice(0, -1).join(', ')}, and ${
			itemLabels.slice(-1)[0]
		}`;
	} else {
		words = itemLabels[0];
	}

	return `${words} ${message} ${labels.selected}`;
}

export default Group;
