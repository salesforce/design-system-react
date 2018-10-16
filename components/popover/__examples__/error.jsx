import React from 'react';

import IconSettings from '~/components/icon-settings';
import Icon from '~/components/icon';
import Popover from '~/components/popover'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';

class Example extends React.Component {
	static displayName = 'PopoverExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<Popover
						align="top left"
						body={
							<p>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
								eiusmod tempor incididunt ut labore et dolore.{' '}
								<a href="javascript:void(0);" title="Learn More">
									Learn More
								</a>
							</p>
						}
						heading="Resolve error"
						isOpen
						variant="error"
					>
						<Button label="Trigger Popover" />
					</Popover>
					<br />
					<br />
					<div>
						<section
							className="slds-popover slds-popover_error slds-nubbin_bottom-left"
							role="dialog"
							aria-labelledby="dialog-heading-id-1"
							aria-describedby="dialog-body-id-2"
						>
							<button
								className="slds-button slds-button_icon slds-button_icon-small slds-float_right slds-popover__close slds-button_icon-inverse"
								title="Close dialog"
							>
								<Icon category="utility" name="close" size="x-small" inverse />
								<span className="slds-assistive-text">Close dialog</span>
							</button>
							<header className="slds-popover__header">
								<div className="slds-media slds-media_center slds-has-flexi-truncate ">
									<div className="slds-media__figure">
										<span className="slds-icon_container slds-icon-utility-error">
											<Icon
												category="utility"
												size="x-small"
												name="error"
												inverse
											/>
										</span>
									</div>
									<div className="slds-media__body">
										<h2
											className="slds-truncate slds-text-heading_medium"
											id="dialog-heading-id-1"
											title="Resolve error"
										>
											Resolve error
										</h2>
									</div>
								</div>
							</header>
							<div className="slds-popover__body" id="dialog-body-id-2">
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
									do eiusmod tempor incididunt ut labore et dolore.{' '}
									<a href="javascript:void(0);" title="Learn More">
										Learn More
									</a>
								</p>
							</div>
						</section>
					</div>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
