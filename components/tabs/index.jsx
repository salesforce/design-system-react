/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Tabs Component

// Implements the [Tabs design pattern](https://www.lightningdesignsystem.com/components/tabs/) in React.

// ## Dependencies

// ### React
import React, { PropTypes, cloneElement } from 'react';

// Child components
// import TabsList from './tabs-list';
// import Tab from './tab';
// import TabItem from './tab-item';
// import TabPanel from './tab-panel';

// ### classNames
import classNames from 'classnames';

// ## Constants
import { TABS, TABS_LIST, TAB, TAB_PANEL } from '../../utilities/constants';
import uuid from '../../utilities/uuid';


module.exports = React.createClass({
	displayName: TABS,

	propTypes: {
		selected: PropTypes.number,
		children: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.element
		]).isRequired
	},
	getDefaultProps: function () {
		return {
			selected: 0
		};
	},
	getInitialState: function () {
		return {
			selected: this.props.selected
		};
	},
	shouldComponentUpdate(nextProps, nextState) {
		return this.props !== nextProps || this.state !== nextState;
	},
	handleClick: function (index, event) {
		event.preventDefault();
		this.setState({
			selected: index
		});
	},
	_renderTitles: function () {
		function labels(child, index) {
			var activeClass = (this.state.selected === index ? 'active' : '');
			return (
				<li key={index}>
					<a href="#" 
						className={activeClass}
						onClick={this.handleClick.bind(this, index)}>
						{child.props.label}
					</a>
				</li>
			);
		}
		return (
			<ul className="tabs__labels">
				{this.props.children.map(labels.bind(this))}
			</ul>
		);
	},
	_renderContent: function () {
		return (
			<div className="tabs__content">
				{this.props.children[this.state.selected]}
			</div>
		);
	},
	render: function () {
		return (
			<div className="tabs">
				{this._renderTitles()}
				{this._renderContent()}
			</div>
		);
	}
});

var Pane = React.createClass({
	displayName: 'Pane',
	propTypes: {
		label: PropTypes.string.isRequired,
		children: PropTypes.element.isRequired
	},
	render: function () {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
});

var App = React.createClass({
	render: function () {
		return (
			<div>
				<Tabs selected={0}>
					<Pane label="Tab 1">
						<div>This is my tab 1 contents!</div>
					</Pane>
					<Pane label="Tab 2">
						<div>This is my tab 2 contents!</div>
					</Pane>
					<Pane label="Tab 3">
						<div>This is my tab 3 contents!</div>
					</Pane>
				</Tabs>
			</div>
		);
	}
});
 
ReactDOM.render(<App />, document.querySelector('.container'));