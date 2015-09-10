// Framework specific
import React from 'react';
import classNames from 'classnames';

const WizardStep = React.createClass({
	propTypes: {
		item: React.PropTypes.object.isRequired,
		index: React.PropTypes.number.isRequired,
		currentIndex: React.PropTypes.number.isRequired
	},

	render () {
		var stateClass = {
			active: this.props.index === this.props.currentIndex,
			completed: this.props.index < this.props.currentIndex
		};
		
		return (
			<li data-step={this.props.index} className={classNames(stateClass)}>
				<span className="badge">{this.props.index}</span>{this.props.item.getText()}<span className="chevron"></span>
			</li>
		);
	}
});

export default WizardStep;
