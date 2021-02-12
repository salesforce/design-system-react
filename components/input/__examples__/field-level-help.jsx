import React from 'react';
import PropTypes from 'prop-types';
import IconSettings from '~/components/icon-settings'; // `~` is replaced with design-system-react at runtime
import Input from '~/components/input'; // `~` is replaced with design-system-react at runtime
import Tooltip from '~/components/tooltip'; // `~` is replaced with design-system-react at runtime

const propTypes = {
	tooltipOpen: PropTypes.bool,
};

class Example extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<h1 className="slds-text-title_caps slds-p-vertical_medium">
						Field Level Help
					</h1>
					<Input
						id="field-level-help"
						label="My Label"
						fieldLevelHelpTooltip={
							<Tooltip
								id="field-level-help-tooltip"
								align="top left"
								content="Some helpful information"
								isOpen={this.props.tooltipOpen}
							/>
						}
					/>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'FieldLevelHelpInputExample';
Example.propTypes = propTypes;
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
