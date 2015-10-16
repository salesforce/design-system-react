// SVG COMPONENT - REACT FACADE

// Core
import * as Lib from '../../lib/lib';

// Framework specific
import React from 'react';

export const SvgObject = {
	propTypes: {
		icon: React.PropTypes.string.isRequired
	},
	
	getDefaultProps () {
		return {
			'aria-hidden': true
		};
	},
	
	_getSVGPath () {
		// TODO: Evaluate best way to do this and clean this up more
		const iconPaths = Lib.getIconPaths();
		const icon = Lib.isString(this.props.icon) && this.props.icon.split('.');
		
		if (icon.length === 2) {
			const iconPath = iconPaths[icon[0]];
			
			if (iconPath) {
				return [iconPath, icon[1]].join('#');
			}
		}
	},
	
	render () {
		const { icon, ...other } = this.props;
		
		return <svg {...other}><use xlinkHref={this._getSVGPath()}></use></svg>;
	}
};

const Svg = React.createClass(SvgObject);

export default Svg;
