import React from 'react';
import Accordion from '../../components/accordion'; // `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/iconSettings'; // `~` is replaced with design-system-react at runtime
import Dropdown from '../../components/menu-dropdown'; // `~` is replaced with design-system-react at runtime

export default class Example extends React.Component {
	constructor () {
		super();
		this.state = {
			items: [
				{
					id: '1',
					isOpen: false,
					summary: 'The first Item',
					details: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ' +
							'tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At v' +
							'ero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, ' +
							'no sea takimata sanctus est Lorem ipsum dolor sit amet.'
				}, {
					id: '2',
					isOpen: false,
					summary: 'The second Item',
					details: <div>
						<p>Lorem ipsum dolor sit amet,</p>
						<p>consetetur sadipscing elitr,</p>
						<p>sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,</p>
						<p>sed diam voluptua.</p>
						<p>At vero eos et accusam et justo duo dolores et ea rebum.</p>
						<p>Stet clita kasd gubergren,</p>
						<p>no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
					</div>
				}, {
					isOpen: false,
					summary: 'The third Item',
					details: <div>
						<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
							eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
							voluptua.</p>
						<p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
							gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
					</div>
				}
			]
		};
	}

	menuDropdown (selectedItem) {
		return (<Dropdown
			align="right"
			id="ButtonGroupExampleDropdown"
			assistiveText="More Options"
			buttonVariant="icon"
			buttonClassName="slds-shrink-none"
			iconName="down"
			iconVariant="border-filled"
			onSelect={(action) => {
				if (action.label === 'delete') {
					this.setState((state) => ({
						...state,
						items: state.items.filter((item) => {
							console.log('item.id', item.id, 'accordion.id', selectedItem.id);
							return (item.id !== selectedItem.id);
						})
					}));
				}
				console.log(action.label, 'selected');
			}}
			openOn="click"
			options={[
				{
					label: 'delete',
					value: 'A0'
				}, {
					label: 'redo',
					value: 'B0'
				}, {
					label: 'activate',
					value: 'C0'
				}
			]}
			iconSize="x-small"
		/>);
	}

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<Accordion
					onToggleSection={(selectedItem) => this.setState((state) => ({
						...state,
						items: state.items.map((item, i) => (i === selectedItem
							? {
								...item,
								isOpen: !item.isOpen
							}
							: item))
					}))}
					items={this.state.items.map((item) => ({
						...item,
						itemContentRight: this.menuDropdown(item)
					}))}
					id="base-example-accordion"
					openOn="click"
				/>
			</IconSettings>
		);
	}
}

Example.displayName = 'AccordionExample'; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
