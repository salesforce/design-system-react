/* eslint-disable max-lines */
import React from 'react';

import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import classNames from 'classnames';

import IconSettings from '../../icon-settings';

import { TABS } from '../../../utilities/constants';

import Tabs from '../../tabs';
import Panel from '../../tabs/panel';

// Used in the Nested story
import Input from '../../input';

// Used in the Conditinal story
import Checkbox from '../../checkbox';

// Used in the outside control story
import Button from '../../button';

// Used in the custom content story
import Icon from '../../icon';

/* eslint-disable react/display-name */
const getTabs = () => (
	<div>
		<h2 className="slds-text-heading_large">Base Tabs Demo</h2>
		<Tabs id="main-tabs-demo" className="custom-class-is-custom" foo="baz">
			<Panel label="Tab 1">
				<h2 className="slds-text-heading_medium">This is my tab 1 contents!</h2>
				<p>And they&rsquo;re amazing.</p>
				<p>It&quot;s awesome.</p>
				<p>
					You can use your <var>TAB</var> and <var>ARROW</var> keys to navigate
					around. Try it!
				</p>
				<p className="slds-box slds-theme_info slds-m-top_large">
					(You might have to hit shift+tab to put the focus onto the tab bar ;)
				</p>
			</Panel>
			<Panel label="Tab 2">
				<h2 className="slds-text-heading_medium">This is my tab 2 contents!</h2>
				<p>And they&rsquo;re also amazing.</p>
			</Panel>
			<Panel label="Tab 3">
				<h2 className="slds-text-heading_medium">This is my tab 3 contents!</h2>
				<p>And they&rsquo;re quite spectacular.</p>
			</Panel>
		</Tabs>
	</div>
);
/* eslint-enable react/display-name */

/* eslint-disable react/display-name */
const getTabsMoreThanOneAllowGeneratedID = () => (
	<div>
		<h2 className="slds-text-heading_large">Generated Unique IDs Demo</h2>
		<Tabs id="tabs-demo-id-1">
			<Panel label="Only 1 Tab">
				<h2 className="slds-text-heading_medium">About this story</h2>
				<p>
					There should be two instances of Tabs in this story, and each should
					have a unique (generated) ID.
				</p>
			</Panel>
		</Tabs>
		<Tabs id="tabs-demo-id-2">
			<Panel label="Only 1 Tab">
				<h2 className="slds-text-heading_medium">About this story</h2>
				<p>
					There should be two instances of Tabs in this story, and each should
					have a unique (generated) ID.
				</p>
			</Panel>
		</Tabs>
	</div>
);
/* eslint-enable react/display-name */

/* eslint-disable react/display-name */
const getTabsNested = () => (
	<div>
		<h2 className="slds-text-heading_large">Nested Tabs Demo</h2>
		<Tabs id="nested-tabs-demo">
			<Panel label="Tab 1">
				<h2 className="slds-text-heading_medium">This is my tab 1 contents!</h2>
				<p>And they&rsquo;re amazing.</p>
			</Panel>
			<Panel label="Tab 2">
				<h2 className="slds-text-heading_medium">This is my tab 2 contents!</h2>
				<p>And they&rsquo;re also amazing.</p>

				<Input
					id="unique-id-123"
					name="tab-input-example"
					label="Input Label"
					placeholder="You can tab onto this to focus it."
				/>
			</Panel>
			<Panel label="Tab 3 (has children)">
				<h2 className="slds-text-heading_medium">This is my tab 3 contents!</h2>
				<p>And they&rsquo;re tabceptionish.</p>
				<div className="slds-box slds-m-vertical_large">
					<Tabs id="nested-second-layer" defaultSelectedIndex={0}>
						<Panel label="Tab 1">
							<h2 className="slds-text-heading_medium">
								This is my tab 1 contents!
							</h2>
							<p>And they&rsquo;re amazing.</p>
						</Panel>
						<Panel label="Tab 2">
							<h2 className="slds-text-heading_medium">
								This is my tab 2 contents!
							</h2>
							<p>And they&rsquo;re also amazing.</p>
						</Panel>
						<Panel label="Tab 3 (Also has children!)">
							<h2 className="slds-text-heading_medium">
								This is my tab 3 contents!
							</h2>
							<p>
								And they&rsquo;re even <em>more</em> tabceptionish.
							</p>
							<div className="slds-box slds-m-vertical_large">
								<Tabs id="nested-third-layer" defaultSelectedIndex={0}>
									<Panel label="Tab 1 (no children!)">
										<h2 className="slds-text-heading_medium">
											This is my tab 1 contents!
										</h2>
										<p>And they&rsquo;re amazing.</p>
									</Panel>
								</Tabs>
							</div>
						</Panel>
					</Tabs>
				</div>
			</Panel>
		</Tabs>
	</div>
);
/* eslint-enable react/display-name */

