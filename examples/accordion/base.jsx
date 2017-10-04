import React from 'react';
import Accordion from '../../components/accordion';

export default class Example extends React.Component {
	constructor () {
		super();
		this.state = { items: [
			{
				key: '1',
				isOpen: false,
				summary: 'The first Item',
				details: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
			},
			{
				key: '2',
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
			},
			{
				key: '3',
				isOpen: false,
				summary: 'The third Item',
				details: <div>
					<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
						ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
					<p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
						takimata sanctus est Lorem ipsum dolor sit amet.</p>
				</div>
			}
		] };
	}
	render () {
		return (
			<Accordion onTogglePanel={(index) => this.setState((state) => ({ ...state, items: state.items.map(((item, i) => (i === index ? { ...item, isOpen: !item.isOpen } : item))) }))} items={this.state.items} id="base-example-accordion" />
		);
	}
}

Example.displayName = 'AccordionExample';
