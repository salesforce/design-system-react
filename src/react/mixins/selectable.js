// REACT HELPERS
import Lib from '../../core/lib';

const selectable = {
	componentWillMount () {
		if (Lib.isFunction(this.props.onBeforeSelection)) this.onBeforeSelection = this.props.onBeforeSelection;
		if (Lib.isFunction(this.props.onSelected)) this.onSelected = this.props.onSelected;
	},

	componentWillReceiveProps (nextProps) {
		if (Lib.isFunction(nextProps.onBeforeSelection)) {
			this.onBeforeSelection = nextProps.onBeforeSelection;
		} else {
			this.onBeforeSelection = undefined;
		}

		if (Lib.isFunction(nextProps.onSelected)) {
			this.onSelected = nextProps.onSelected;
		} else {
			this.onSelected = undefined;
		}
	}
};

export default selectable;