/* eslint-disable react/display-name */
const getTabsScoped = () => (
	<div>
		<h2 className="slds-text-heading_large">Scoped Tabs Demo</h2>
		<Tabs id="scoped-tabs-demo" variant="scoped">
			<Panel label="Tab 1">
				<h2 className="slds-text-heading_medium">This is my tab 1 contents!</h2>
				<p>And they&rsquo;re amazing.</p>
				<p>It&quot;s awesome.</p>
				<p>
					You can use your <var>TAB</var> and <var>ARROW</var> keys to navigate
					around. Try it!
				</p>
				<p className="slds-box slds-theme_info slds-m-top_large">
					(You might have to hit shift+tab to put the focus onto the tab bar ;)
				</p>
			</Panel>
			<Panel label="Tab 2">
				<h2 className="slds-text-heading_medium">This is my tab 2 contents!</h2>
				<p>And they&rsquo;re also amazing.</p>
			</Panel>
			<Panel label="Tab 3">
				<h2 className="slds-text-heading_medium">This is my tab 3 contents!</h2>
				<p>And they&rsquo;re quite spectacular.</p>
			</Panel>
		</Tabs>
	</div>
);

/* eslint-disable react/display-name */
const getTabsVertical = () => (
	<div>
		<h2 className="slds-text-heading_large">Scoped Tabs Demo</h2>
		<Tabs id="scoped-tabs-demo" variant="vertical">
			<Panel label="Tab 1">
				<h2 className="slds-text-heading_medium">This is my tab 1 contents!</h2>
				<p>And they&rsquo;re amazing.</p>
				<p>It&quot;s awesome.</p>
				<p>
					You can use your <var>TAB</var> and <var>ARROW</var> keys to navigate
					around. Try it!
				</p>
				<p className="slds-box slds-theme_info slds-m-top_large">
					(You might have to hit shift+tab to put the focus onto the tab bar ;)
				</p>
			</Panel>
			<Panel label="Tab 2">
				<h2 className="slds-text-heading_medium">This is my tab 2 contents!</h2>
				<p>And they&rsquo;re also amazing.</p>
			</Panel>
			<Panel label="Tab 3 (disabled)" disabled>
				Disabled tab content.
			</Panel>
			<Panel label="Tab 4">
				<h2 className="slds-text-heading_medium">This is my tab 3 contents!</h2>
				<p>And they&rsquo;re quite spectacular.</p>
			</Panel>
		</Tabs>
	</div>
);

/* eslint-enable react/display-name */

class DemoTabsConditional extends React.Component {
	static displayName = 'DemoTabsConditional';

