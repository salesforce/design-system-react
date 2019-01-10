import React from 'react';
import Column from './column';
import Options from './options';
import Button from './button';
import { wrapItemAndAddIsSelected } from './utility';
import { AriaLiveMoveContexts } from './constants';

export default class Group extends React.Component {
	getAriaLiveLabel(message) {
		const {
			labels,
			selection,
		} = this.props;
		const itemLabels = selection.map(item => item.label);

		let words;
		if (itemLabels.length > 1) {
			words = `${itemLabels.slice(0, -1).join(', ')}, and ${itemLabels.slice(-1)[0]}`;
		} else {
			words = itemLabels[0];
		}

		return `${words} ${message} ${labels.selected}`;
	}

	getAriaLiveMessage() {
		const {
			ariaLiveContext,
			assistiveText
		} = this.props;
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
				return itemsMovedToSelection || this.getAriaLiveLabel('moved to');
			case AriaLiveMoveContexts.ItemsRemovedFromSelection:
				return itemsRemovedFromSelection || this.getAriaLiveLabel('removed from');
			case AriaLiveMoveContexts.ItemsReorderedInSelection:
				return itemsReorderedInSelection || this.getAriaLiveLabel('reordered in');
		}
	}
	
	render() {
		const {
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
		} = this.props;
		
		if (isViewOnly) {
			return this.renderViewOnlyMode();
		}
		
		const allOptions = [
			wrapItemAndAddIsSelected(options, selection),
			wrapItemAndAddIsSelected(selected, selection),
		];
		
		const maxItems = options.length > selected.length ? options.length : selected.length;
		const heightProp = listboxHeight || hasAutomaticHeightMinimization ? {
			height: listboxHeight || `${2.25 * maxItems + 1}rem`,
		} : {};
		return (
			<div
				className="slds-form-element"
				role="group"
				aria-labelledby={ids.picklistGroupLabel}
				onKeyUp={onKeyUp}
				onKeyDown={onKeyDown}
			>
				<span id={ids.picklistGroupLabel} className="slds-form-element__label slds-form-element__legend">
					{isRequired && <abbr className="slds-required" title="required">* </abbr>}
					{labels.group}
				</span>
				{tooltip}
				<div className="slds-form-element__control">
					<div className="slds-dueling-list">
						<div className="slds-assistive-text" id={ids.dragLiveRegion} aria-live="assertive">
							{this.getAriaLiveMessage()}
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
								assistiveText={assistiveText.moveSelectionToSelected || `Move selection to ${labels.selected}`}
								direction='right'
								disabled={isDisabled}
							/>
							<Button
								onClick={onMoveSelectionLeftClick}
								assistiveText={assistiveText.moveSelectionToOptions || `Move selection to ${labels.options}`}
								direction='left'
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
						{this.renderReorderingButtons()}
					</div>
				</div>
			</div>
		);
	}
	
	
	renderReorderingButtons() {
		const {
			isReorderable,
			isDisabled,
			assistiveText,
			onMoveSelectionUpClick,
			onMoveSelectionDownClick,
		} = this.props;

		if (!isReorderable) {
			return null;
		}

		return (
			<Column>
				<Button
					onClick={onMoveSelectionUpClick}
					assistiveText={assistiveText.moveSelectionUp}
					direction='up'
					disabled={isDisabled}
				/>
				<Button
					onClick={onMoveSelectionDownClick}
					assistiveText={assistiveText.moveSelectionDown}
					direction='down'
					disabled={isDisabled}
				/>
			</Column>
		);
	}
	
	renderViewOnlyMode() {
		const { selected, labels } = this.props;
		return (
			<div className="slds-dueling-list">
				<div className="slds-form-element">
					<span className="slds-form-element__label">
						{labels.selectedItems}
					</span>
					<div className="slds-form-element__control">
						<span className="slds-form-element__static">
							{selected.map(({ label }) => label).join(', ')}
						</span>
					</div>
				</div>
			</div>
		);
	}

}