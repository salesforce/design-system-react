import React from 'react';
import {Selectlist} from './selectlist';

var Page = React.createClass({
	changeCollection () {
		var model = this.props.model;
		model.selectlist1.collection[0].name = 'chimichanga';
		model.selectlist2.disabled = false;
		model.selectlist3.disabled = true;
		
		this.setProps({
			model: model
		});
	},

	render () {
		return (
			<div>
			<ul>
				<li><Selectlist collection={this.props.model.selectlist1.collection} selection={this.props.model.selectlist1.selection} disabled={this.props.model.selectlist1.disabled} key={1}/></li>
				<li><Selectlist collection={this.props.model.selectlist2.collection} selection={this.props.model.selectlist2.selection} disabled={this.props.model.selectlist2.disabled} key={2}/></li>
				<li><Selectlist collection={this.props.model.selectlist3.collection} selection={this.props.model.selectlist3.selection} disabled={this.props.model.selectlist3.disabled} key={3}/></li>
				<li><Selectlist collection={this.props.model.selectlist4.collection} selection={this.props.model.selectlist4.selection} disabled={this.props.model.selectlist4.disabled} key={4}/></li>
			</ul>
			<button onClick={this.changeCollection}>Update dropdown list</button>
			</div>
		);
	}
});

export default Page;