	// ### Prop Types
	static propTypes = {
		/**
		 * Class names to be added to the container element and is passed along to its children.
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
	};

	state = {
		showA: true,
		showB: true,
		showC: true,
		disableA: false,
		disableB: true,
		disableC: true,
	};

	handleCheckClicked = (checked, event) => {
		const state = {};
		state[event.target.name] = checked;
		this.setState(state);
	};

	handleCheckClickedDisable = (checked, event) => {
		const state = {};
		state[event.target.name] = checked;
		this.setState(state);
	};

	renderPaneA = (disabled) => (
		<Panel label="Tab A" disabled={disabled}>
			<p>This is tab A.</p>
			<div>
				<Checkbox
					assistiveText={{ label: 'Disable tab B' }}
					checked={this.state.disableB}
					id="tabs-checkbox-pane-a-1"
					onChange={this.handleCheckClickedDisable}
					labels={{ label: 'Disable tab B' }}
					name="disableB"
				/>
				<Checkbox
					assistiveText={{ label: 'Disable tab C' }}
					checked={this.state.disableC}
					id="tabs-checkbox-pane-a-2"
					onChange={this.handleCheckClickedDisable}
					labels={{ label: 'Disable tab C' }}
					name="disableC"
				/>
			</div>
		</Panel>
	);

	render() {
		return (
			<div>
				<h2 className="slds-text-heading_large">Conditional Tabs Demo</h2>

				<Checkbox
					assistiveText={{ label: 'Show tab A' }}
					checked={this.state.showA}
					id="tabs-checkbox-tab-a-1"
					onChange={this.handleCheckClicked}
					labels={{ label: 'Show tab A' }}
					name="showA"
				/>
				<Checkbox
					assistiveText={{ label: 'Show tab B' }}
					checked={this.state.showB}
					id="tabs-checkbox-tab-b-1"
					onChange={this.handleCheckClicked}
					labels={{ label: 'Show tab B' }}
					name="showB"
				/>

				<Checkbox
					checked={this.state.showC}
					id="tabs-checkbox-tab-c-1"
					onChange={this.handleCheckClicked}
					assistiveText={{ label: 'Show tab C' }}
					labels={{ label: 'Show tab C' }}
					name="showC"
				/>

				<Tabs
					className={classNames('slds-m-top_large', this.props.className)}
					id="tabs-checkbox-tabs-1"
					onSelect={this.handleSelectNopesOnThree}
				>
					{this.state.showA && this.renderPaneA(this.state.disableA)}
					{this.state.showB && this.state.disableB ? (
						<Panel label="Tab B" disabled>
							<p>This is tab B.</p>
						</Panel>
					) : (
						this.state.showB && (
							<Panel label="Tab B">
								<p>This is tab B.</p>
							</Panel>
						)
					)}
					{this.state.showC && this.state.disableC ? (
						<Panel label="Tab C" disabled>
							<p>This is tab C.</p>
						</Panel>
					) : (
						this.state.showC && (
							<Panel label="Tab C">
								<p>This is tab C.</p>
							</Panel>
						)
					)}
				</Tabs>
			</div>
		);
	}
}

class DemoTabsOutsideControl extends React.Component {
	static displayName = 'DemoTabsOutsideControl';

	// ### Prop Types
	static propTypes = {
		/**
		 * Class names to be added to the container element and is passed along to its children.
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * The Tab (and corresponding TabPanel) that is selected when the component renders. Defaults to `0`.
		 */
		whichOneSelectedYo: PropTypes.number,
		prevOneSelectedYo: PropTypes.number,
	};

	state = {
		whichOneSelectedYo: this.props.whichOneSelectedYo || 0,
		prevOneSelectedYo: this.props.prevOneSelectedYo || 0,
	};

	handleSelect = (index, last) => {
		let toReturn = true;
		if (
			index === this.state.whichOneSelectedYo &&
			last === this.state.prevOneSelectedYo
		) {
			toReturn = false;
		} else {
			action('handleSelect')(index, last);
			this.setState({ whichOneSelectedYo: index, prevOneSelectedYo: last });
		}
		return toReturn;
	};

	showState = () => {
		action('showState (current)')(this.state.whichOneSelectedYo);
		action('showState (previous)')(this.state.prevOneSelectedYo);
	};

	handleButtonClicked = (event) => {
		const prevOneSelected = this.state.prevOneSelectedYo;
		const thisOneSelected = this.state.whichOneSelectedYo;

		action('handleButtonClicked')(event.currentTarget.id);
		switch (event.currentTarget.id) {
			case 'monday':
				this.handleSelect(0, thisOneSelected);
				break;

			case 'tuesday':
				this.handleSelect(1, thisOneSelected);
				break;

			case 'tuesday-alt':
				this.handleSelect(1, thisOneSelected);
				break;

			case 'wednesday':
				this.handleSelect(2, thisOneSelected);
				break;

			case 'thursday':
				this.handleSelect(3, thisOneSelected);
				break;

			case 'friday':
				this.handleSelect(4, thisOneSelected);
				break;

			case 'none':
				this.handleSelect(undefined, thisOneSelected);
				break;

			case 'previous':
				this.handleSelect(prevOneSelected, thisOneSelected);
				break;

			case 'show-state':
				this.showState();
				break;

			default:
				// Statements executed when none of the values match the value of the expression
				this.handleSelect(thisOneSelected, prevOneSelected);
		}
	};

