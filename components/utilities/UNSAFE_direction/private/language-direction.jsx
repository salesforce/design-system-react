import React, { Component } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line camelcase
import UNSAFE_DirectionSettings from '..';

const LanguageDirectionHOC = (WrappedComponent) => {
	const componentName =
		WrappedComponent.displayName || WrappedComponent.name || 'Component';
	return class LanguageDirection extends Component {
		static displayName = `LanguageDirection(${componentName})`;
		// eslint-disable-next-line camelcase
		// static contextType = UNSAFE_DirectionSettings;

		getWrappedComponent = (state) => {
			return <WrappedComponent {...this.props} direction={state} />;
		};

		render() {
			return <UNSAFE_DirectionSettings.Consumer>{this.getWrappedComponent}</UNSAFE_DirectionSettings.Consumer>
		}
	};
};

export default LanguageDirectionHOC;
