// Framework specific
import React from 'react';

const WizardStep = React.createClass({
	propTypes: {
		strings: React.PropTypes.object.isRequired,
		isLast: React.PropTypes.bool.isRequired,
		onPrevClicked: React.PropTypes.func.isRequired,
		onNextClicked: React.PropTypes.func.isRequired,
		onFinished: React.PropTypes.func.isRequired
	},

	render () {
		return (
			<div className="actions">
				<button type="button" className="btn btn-default btn-prev" onClick={this.props.onPrevClicked}><span className="glyphicon glyphicon-arrow-left"></span>{this.props.strings.PREV}</button>
				<button type="button" className="btn btn-default btn-next" onClick={this.props.isLast ? this.props.onFinished : this.props.onNextClicked}>{this.props.isLast ? this.props.strings.COMPLETE : this.props.strings.NEXT}<span className="glyphicon glyphicon-arrow-right"></span></button>
			</div>
		);
	}
});

export default WizardStep;
