// Framework specific
import React from 'react';
import classNames from 'classnames';

const WizardStep = React.createClass({
	propTypes: {
		item: React.PropTypes.object.isRequired,
		index: React.PropTypes.number.isRequired,
		currentIndex: React.PropTypes.number.isRequired,
		onClicked: React.PropTypes.func.isRequired
	},

	render () {
		var state = {
			active: this.props.index === this.props.currentIndex,
			complete: this.props.index < this.props.currentIndex
		};
		
		return (
			<li data-step={this.props.index} className={classNames(state)} onClick={state.complete ? this.props.onClicked : undefined}>
				<span className="badge">{this.props.index}</span>{this.props.item.getText()}<span className="chevron"></span>
			</li>
		);
	}
});

export default WizardStep;