	render() {
		return (
			<div>
				<h2 className="slds-text-heading_large">Outside Tabs Demo</h2>
				<p>
					Here we have several buttons, which are used to pass a new{' '}
					<code>selectedIndex</code> into the Tabs component.
				</p>
				<p className="slds-m-bottom_large">
					This shows that you can pass a new selected index property into the
					component from the outside and have it re-render.
				</p>

				<Button id="show-state" label="Show State" onClick={this.showState} />

				<Button id="monday" label="Monday" onClick={this.handleButtonClicked} />
				<Button
					id="tuesday"
					label="Tuesday"
					onClick={this.handleButtonClicked}
				/>
				<Button
					id="wednesday"
					label="Wednesday"
					onClick={this.handleButtonClicked}
				/>
				<Button
					id="thursday"
					label="Thursday"
					onClick={this.handleButtonClicked}
				/>
				<Button id="friday" label="Friday" onClick={this.handleButtonClicked} />
				<Button id="none" label="None" onClick={this.handleButtonClicked} />
				<Button
					id="previous"
					label="Previous"
					onClick={this.handleButtonClicked}
				/>

				<Tabs
					className={classNames('slds-m-top_large', this.props.className)}
					id="DemoTabsOutsideControlTabs"
					selectedIndex={this.state.whichOneSelectedYo}
					onSelect={this.handleSelect}
				>
					<Panel label="Monday">
						<p>This is Monday&quot;s Pane.</p>
						<Button
							id="tuesday-alt"
							label="Submit and go to next tab"
							onClick={this.handleButtonClicked}
						/>
					</Panel>
					<Panel label="Tuesday">
						<p>This is Tuesday&quot;s Pane.</p>
					</Panel>
					<Panel label="Wednesday">
						<p>This is Wednesday&quot;s Pane.</p>
					</Panel>
					<Panel label="Thursday">
						<p>Thursday&quot;s Pane has far to go.</p>
					</Panel>
					<Panel label="Friday">
						<p>This is Friday&quot;s Pane.</p>
					</Panel>
				</Tabs>
			</div>
		);
	}
}

/* eslint-disable react/display-name */
const getTabsDisabled = () => (
	<div>
		<h2 className="slds-text-heading_large">Disabled Tabs Demo</h2>
		<Tabs id="disabled-tabs-demo">
			<Panel label="Tab 1">
				<h2 className="slds-text-heading_medium">This is my tab 1 contents!</h2>
				<p>And they&rsquo;re amazing.</p>
				<p>It&rsquo;s awesome.</p>
				<p>
					You can use your <var>TAB</var> and <var>ARROW</var> keys to navigate
					around. Try it!
				</p>
				<p className="slds-box slds-theme_info slds-m-top_large">
					(You might have to hit shift+tab to put the focus onto the tab bar ;)
				</p>
			</Panel>
			<Panel label="Tab 2" disabled>
				<h2 className="slds-text-heading_medium">This is my tab 2 contents!</h2>
				<p>And they&rsquo;re also amazing.</p>
			</Panel>
			<Panel label="Tab 3">
				<h2 className="slds-text-heading_medium">This is my tab 3 contents!</h2>
				<p>And they&rsquo;re quite spectacular.</p>
			</Panel>
			<Panel label="Tab 4">
				<h2 className="slds-text-heading_medium">This is my tab 3 contents!</h2>
				<p>
					Note that using your arrow keys you can loop <em>around the tabs</em>!
					🎉
				</p>
			</Panel>
		</Tabs>
	</div>
);
/* eslint-enable react/display-name */

