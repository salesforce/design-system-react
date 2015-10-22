// SVG COMPONENT - REACT FACADE

// Core
import * as Lib from '../../lib/lib';

// Framework specific
import React from 'react';

export const SvgObject = {
	propTypes: {
		icon: React.PropTypes.string.isRequired
	},
	
	render () {
		const { icon, ...other } = this.props;
		
		return <svg ariaHidden="true" {...other}><use xlinkHref={Lib.getSVGPath(this.props.icon)}></use></svg>;
	}
};

const Svg = React.createClass(SvgObject);

export default Svg;
