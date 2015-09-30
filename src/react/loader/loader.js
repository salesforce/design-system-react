// LOADER CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import LoaderCore, {CONTROL} from '../../core/loader';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import genericWillMount from '../mixins/generic-will-mount';

// Third party
import classNames from 'classnames';

let Loader = Lib.merge({}, LoaderCore, {
	mixins: [State, Events, genericWillMount],

	propTypes: {
		width: React.PropTypes.string,
		height: React.PropTypes.string
	},

	render () {
		const styles = {
			width: this.props.width,
			height: this.props.height
		};

		return (
			<div className={classNames(this.cssClasses.ICON, this.cssClasses.LOADER)} style={styles}></div>
		);
	}
});

Loader = Lib.runHelpers('react', CONTROL, Loader);
Loader = React.createClass(Loader);

export default Loader;
