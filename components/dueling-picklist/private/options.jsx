import React from 'react';
import PropTypes from 'prop-types';
import Option from './option';
import { DropTarget } from 'react-dnd';

class Options extends React.Component {
	static propTypes = {
		options: PropTypes.arrayOf(
			PropTypes.shape({
				item: PropTypes.shape({
					id: PropTypes.string.isRequired,
					label: PropTypes.string.isRequired,
					locked: PropTypes.bool,
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
	}
	
	static defaultProps = {
		disabled: false,
		dragAndDropWithArrowKeys: false,
		dragAndDropEnabled: false,
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {
			options,
			focus,
		} = this.props;

		const hasMoreItems = options.length > prevProps.options.length;
		if (hasMoreItems && this.anyItemsSelected() && !this.anyItemsFocused()) {
			setImmediate(focus);
		}
	}
	
	anyItemsFocused() {
		return this.props.options.some(o => {
			const ref = this.props.refs[o.item.id];
			return ref.current === document.activeElement;
		});
	}

	render() {
		const {
			label,
			options,
			ids,
			disabled,
			height,
			connectDropTarget,
			dragAndDropEnabled,
		} = this.props;
		
		const disabledClass = disabled ? 'slds-is-disabled' : '';
		const styleProp = height ? { style: { height } } : {};
		
		const result = (
			<div>
				<span className="slds-form-element__label" id={ids.label}>
					{label}
				</span>
				<div
					className={`slds-dueling-list__options ${disabledClass}`}
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

	anyItemsSelected() {
		return this.props.options.some(({ selected, item }) => selected);
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
			isDragging,
			dragAndDropEnabled,
			disabled,
		} = this.props;
		const noItemsSelected = !this.anyItemsSelected()

		let tabIndex = '-1';
		if (!disabled && (option.selected || (noItemsSelected && index === 0))) {
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
}

const optionsTarget = {
	drop(props, monitor, component) {
		if (monitor.isOver({ shallow: true })) {
			const dragSource = monitor.getItem().option;
			props.onDropIntoCategory(dragSource);
		}
	},
}

const optionsCollector = (connect) => ({
	connectDropTarget: connect.dropTarget(),
});

export default DropTarget('Option', optionsTarget, optionsCollector)(Options);