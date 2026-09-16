/* eslint-disable react/no-array-index-key */
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type CSSProperties } from 'react';

/**
 * Raw SVG shape data. Keys map to SVG child elements (`path`, `circle`,
 * `ellipse`, `g`), each holding a single attribute object or an array of them.
 * `viewBox` is pulled off separately when rendering the root `<svg>`.
 */
export interface SvgData {
	viewBox?: string;
	path?: Record<string, unknown> | Record<string, unknown>[];
	circle?: Record<string, unknown> | Record<string, unknown>[];
	ellipse?: Record<string, unknown> | Record<string, unknown>[];
	g?: SvgData | SvgData[];
	[key: string]: unknown;
}

export interface SvgProps {
	'aria-hidden'?: boolean | 'true' | 'false';
	className?: string;
	data?: SvgData;
	name?: string;
	style?: CSSProperties;
}

class Svg extends React.Component<SvgProps> {
	static displayName = 'Svg';

	getPaths = (paths: Record<string, unknown> | Record<string, unknown>[]) => {
		if (paths instanceof Array) {
			return paths.map((item, index) => <path key={index} {...item} />);
		}
		return <path key="pathSVG" {...paths} />;
	};

	getCircles = (
		circles: Record<string, unknown> | Record<string, unknown>[]
	) => {
		if (circles instanceof Array) {
			return circles.map((item, index) => <circle key={index} {...item} />);
		}
		return <circle key="circleSVG" {...circles} />;
	};

	getEllipses = (
		ellipses: Record<string, unknown> | Record<string, unknown>[]
	) => {
		if (ellipses instanceof Array) {
			return ellipses.map((item, index) => (
				<ellipse key={index} {...item} />
			));
		}
		return <ellipse key="ellipseSVG" {...ellipses} />;
	};

	getGroups = (groups: SvgData | SvgData[]): React.ReactNode => {
		if (groups instanceof Array) {
			return groups.map((item, index) => (
				<g key={index}>{this.getShapes(item)}</g>
			));
		}

		return <g key="groupsSVG">{this.getShapes(groups)}</g>;
	};

	getShapes = (data?: SvgData) => {
		const shapes: React.ReactNode[] = [];

		if (data) {
			if (data.g) {
				shapes.push(this.getGroups(data.g));
			}

			if (data.ellipse) {
				shapes.push(this.getEllipses(data.ellipse));
			}

			if (data.circle) {
				shapes.push(this.getCircles(data.circle));
			}

			if (data.path) {
				shapes.push(this.getPaths(data.path));
			}
		}
		return shapes;
	};

	getSVG = ({ viewBox, ...rest }: SvgData, props: SvgProps) => (
		<svg
			aria-hidden={props['aria-hidden']}
			className={props.className}
			viewBox={viewBox}
			name={props.name}
			style={props.style}
		>
			{this.getShapes(rest)}
		</svg>
	);

	render() {
		const { data, ...props } = this.props;

		return data ? this.getSVG(data, props) : null;
	}
}

export default Svg;
