import React from 'react';
import findIndex from 'lodash.findindex';

import SwatchOption from './swatch-option';
import KEYS from '../../../utilities/key-code';
import EventUtil from '../../../utilities/event';

import { DIRECTIONS } from '../../utilities/UNSAFE_direction';
import LanguageDirection from '../../utilities/UNSAFE_direction/private/language-direction';

class SwatchPicker extends React.Component {
	static displayName = 'SLDSSwatchPicker';

	constructor(props) {
		super(props);
		this.swatchColorRefs = {};
	}

	selectPreviousColor = (event, props) => {
		const index = findIndex(
			props.swatchColors,
			(item) => item === props.color.hex
		);
		const nextIndex =
			index === -1 || index === props.swatchColors.length - 1 ? 0 : index + 1;
		const prevColor = props.swatchColors[nextIndex];
		props.onSelect(event, {
			hex: prevColor,
		});

		this.swatchColorRefs[prevColor].focus();
	};

	selectNextColor = (event, props) => {
		const index = findIndex(
			props.swatchColors,
			(item) => item === props.color.hex
		);
		let prevIndex;
		if (index === 0) {
			prevIndex = props.swatchColors.length - 1;
		} else if (index === -1) {
			prevIndex = 0;
		} else {
			prevIndex = index - 1;
		}
		const nextColor = props.swatchColors[prevIndex];
		props.onSelect(event, {
			hex: nextColor,
		});

		this.swatchColorRefs[nextColor].focus();
	};

	handleKeyDown = (event, props) => {
		const keyDownCallbacks = {
			[KEYS.RIGHT]: () => {
				if (props.direction === DIRECTIONS.RTL) {
					this.selectNextColor(event, props);
				} else {
					this.selectPreviousColor(event, props);
				}
			},
			[KEYS.DOWN]: () => {
				this.selectPreviousColor(event, props);
			},

			[KEYS.LEFT]: () => {
				if (props.direction === DIRECTIONS.RTL) {
					this.selectPreviousColor(event, props);
				} else {
					this.selectNextColor(event, props);
				}
			},
			[KEYS.UP]: () => {
				this.selectNextColor(event, props);
			},
		};

		if (event.keyCode) {
			if (keyDownCallbacks[event.keyCode]) {
				EventUtil.trapEvent(event);
				keyDownCallbacks[event.keyCode]();
			}
		}
	};

	addRef = (color) => (el) => {
		this.swatchColorRefs[color] = el;
	};

	render() {
		const isSelectedColorInSwatch = this.props.swatchColors.includes(
			this.props.color.hex
		);

		return (
			<ul
				className="slds-color-picker__swatches"
				role="listbox"
				onKeyDown={(event) => {
					this.handleKeyDown(event, {
						...this.props,
					});
				}}
			>
				{this.props.swatchColors.map((color, index) => (
					<SwatchOption
						color={color}
						key={color}
						labels={this.props.labels}
						onSelect={this.props.onSelect}
						swatchOptionRef={this.addRef(color)}
						workingColor={this.props.color}
						tabIndex={
							(this.props.color && this.props.color.hex === color) ||
							(index === 0 && !isSelectedColorInSwatch)
								? 0
								: -1
						}
					/>
				))}
			</ul>
		);
	}
}

export default LanguageDirection(SwatchPicker);
