import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DropTarget } from 'react-dnd';
import Option from './option';

class Options extends React.Component {
	static propTypes = {
		options: PropTypes.arrayOf(
			PropTypes.shape({
				item: PropTypes.shape({
					id: PropTypes.string.isRequired,
					label: PropTypes.string.isRequired,
					isLocked: PropTypes.bool,
				}),
				selected: PropTypes.bool.isRequired,
			})
		).isRequired,
		assistiveText: PropTypes.shape({
			itemLocked: PropTypes.string,
		}),
		ids: PropTypes.shape({
			describedBy: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		}).isRequired,
		onSelect: PropTypes.func.isRequired,
		disabled: PropTypes.bool,
		height: PropTypes.string,
		dragAndDropWithArrowKeys: PropTypes.bool,
		dragAndDropEnabled: PropTypes.bool,
		onDropOntoOption: PropTypes.func,
		onDropIntoCategory: PropTypes.func,
		beginDrag: PropTypes.func,
		endDrag: PropTypes.func,
		focusedOptionId: PropTypes.string,
	};

	static defaultProps = {
		disabled: false,
		dragAndDropWithArrowKeys: false,
		dragAndDropEnabled: false,
	};

	componentDidUpdate (prevProps) {
		const { options, focus } = this.props;

		const hasMoreItems = options.length > prevProps.options.length;
		/** When the selected items are moved from one listbox to another,
		 they should maintain their focus */
		if (hasMoreItems && this.anyItemsSelected() && !this.anyItemsFocused()) {
			setImmediate(focus);
		}
	}

	anyItemsFocused () {
		return this.props.options.some((o) => {
			const ref = this.props.refs[o.item.id];
			return ref.current === document.activeElement;
		});
	}

	anyItemsSelected () {
		return this.props.options.some(({ selected }) => selected);
	}

	renderOption = (option, index) => {
		const {
			onSelect,
			onDropOntoOption,
			assistiveText,
			refs,
			dragAndDropWithArrowKeys,
			beginDrag,
			endDrag,
			focusedOptionId,
			isDragging,
			dragAndDropEnabled,
			disabled,
		} = this.props;
		const noItemsSelected = !this.anyItemsSelected();

		const isInFocus = option.item.id === focusedOptionId;

		let tabIndex = '-1';
		if (!disabled && (isInFocus || (noItemsSelected && index === 0))) {
			tabIndex = '0';
		}

		return (
			<Option
				option={option}
				key={index}
				onDrop={onDropOntoOption}
				onSelect={onSelect}
				tabIndex={tabIndex}
				assistiveText={assistiveText}
				optionRef={refs[option.item.id]}
				beginDrag={beginDrag}
				endDrag={endDrag}
				dragAndDropWithArrowKeys={dragAndDropWithArrowKeys}
				isDraggingWithGroup={isDragging && option.selected}
				dragAndDropEnabled={dragAndDropEnabled}
				disabled={disabled}
			/>
		);
	}

	render () {
		const {
			label,
			options,
			ids,
			disabled,
			height,
			connectDropTarget,
			dragAndDropEnabled,
		} = this.props;

		const styleProp = height ? { style: { height } } : {};

		const result = (
			<div>
				<span className="slds-form-element__label" id={ids.label}>
					{label}
				</span>
				<div
					className={classNames('slds-dueling-list__options', {
						'slds-is-disabled': disabled,
					})}
					{...styleProp}
				>
					<ul
						className="slds-listbox slds-listbox_vertical"
						aria-describedby={ids.describedBy}
						aria-labelledby={ids.label}
						aria-multiselectable
						role="listbox"
						aria-disabled={disabled}
					>
						{options.map(this.renderOption)}
					</ul>
				</div>
			</div>
		);

		return dragAndDropEnabled ? connectDropTarget(result) : result;
	}
}

const optionsTarget = {
	drop (props, monitor) {
		if (monitor.isOver({ shallow: true })) {
			const dragSource = monitor.getItem().option;
			props.onDropIntoCategory(dragSource);
		}
	},
};

const optionsCollector = (connect) => ({
	connectDropTarget: connect.dropTarget(),
});

export default DropTarget('Option', optionsTarget, optionsCollector)(Options);
