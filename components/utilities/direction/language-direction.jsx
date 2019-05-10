import React, { Component } from 'react';

import DirectionSettings from './direction-settings';

const LanguageDirectionHOC = (WrappedComponent) => {
	const componentName =
		WrappedComponent.displayName || WrappedComponent.name || 'Component';
	return class LanguageDirection extends Component {
		static displayName = `LanguageDirection(${componentName})`;
		static contextType = DirectionSettings;

		render() {
			const props = { ...this.props };
			props.direction = this.context;
			return React.createElement(WrappedComponent, props);
		}
	};
};

export default LanguageDirectionHOC;
