import React from 'react';

class Swatch extends React.Component {
	render () {
		const style = {
			backgroundColor: this.props.color
		};

		if (!this.props.color) {
			style.backgroundImage = 'linear-gradient(45deg, white 40%, red 0, red 60%, white 0)';
			style.border = '1px solid #cccccc';
		}

		return (
			<span
				className="slds-swatch"
				style={style}
			>
				<span className="slds-assistive-text">
					{this.props.color}
				</span>
			</span>
		);
	}
}

export default Swatch;
