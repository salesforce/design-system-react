import { Component, type ComponentType } from 'react';
// eslint-disable-next-line camelcase
import UNSAFE_DirectionSettings, { type Direction } from '..';

const LanguageDirectionHOC = <P extends object>(
	WrappedComponent: ComponentType<P & { direction?: Direction }>
) => {
	const componentName =
		WrappedComponent.displayName || WrappedComponent.name || 'Component';
	return class LanguageDirection extends Component<P> {
		static displayName = `LanguageDirection(${componentName})`;

		getWrappedComponent = (value: Direction) => (
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
