// TREE ITEM - REACT FACADE

// Framework specific
import React from 'react';

export const CONTROL = 'tree-heading';

const TreeHeading = React.createClass({
	displayName: CONTROL,

	propTypes: {
		heading: React.PropTypes.string
	},

	render () {
		const headingText = this.props.heading;
		let toReturn = (<span></span>);
		if (headingText.length !== 0) {
			toReturn = (
				<h4 className="slds-text-heading--label">{headingText}</h4>
			);
		}
		return toReturn;
	}

});

export default TreeHeading;
