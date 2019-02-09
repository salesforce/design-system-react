import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb as BreadcrumbRoot } from '../index';

export default class Breadcrumb extends React.Component {
	render() {
		return (
			<BreadcrumbRoot
				style={this.props.style}
				trail={this.props.items.map((item) => (
					<a id={item.id} href={item.href}>
						{item.label}
					</a>
				))}
			/>
		);
	}
}

Breadcrumb.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			label: PropTypes.string,
			href: PropTypes.string,
		})
	),
};
