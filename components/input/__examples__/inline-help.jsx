import React from 'react';
import Input from '~/components/input'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';
import InputIcon from '~/components/icon/input-icon';

class Example extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<section>
					<ol>
						<li className="slds-p-bottom_large">
							<h1 className="slds-text-title_caps slds-p-vertical_medium">
								1. Inline Help
							</h1>
							<Input
								id="inline-help"
								label="My Label"
								inlineHelpText="ex: (415) 111-2222"
							/>
						</li>
						<li className="slds-p-bottom_large">
							<h1 className="slds-text-title_caps slds-p-vertical_medium">
								2. Inline Help With Left Icon
							</h1>
							<Input
								id="inline-help-with-left-icon"
								label="My Label"
								inlineHelpText="ex: (415) 111-2222"
								iconLeft={<InputIcon name="search" category="utility" />}
							/>
						</li>
						<li className="slds-p-bottom_large">
							<h1 className="slds-text-title_caps slds-p-vertical_medium">
								3. Inline Help With Right Icon
							</h1>
							<Input
								id="inline-help-with-right-icon"
								label="My Label"
								inlineHelpText="ex: (415) 111-2222"
								iconRight={<InputIcon name="search" category="utility" />}
							/>
						</li>
						<li className="slds-p-bottom_large">
							<h1 className="slds-text-title_caps slds-p-vertical_medium">
								4. Inline Help With Error Text
							</h1>
							<Input
								id="inline-help-with-error"
								aria-describedby="inline-with-error-1"
								name="inline-help-with-error"
								label="My Label"
								required
								inlineHelpText="ex: (415) 111-2222"
								errorText="This field is required."
							/>
						</li>
						<li className="slds-p-bottom_large">
							<h1 className="slds-text-title_caps slds-p-vertical_medium">
								4. Inline Help With Error Text and Icon
							</h1>
							<Input
								id="inline-help-with-error-and-icon"
								aria-describedby="inline-with-error-2"
								name="inline-help-with-error-and-icon"
								label="My Label"
								required
								inlineHelpText="ex: (415) 111-2222"
								errorText="This field is required."
								iconLeft={<InputIcon name="error" category="utility" />}
							/>
						</li>
					</ol>
				</section>
			</IconSettings>
		);
	}
}

Example.displayName = 'InlineHelpInputExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
