// Core
import * as Lib from '../../lib/lib';

// Framework specific
import React from 'react';

const genericWillMount = {
	componentWillMount () {
		this.elements = {};
		if (Lib.isFunction(this._initialize)) this._initialize(this.props);
	},
	
	componentDidMount () {
		this.elements.wrapper = Lib.wrapElement(React.findDOMNode(this));
	},

	// These are handled slightly differently than your average props, so they need to be kept in sync here
	componentWillReceiveProps (nextProps) {
		if (nextProps.collection) this._collection = this._getDataAdapter(nextProps.collection);

		if (nextProps.strings) {
			this.setState({
				strings: Lib.extend({}, this.state.strings, nextProps.strings)
			});
		}
	}
};

export default genericWillMount;
