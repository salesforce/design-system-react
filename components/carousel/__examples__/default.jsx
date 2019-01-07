import React from 'react';
import Carousel from '~/components/carousel';
import CarouselItem from '~/components/carousel/private/item';
import { carouselItems } from './carousel-items';

class Example extends React.Component {
	static displayName = 'CarouselExample - 3 items';

	render() {
		return (
			<div style={{ width: '100%', maxWidth: '100%' }}>
				<Carousel
					id={`ExampleCarouselWith${this.props.itemsPerPanel}items`}
					itemsPerPanel={this.props.itemsPerPanel}
					items={carouselItems}
					hasPreviousNextPanelNavigation={this.props.hasNavigation}
				/>
			</div>
		);
	}
}

Example.defaultProps = {
	itemsPerPanel: 3,
	hasNavigation: false,
};

export default Example;
