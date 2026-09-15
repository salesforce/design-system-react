/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type ReactNode, type CSSProperties } from 'react';
import classNames from '../../utilities/class-names';
import Svg from '../utilities/utility-icon/svg';
import { ILLUSTRATION } from '../../utilities/constants';
// Development-only deprecation warning. Illustration is deprecated for security
// reasons (imported SVGs bypass SLDS styles via shadow DOM, and a user-provided
// `path` is an XSS vector). This must fire — do not drop it.
import checkProps from './check-props';

/**
 * Illustration size options
 */
export type IllustrationSize = 'small' | 'large';

/**
 * SVG illustration data structure
 */
export interface IllustrationData {
	viewBox?: string;
	[key: string]: unknown;
}

/**
 * Props for the Illustration component
 */
export interface IllustrationProps {
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** Heading text */
	heading?: string;
	/** Custom SVG object */
	illustration?: IllustrationData;
	/** Whether SVGs are from design-system-react repo */
	internalIllustration?: boolean;
	/** Message body below heading */
	messageBody?: string | ReactNode;
	/** Name of the illustration */
	name?: string;
	/** Path to illustration SVG */
	path?: string;
	/** Size of illustration */
	size?: IllustrationSize;
	/** Custom styles for SVG */
	style?: CSSProperties;
}

const sanitizePath = (path: string) => {
	if (!path || typeof path !== 'string') {
		return undefined;
	}

	// Remove control characters, null bytes, and normalize whitespace
	const normalizedPath = path
		.replace(/[\x00-\x1f\x7f]/g, '') // eslint-disable-line no-control-regex
		.trim()
		.toLowerCase();

	const dangerousProtocols = [
		'javascript:', // eslint-disable-line no-script-url
		'data:',
		'vbscript:',
		'file:',
		'blob:',
	];

	const isDangerous = dangerousProtocols.some((protocol) =>
		normalizedPath.startsWith(protocol)
	);

	if (isDangerous) {
		// eslint-disable-next-line no-console
		console.log(
			`Illustration: Blocked potentially unsafe path "${path}". Only http, https, relative paths, and fragment identifiers are allowed.`
		);
		return undefined;
	}

	return path;
};

/**
 * An illustration is an image and inline text that work in tandem to communicate a state in a more friendly way.
 */
const Illustration = ({
	className,
	illustration,
	heading,
	messageBody,
	name,
	path,
	internalIllustration = true,
	size = 'small',
	style = {},
	...rest
}: IllustrationProps): React.ReactElement => {
	// Dev-only deprecation warning (see check-props.js): Illustration is
	// deprecated, and using `path` with user-provided SVGs is an XSS risk.
	(checkProps as (component: string, props: unknown) => void)(ILLUSTRATION, {
		className,
		illustration,
		heading,
		messageBody,
		name,
		path,
		internalIllustration,
		size,
		style,
	});

	const kebabCaseName = name ? name.replace(/_| /g, '-').toLowerCase() : '';
	const styles: CSSProperties = { ...style };
	let illustrationSvg: React.ReactNode = null;

	// Large illustration SVG should have a default height of 400px if not already specified
	if (size === 'large' && !styles.height) {
		styles.height = '400px';
	}

	if (illustration) {
		// Use SVG data passed in with `illustration` prop
		illustrationSvg = (
			<Svg
				className="slds-illustration__svg"
				aria-hidden="true"
				data={illustration}
				name={kebabCaseName}
				style={styles}
			/>
		);
	} else if (path) {
		const safePath = sanitizePath(path);
		if (safePath) {
			illustrationSvg = (
				<svg
					className="slds-illustration__svg"
					aria-hidden="true"
					name={kebabCaseName}
					style={styles}
				>
					<use xlinkHref={safePath} />
				</svg>
			);
		}
	}

	return (
		<div
			className={classNames(className as string, 'slds-illustration', {
				'slds-illustration_small': size === 'small',
				'slds-illustration_large': size === 'large',
			})}
		>
			{illustrationSvg}
			<div className="slds-text-longform">
				{heading && <h3 className="slds-text-heading_medium">{heading}</h3>}
				{messageBody && <p className="slds-text-body_regular">{messageBody}</p>}
			</div>
		</div>
	);
};

Illustration.displayName = ILLUSTRATION;

export default Illustration;
