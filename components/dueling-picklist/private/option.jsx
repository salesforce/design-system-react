import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Icon from '~/components/icon';
import { DragSource, DropTarget } from 'react-dnd';

class Option extends React.Component {
	static propTypes = {
		option: PropTypes.shape({
			item: PropTypes.shape({
				id: PropTypes.string.isRequired,
				label: PropTypes.string.isRequired,
				locked: PropTypes.bool,
			}),
			selected: PropTypes.bool.isRequired,
		}).isRequired,
		assistiveText: PropTypes.shape({
			itemLocked: PropTypes.string,
			lockedItemCannotBeMoved: PropTypes.string,
		}),
		tabIndex: PropTypes.string,
		onDrop: PropTypes.func,
		onSelect: PropTypes.func.isRequired,
		beginDrag: PropTypes.func,
		endDrag: PropTypes.func,
		dragAndDropEnabled: PropTypes.bool,
		disabled: PropTypes.bool,
	};

	static defaultProps = {
		tabIndex: null,
		disabled: false,
	};

	constructor (props) {
		super(props);
		this.id = `dueling-picklist-option-${shortid.generate()}`;
	}

	handleClick = (event) => {
		event.stopPropagation();
		event.preventDefault();

		const { shiftKey, metaKey, ctrlKey } = event;

		const selectRange = shiftKey;
		const selectAdditionalItem = metaKey || ctrlKey;

		const { onSelect, option } = this.props;

		onSelect(option, selectRange, selectAdditionalItem);
	};

	handleFocus = (event) => {
		event.preventDefault();
		event.stopPropagation();
		const { onSelect, option } = this.props;

		onSelect(option, false, false, true);
	};

	render () {
		const {
			option,
			tabIndex,
			connectDragSource,
			connectDropTarget,
			isDragging,
			isDraggingWithGroup,
			dragAndDropWithArrowKeys,
			optionRef,
			dragAndDropEnabled,
			disabled,
		} = this.props;
		const { selected, item } = option;

		let className =
			'slds-listbox__option slds-listbox__option_plain slds-media slds-media_small slds-media_inline';
		if (!disabled && selected) {
			className += ' slds-is-selected';
		}
		if (
			!disabled &&
			dragAndDropEnabled &&
			(isDragging ||
				isDraggingWithGroup ||
				(dragAndDropWithArrowKeys && selected))
		) {
			className += ' slds-is-grabbed';
		}

		const events = disabled
			? {}
			: {
				onClick: this.handleClick,
				onFocus: this.handleFocus,
			};

		const result = (
			<li role="presentation" className="slds-listbox__item" id={this.id}>
				<div
					className={className}
					aria-selected={!disabled && (selected || isDragging)}
					role="option"
					tabIndex={tabIndex}
					ref={optionRef}
					{...events}
				>
					<span className="slds-media__body">
						<span className="slds-truncate" title={item.label}>
							{item.label}
						</span>
					</span>
					{this.renderLock()}
				</div>
			</li>
		);

		return !disabled && dragAndDropEnabled
			? connectDragSource(connectDropTarget(result))
			: result;
	}

	renderLock () {
		const { option, assistiveText } = this.props;

		if (!option.item.locked) {
			return null;
		}

		return (
			<span className="slds-media__figure slds-media__figure_reverse">
				<span className="slds-icon_container" title={assistiveText.itemLocked}>
					<Icon category="utility" name="lock" size="xx-small" />
					<span className="slds-assistive-text">
						{' '}
						: {assistiveText.lockedItemCannotBeMoved}
					</span>
				</span>
			</span>
		);
	}
}

const optionSource = {
	beginDrag (props) {
		props.beginDrag();
		return {
			option: props.option,
		};
	},
	endDrag (props) {
		props.endDrag();
	},
};

const optionSourceCollector = (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
});

const optionTarget = {
	drop (props, monitor, component) {
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
		const { x, y } = hoverBoundingRect;
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
		const clientOffset = monitor.getClientOffset();
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;
		const dropTarget = props.option;
		const sourceIsAboveTarget = hoverClientY < hoverMiddleY;

		props.onDrop(dropTarget, sourceIsAboveTarget);
	},
};

const optionCollector = (connect) => ({
	connectDropTarget: connect.dropTarget(),
});

export default DropTarget('Option', optionTarget, optionCollector)(
	DragSource('Option', optionSource, optionSourceCollector)(Option)
);
