import React from 'react';
import createReactClass from 'create-react-class';

import Pill from '~/components/pill';
import Icon from '~/components/icon';
import Avatar from '~/components/avatar';
import IconSettings from '~/components/icon-settings';

function noop () {
}

const Example = createReactClass({
	displayName: 'PillListboxExample',

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<div className="slds-grid slds-grid_vertical-align-start">
						<div className="slds-p-around--medium">
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
											onClick={noop}
											onRemove={noop}
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
											onClick={noop}
											onRemove={noop}
										/>
									</li>
								</ul>
							</div>
						</div>
						<div className="slds-p-around--medium">
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
											icon={
												<Icon
													title="Account"
													category="standard"
													name="account"
												/>
											}
											onClick={noop}
											onRemove={noop}
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
											icon={
												<Icon
													title="Case"
													category="standard"
													name="case"
												/>
											}
											onClick={noop}
											onRemove={noop}
										/>
									</li>
								</ul>
							</div>
						</div>
						<div className="slds-p-around--medium">
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
											avatar={
												<Avatar
													variant="user"
													title="User avatar"
													imgSrc="https://lightningdesignsystem.com/assets/images/avatar2.jpg"
												/>
											}
											onClick={noop}
											onRemove={noop}
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
											avatar={
												<Avatar
													variant="user"
													title="User avatar"
													imgSrc="https://lightningdesignsystem.com/assets/images/avatar2.jpg"
												/>
											}
											onClick={noop}
											onRemove={noop}
										/>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</IconSettings>
		);
	}
});
export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
