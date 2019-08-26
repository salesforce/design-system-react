import React, { Component } from 'react';
// eslint-disable-next-line camelcase
import UNSAFE_DirectionSettings from '..';

const LanguageDirectionHOC = (WrappedComponent) => {
	const componentName =
		WrappedComponent.displayName || WrappedComponent.name || 'Component';
	return class LanguageDirection extends Component {
		static displayName = `LanguageDirection(${componentName})`;

		getWrappedComponent = (value) => (
			<WrappedComponent {...this.props} direction={value} />
		);

		render() {
			return (
				// eslint-disable-next-line react/jsx-pascal-case
				<UNSAFE_DirectionSettings.Consumer>
					{this.getWrappedComponent}
				</UNSAFE_DirectionSettings.Consumer>
			);
		}
	};
};

export default LanguageDirectionHOC;
