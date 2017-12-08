import React from 'react';
import createReactClass from 'create-react-class';
import Pill from '~/components/pill';
import IconSettings from '~/components/icon-settings';

function noop () {
}

const Example = createReactClass({
	displayName: 'PillExample',

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid_pull-padded-medium">
					<div className="slds-p-horizontal_medium">
						<div className="slds-pill_container">
							<Pill
								labels={{
									label: 'Pill Label',
									title: 'Full pill label verbiage mirrored here',
									removeTitle: 'Remove'
								}}
								onClick={noop}
								onRemove={noop}
							/>
							<Pill
								labels={{
									label: 'Pill Label',
									title: 'Full pill label verbiage mirrored here',
									removeTitle: 'Remove'
								}}
								onClick={noop}
								onRemove={noop}
							/>
							<Pill
								labels={{
									label: 'Pill Label',
									title: 'Full pill label verbiage mirrored here',
									removeTitle: 'Remove'
								}}
								onClick={noop}
								onRemove={noop}
							/>
						</div>
					</div>
					<div className="slds-p-horizontal_medium">
						<div className="slds-pill_container">
							<ul className="slds-listbox slds-listbox_horizontal slds-listbox_inline" role="listbox" aria-label="Selected Options:" aria-orientation="horizontal">
								<li className="slds-listbox-item" role="presentation">
									<Pill
										labels={{
											label: 'Pill Label',
											title: 'Full pill label verbiage mirrored here',
											removeTitle: 'Remove'
										}}
										assistiveText={{
											remove: 'Press delete or backspace to remove'
										}}
										role="option"
										tabIndex="0"
										aria-selected="true"
									/>
								</li>
								<li className="slds-listbox-item" role="presentation">
									<Pill
										labels={{
											label: 'Pill Label',
											title: 'Full pill label verbiage mirrored here',
											removeTitle: 'Remove'
										}}
										assistiveText={{
											remove: 'Press delete or backspace to remove'
										}}
										role="option"
										tabIndex="0"
										aria-selected="true"
									/>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</IconSettings>
		);
	}
});
export default Example;
