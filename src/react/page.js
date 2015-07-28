import React from 'react';
import {Selectlist} from './selectlist';

var Page = React.createClass({
	changeCollection () {
		var models = this.props.models;
		Object.keys(models).forEach(key => {
			models[key].disabled = !models[key].disabled;
		});

		this.setProps({
			models: models
		});
	},

	getSelectionHandler: function (model) {
		return function (selection) {
			model.selection = selection;
		}
	},

	render () {
		this.props.models.selectlist1.onSelected = this.getSelectionHandler(this.props.models.selectlist1);
		this.props.models.selectlist2.onSelected = this.getSelectionHandler(this.props.models.selectlist2);
		this.props.models.selectlist3.onSelected = this.getSelectionHandler(this.props.models.selectlist3);
		this.props.models.selectlist4.onSelected = this.getSelectionHandler(this.props.models.selectlist4);

		return (
			<div>
				<ul className="selectlist-examples">
					<li>{React.createElement(Selectlist, this.props.models.selectlist1)}</li>

					<li>{React.createElement(Selectlist, this.props.models.selectlist2)}</li>

					<li>{React.createElement(Selectlist, this.props.models.selectlist3)}</li>

					<li>{React.createElement(Selectlist, this.props.models.selectlist4)}</li>
				</ul>

				<button className="selectlist-action btn btn-primary" onClick={this.changeCollection}>Toggle Enabled / Disabled</button>
			</div>
		);
	}
});

export default Page;
