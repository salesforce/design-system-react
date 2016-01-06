// Core
import * as Lib from '../../lib/lib';

// Framework specific
import ReactDOM from 'react-dom';

const genericWillMount = {
	componentWillMount () {
		this.elements = {};
		if (Lib.isFunction(this._initialize)) this._initialize(this.props);
	},
	
	componentDidMount () {
		// If the render method returns `null` or `false`, then element is not set and should be set within the control object.
		const node = ReactDOM.findDOMNode(this);
		if (node) {
			this._setControlElement(Lib.wrapElement(node));
		}
	},

	_setControlElement (element) {
		this.element = this.$el = this.elements.control = element;
		return element;
	},

	// These are handled slightly differently than your average props, so they need to be kept in sync here
	componentWillReceiveProps (nextProps) {
		if (nextProps.collection) this._collection = this._getDataAdapter(nextProps.collection);
		
		if (nextProps.id) this.setState({ id: nextProps.id });

		if (nextProps.strings) {
			this.setState({
				strings: Lib.extend({}, this.state.strings, nextProps.strings)
			});
		}
	},
	
	componentWillUnmount () {
		// For React-specific cleanup delcaring `componentWillUnmount` at the control level will suffice, but an optional `_onDestroy` lifecycle method is also provided for cleanup at the core or trait level.
		if (Lib.isFunction(this._onDestroy)) return this._onDestroy();
	}
};

export default genericWillMount;
