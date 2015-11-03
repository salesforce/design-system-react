// Framework specific
import React from 'react';
import classNames from 'classnames';

const WizardStep = React.createClass({
	propTypes: {
		currentIndex: React.PropTypes.number.isRequired,
		index: React.PropTypes.number.isRequired,
		item: React.PropTypes.shape({
			getText: React.PropTypes.func.isRequired
		}),
		onClicked: React.PropTypes.func.isRequired
		// TODO: Strings is a prop being passed in but not used
		// strings: React.PropTypes.object
	},

	render () {
		const state = {
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
