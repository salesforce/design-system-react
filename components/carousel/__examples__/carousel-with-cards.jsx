import React from 'react';
// `~` is replaced with design-system-react at runtime
import Card from '~/components/card';
import Carousel from '~/components/carousel';
import CarouselItem from '~/components/carousel/private/item';
import { carouselItems } from './carousel-items';

class CarouselWithCards extends React.Component {
	static displayName = 'CarouselExample - with card items';

	render() {
		const itemsComponents = carouselItems.map((item, index) => (
			<Card key={`Item{$index}`}>{item}</Card>
		));

		return (
			<div style={{ width: '100%', maxWidth: '100%' }}>
				<Carousel
					id="ExampleCarouselWithCardItems"
					itemsPerPanel={this.props.itemsPerPanel}
					items={itemsComponents}
				/>
			</div>
		);
	}
}

CarouselWithCards.defaultProps = {
	itemsPerPanel: 3,
};

export default CarouselWithCards;
