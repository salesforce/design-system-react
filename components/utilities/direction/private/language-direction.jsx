import React, { Component } from 'react';

// eslint-disable-next-line camelcase
import DirectionSettings from '..';

const LanguageDirectionHOC = (WrappedComponent) => {
	const componentName =
		WrappedComponent.displayName || WrappedComponent.name || 'Component';
	return class LanguageDirection extends Component {
		static displayName = `LanguageDirection(${componentName})`;
		// eslint-disable-next-line camelcase
		static contextType = DirectionSettings;

		render() {
			const props = { ...this.props };
			props.direction = this.context;
			return React.createElement(WrappedComponent, props);
		}
	};
};

export default LanguageDirectionHOC;
