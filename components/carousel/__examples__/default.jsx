import React from 'react';
import Carousel from '~/components/carousel';
import CarouselItem from '~/components/carousel/private/carousel-item';
import { ITEMS } from './carousel-items';

class Example extends React.Component {
	static displayName = 'CarouselExample - 3 items';

	render() {
		return (
			<div
				style={{
					maxWidth: '1280px',
				}}
			>
				<Carousel
					id={`ExampleCarouselWith${this.props.itemsPerPanel}items`}
					itemsPerPanel={this.props.itemsPerPanel}
					items={ITEMS}
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
