import React from 'react';
import DynamicIcons from '~/components/dynamic-icon'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	render() {
		const ellieSVG = (
			<svg viewBox="0 0 280 14" aria-hidden="true">
				<circle cx="7" cy="7" r="4" />
				<circle cx="7" cy="7" r="3" />
				<circle cx="21" cy="7" r="4" />
				<circle cx="21" cy="7" r="3" />
				<circle cx="35" cy="7" r="4" />
				<circle cx="35" cy="7" r="3" />
				<circle cx="49" cy="7" r="4" />
				<circle cx="49" cy="7" r="3" />
				<circle cx="63" cy="7" r="4" />
				<circle cx="63" cy="7" r="3" />
				<circle cx="77" cy="7" r="4" />
				<circle cx="77" cy="7" r="3" />
				<circle cx="91" cy="7" r="4" />
				<circle cx="91" cy="7" r="3" />
				<circle cx="105" cy="7" r="4" />
				<circle cx="105" cy="7" r="3" />
				<circle cx="119" cy="7" r="4" />
				<circle cx="119" cy="7" r="3" />
				<circle cx="133" cy="7" r="4" />
				<circle cx="133" cy="7" r="3" />
				<circle cx="147" cy="7" r="4" />
				<circle cx="147" cy="7" r="3" />
				<circle cx="161" cy="7" r="4" />
				<circle cx="161" cy="7" r="3" />
				<circle cx="175" cy="7" r="4" />
				<circle cx="175" cy="7" r="3" />
				<circle cx="189" cy="7" r="4" />
				<circle cx="189" cy="7" r="3" />
				<circle cx="203" cy="7" r="4" />
				<circle cx="203" cy="7" r="3" />
				<circle cx="217" cy="7" r="4" />
				<circle cx="217" cy="7" r="3" />
				<circle cx="231" cy="7" r="4" />
				<circle cx="231" cy="7" r="3" />
				<circle cx="245" cy="7" r="4" />
				<circle cx="245" cy="7" r="3" />
				<circle cx="259" cy="7" r="4" />
				<circle cx="259" cy="7" r="3" />
				<circle cx="273" cy="7" r="4" />
				<circle cx="273" cy="7" r="3" />
			</svg>
		);

		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<div className="slds-col_padded">
						<DynamicIcons
							title="Description of the icon"
							isAnimated
							paused={false}
							variant="ellie"
						>
							{ellieSVG}
							<span className="slds-assistive-text">Text alternative</span>
						</DynamicIcons>
					</div>
					<div className="slds-col_padded">
						<DynamicIcons
							title="Description of the icon"
							isAnimated={false}
							paused={false}
							variant="ellie"
						>
							{ellieSVG}
							<span className="slds-assistive-text">Text alternative</span>
						</DynamicIcons>
					</div>
					<div className="slds-col_padded">
						<DynamicIcons
							title="Description of the icon"
							isAnimated
							paused
							variant="ellie"
						>
							{ellieSVG}
							<span className="slds-assistive-text">Text alternative</span>
						</DynamicIcons>
					</div>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'EllieExample'; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
export default Example;
