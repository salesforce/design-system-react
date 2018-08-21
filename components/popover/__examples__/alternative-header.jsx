import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import Popover from '~/components/popover'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';
import Icon from '~/components/icon';

const panelContent = (
	<div>
		<dl className="slds-popover__body-list">
			<dt className="slds-m-bottom--small">
				<div className="slds-media slds-media--center">
					<div className="slds-media__figure">
						<Icon
							assistiveText={{ label: 'Opportunity Icon' }}
							category="standard"
							name="opportunity"
							size="small"
							tabIndex="0"
						/>
					</div>
					<div className="slds-media__body">
						<p
							id="ALTERNATIVE-HEADING"
							className="slds-text-heading--small slds-hyphenate"
						>
							Opportunities (1+)
						</p>
					</div>
				</div>
			</dt>
			<dd className="slds-tile">
				<p className="slds-truncate" title="Tesla - Mule ESB">
					<a href="javascript:void(0);">Tesla - Mule ESB</a>
				</p>
				<div className="slds-tile__detail">
					<dl className="slds-dl--horizontal slds-text-body--small">
						<dt className="slds-dl--horizontal__label">
							<p className="slds-truncate" title="Value">
								Value
							</p>
						</dt>
						<dd className="slds-dl--horizontal__detail slds-tile__meta">
							<p className="slds-truncate" title="$500,000">
								$500,000
							</p>
						</dd>
						<dt className="slds-dl--horizontal__label">
							<p className="slds-truncate" title="Close Date">
								Close Date
							</p>
						</dt>
						<dd className="slds-dl--horizontal__detail slds-tile__meta">
							<p className="slds-truncate" title="Dec 15, 2015">
								Dec 15, 2015
							</p>
						</dd>
					</dl>
				</div>
			</dd>
			<dd className="slds-m-top--x-small slds-text-align--right">
				<a href="javascript:void(0);" title="View all Opportunities">
					View All
				</a>
			</dd>
		</dl>
	</div>
);

const Example = createReactClass({
	displayName: 'PopoverExample',

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<Popover ariaLabelledby="ALTERNATIVE-HEADING" body={panelContent}>
						<Button label="Trigger Popover" />
					</Popover>
				</div>
			</IconSettings>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
