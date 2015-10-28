// SVG COMPONENT - REACT FACADE

// Core
import * as Lib from '../../lib/lib';

// Framework specific
import React from 'react';
import isIcon from '../mixins/custom-prop-types/icon.js';


export const SvgObject = {
	propTypes: {
		icon: isIcon
	},
	
	render () {
		const { icon, ...other } = this.props;
		
		return <svg ariaHidden="true" {...other}><use xlinkHref={Lib.getSVGPath(this.props.icon)}></use></svg>;
	}
};

const Svg = React.createClass(SvgObject);

export default Svg;
