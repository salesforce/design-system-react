import React from 'react';
import Carousel from '~/components/carousel';

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
