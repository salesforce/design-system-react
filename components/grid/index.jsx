/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import classNames from 'classnames';

class GridColumn extends React.Component {
	getClassName() {
		return `${this.props.className} slds-col`;
	}

	render() {
		return <div className={this.getClassName()}>{this.props.children}</div>;
	}
}

class Grid extends React.Component {
	getClassName() {
		const { flavor } = this.props;
		return classNames(this.props.className, 'slds-grid', {
			[`slds-grid_${flavor}`]: flavor,
		});
	}

	render() {
		return <div className={this.getClassName()}>{this.props.children}</div>;
	}
}

Grid.Column = GridColumn;

export default Grid;
