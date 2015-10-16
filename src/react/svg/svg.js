// SVG COMPONENT - REACT FACADE

// Core
import * as Lib from '../../lib/lib';

// Framework specific
import React from 'react';

export const SvgObject = {
	propTypes: {
		icon: React.PropTypes.string.isRequired,
		className: React.PropTypes.string
	},
	
	_getSVGPath () {
		// TODO: Clean this up
		const iconSet = this.props.icon.split('.')[0];
		const icon = this.props.icon.split('.')[1];
		
		return Lib.getIconPaths()[iconSet][icon];
	},
	
	render () {
		return <svg aria-hidden="true" className={this.props.className}><use xlinkHref={this._getSVGPath()}></use></svg>;
	}
};

const Svg = React.createClass(SvgObject);

export default Svg;
