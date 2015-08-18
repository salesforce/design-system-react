// Core
import * as Lib from '../../core/lib';

// Framework specific
import React from 'react';

const genericWillMount = {
	componentWillMount () {
		this.elements = {};
		this._initialize(this.props);
	},
	
	componentDidMount () {
		this.elements.wrapper = Lib.wrapElement(React.findDOMNode(this));
	}
};

export default genericWillMount;
