import React from 'react';

import Swatch from './swatch';

const handleClick = (event, { hex, onSelect }) => {
	event.preventDefault();
	onSelect(event, { hex });
};

class SwatchOption extends React.Component {
	static displayName = 'SLDSSwatchOption';

	render() {
		return (
			<li className="slds-color-picker__swatch" role="presentation">
				<a
					aria-selected={
						this.props.workingColor &&
						this.props.workingColor.hex === this.props.color
					}
					className="slds-color-picker__swatch-trigger"
					onClick={(event) => {
						handleClick(event, {
							hex: this.props.color,
							onSelect: this.props.onSelect,
						});
					}}
					role="option"
					tabIndex={0}
				>
					<Swatch color={this.props.color} />
				</a>
			</li>
		);
	}
}

export default SwatchOption;