/* eslint-disable react/display-name */
const getTabsError = () => (
	<div>
		<h2 className="slds-text-heading_large">Error Tabs Demo</h2>
		<Tabs id="disabled-tabs-demo">
			<Panel label="Tab 1">
				<h2 className="slds-text-heading_medium">This is my tab 1 contents!</h2>
				<p>And they&rsquo;re amazing.</p>
				<p>It&rsquo;s awesome.</p>
				<p>
					You can use your <var>TAB</var> and <var>ARROW</var> keys to navigate
					around. Try it!
				</p>
				<p className="slds-box slds-theme_info slds-m-top_large">
					(You might have to hit shift+tab to put the focus onto the tab bar ;)
				</p>
			</Panel>
			<Panel
				label="Tab 2"
				hasError
				assistiveText={{
					withErrorIcon: 'An error on this Panel needs to be addressed',
				}}
			>
				<h2 className="slds-text-heading_medium">This is my tab 2 contents!</h2>
				<p>Tab should have an error icon. Uh oh!</p>
			</Panel>
			<Panel label="Tab 3">
				<h2 className="slds-text-heading_medium">This is my tab 3 contents!</h2>
				<p>And they&rsquo;re quite spectacular.</p>
			</Panel>
			<Panel label="Tab 4">
				<h2 className="slds-text-heading_medium">This is my tab 3 contents!</h2>
				<p>
					Note that using your arrow keys you can loop <em>around the tabs</em>!
					🎉
				</p>
			</Panel>
		</Tabs>
	</div>
);
/* eslint-enable react/display-name */

/* eslint-disable react/display-name */
const getCustomContentTabs = () => {
	const tab1Label = (
		<div aria-label="test accessibility!">
			<Icon
				category="utility"
				name="list"
				style={{ marginRight: '.5rem' }}
				size="x-small"
			/>
			<span>my tab</span>
		</div>
	);
	const tab2Label = <span style={{ color: 'red' }}>my other tab</span>;
	return (
		<div>
			<h2 className="slds-text-heading_large">Custom Tab Contents Demo</h2>
			<Tabs id="getCustomContentTabs">
				<Panel label={tab1Label}>
					<h2 className="slds-text-heading_medium">
						This is my first custom content tab!
					</h2>
				</Panel>
				<Panel label={tab2Label}>
					<h2 className="slds-text-heading_medium">
						This is my second custom content tab!
					</h2>
				</Panel>
			</Tabs>
		</div>
	);
};

/* eslint-enable react/display-name */

class DemoTabsInterceptSelect extends React.Component {
	static displayName = 'DemoTabsInterceptSelect';

	state = { intercepts: 0 };

	handleTabSelect = (next, last) => {
		action('handleTabSelect')(next, last);
		const intercepts = this.state.intercepts + 1;
		this.setState({ intercepts });
		return false;
	};

	render() {
		return (
			<div>
				<Tabs id="DemoTabsInterceptSelect" onSelect={this.handleTabSelect}>
					<Panel label="Panel with intercept">
						<p>Default Panel</p>
						{this.state.intercepts > 0 && (
							<p>
								{`We've intercepted navigation ${this.state.intercepts} time(s)`}
							</p>
						)}
					</Panel>
					<Panel label="Unreachable panel">
						<p>You should never see this message</p>
					</Panel>
				</Tabs>

				<div style={{ height: '20px' }} />

				<Tabs id="DemoTabsInterceptSelect2">
					<Panel label="Panel still working as intended">
						<p>Default Panel</p>
					</Panel>
					<Panel label="Destination panel">
						<p>You should be able to reach this panel</p>
					</Panel>
				</Tabs>
			</div>
		);
	}
}

storiesOf(TABS, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Base', () => getTabs())
	.add('With disabled tab', () => getTabsDisabled())
	.add('With error tab', () => getTabsError())
	.add('Nested', () => getTabsNested())
	.add('Outside Control', () => (
		<DemoTabsOutsideControl className="controlled-yo" />
	))
	.add('Conditional', () => <DemoTabsConditional className="conditional-yo" />)
	.add('Unique Generated IDs', () => getTabsMoreThanOneAllowGeneratedID())
	.add('Scoped', () => getTabsScoped())
	.add('Vertical', () => getTabsVertical())
	.add('Custom Tab Contents', () => getCustomContentTabs())
	.add('Tab Intercept Panel Select', () => <DemoTabsInterceptSelect />);
