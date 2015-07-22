import React from 'react';
import {Selectlist} from './selectlist';

var Page = React.createClass({
	changeCollection () {
		this.props.collection.selectlist1[0].name = 'chimichanga';	// this should trigger a DOM change
	},

	render () {
		return (
			<div>
			<ul>
				<li><Selectlist collection={this.props.collection.selectlist1} disabled={true} key={1}/></li>
				<li><Selectlist collection={this.props.collection.selectlist2} key={2}/></li>
				<li><Selectlist collection={this.props.collection.selectlist3} key={3}/></li>
				<li><Selectlist collection={this.props.collection.selectlist4} key={4}/></li>
			</ul>
			<button onClickCapture={this.changeCollection}>Update dropdown list</button>
			</div>
		);
	}
});

export default Page;