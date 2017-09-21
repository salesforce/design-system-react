import React from 'react';
import Accordion from '../../components/accordion';

export default class Example extends React.Component {

	render () {
		const items = [
			{
				key: '1',
				summary: 'The first Item',
				details: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
			},
			{
				key: '2',
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
				summary: 'The third Item',
				details: <div>
					<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
						ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
					<p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
						takimata sanctus est Lorem ipsum dolor sit amet.</p>
				</div>
			}
		];

		return (
			<Accordion items={items} id="base-example-accordion" />
		);
	}

}

Example.displayName = 'AccordionExample';
