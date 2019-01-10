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
					{...this.props}
					id={`ExampleCarouselWith${this.props.itemsPerPanel}items`}
					items={ITEMS}
					hasPreviousNextPanelNavigation={this.props.hasNavigation}
				/>
			</div>
		);
	}
}

Example.defaultProps = {
	hasNavigation: false,
};

export default Example;
