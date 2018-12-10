import React from 'react';
import Swatch from './swatch';

const handleClick = (event, { hex, onSelect }) => {
	event.preventDefault();
	onSelect(event, { hex });
};
const selectedStyle = {
	border: '1px solid #9e9e9e',
	boxShadow: 'rgb(117, 112, 112) 1px 1px 1px',
	margin: '3px',
};
class SwatchOption extends React.Component {
	static displayName = 'SLDSSwatchOption';

	render() {
		return (
			<li
				className="slds-color-picker__swatch"
				style={
					this.props.workingColor &&
					this.props.workingColor.hex === this.props.color
						? selectedStyle
						: {}
				}
				role="presentation"
			>
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
					ref={this.props.swatchOptionRef}
					role="option"
					tabIndex={this.props.tabIndex}
				>
					<Swatch color={this.props.color} labels={this.props.labels} />
				</a>
			</li>
		);
	}
}

export default SwatchOption;
