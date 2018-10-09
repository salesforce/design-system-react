import React from 'react';

import SwatchOption from './swatch-option';

class SwatchPicker extends React.Component {
	static displayName = 'SLDSSwatchPicker';

	render() {
		return (
			<ul className="slds-color-picker__swatches" role="listbox">
				{this.props.swatchColors.map((color) => (
					<SwatchOption
						color={color}
						key={color}
						onSelect={this.props.onSelect}
						workingColor={this.props.color}
					/>
				))}
			</ul>
		);
	}
}

export default SwatchPicker;
