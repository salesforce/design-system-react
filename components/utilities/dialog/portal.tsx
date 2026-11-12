/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	useContext,
	useEffect,
	useRef,
	useState,
	Children,
	type ReactNode,
	type CSSProperties,
} from 'react';
import { createPortal } from 'react-dom';
import { PortalSettingsContext } from '../../portal-settings';

/*
 * This component mounts its children within a disconnected render tree (portal).
 *
 * Reimplemented on top of React 18/19's `ReactDOM.createPortal`. The previous
 * implementation relied on `ReactDOM.unstable_renderSubtreeIntoContainer` and
 * `ReactDOM.unmountComponentAtNode`, both of which were removed in React 19.
 */

export interface PortalProps {
	/**
	 * What tag to use for the portal, defaults to `span`.
	 */
	renderTag?: string;
	/**
	 * What node the portal is rendered to, defaults to `document.body`.
	 */
	renderTo?: string | HTMLElement | null;
	/**
	 * React id prop.
	 */
	id?: string;
	/**
	 * Accepts a _single_ element or component.
	 */
	children?: ReactNode;
	/**
	 * ClassName added to the portal node.
	 */
	className?: string;
	/**
	 * An object of styles that are applied to the portal.
	 */
	style?: CSSProperties;
	/**
	 * Triggers when Portal render tree mounts. Pass in an undefined event and `{ portal: [node] }`
	 */
	onMount?: (event: undefined, data: { portal: HTMLElement }) => unknown;
	/**
	 * Triggers when the portal is mounted.
	 */
	onOpen?: (event: undefined, data: { portal: ReactNode }) => void;
	/**
	 * Triggers when Portal re-renders its tree.
	 */
	onUpdate?: (instance: unknown) => unknown;
}

const documentDefined = typeof document !== 'undefined';

const Portal = (props: PortalProps): React.ReactPortal | null => {
	const {
		renderTag = 'span',
		renderTo = null,
		id,
		className,
		style,
		onMount,
		onOpen,
		onUpdate,
		children,
	} = props;

	const context = useContext(PortalSettingsContext);
	const portalNodeRef = useRef<HTMLElement | null>(null);
	const portalNodeInstanceRef = useRef<unknown>(null);
	const [isMounted, setIsMounted] = useState(false);

	// Resolve where the portal's DOM node should be appended. Precedence matches
	// the legacy implementation: explicit `renderTo` selector/node > context
	// `renderTo` selector > `document.body`.
	const getPortalParentNode = (): Element | null => {
		if (typeof renderTo === 'string') {
			return document.querySelector(renderTo);
		}
		if (
			context &&
			typeof context.renderTo === 'string' &&
			document.querySelectorAll(context.renderTo)[0]
		) {
			return document.querySelectorAll(context.renderTo)[0];
		}
		return renderTo || (documentDefined ? document.body : null);
	};

	// Create the portal container node, append it to the parent, and tear it
	// down on unmount. Runs once (mount/unmount lifecycle).
	useEffect(() => {
		if (!documentDefined) {
			return undefined;
		}

		const node = document.createElement(renderTag);
		node.setAttribute('style', 'display: block; height: 0px; width: 0px;');
		node.className = 'design-system-react-portal';

		const parent = getPortalParentNode();
		if (parent) {
			parent.appendChild(node);
		}

		portalNodeRef.current = node;
		portalNodeInstanceRef.current = onMount
			? onMount(undefined, { portal: node })
			: node;

		setIsMounted(true);

		if (onOpen) {
			onOpen(undefined, { portal: children });
		}

		return () => {
			if (node.parentNode) {
				node.parentNode.removeChild(node);
			}
			portalNodeRef.current = null;
			portalNodeInstanceRef.current = null;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Keep the container node's id/className/style in sync with props, and fire
	// `onUpdate` after each render (matches the legacy `updatePortal` behavior).
	useEffect(() => {
		const node = portalNodeRef.current;
		if (!node) {
			return;
		}

		if (id) {
			node.id = id;
		}
		if (className) {
			node.className = className;
		}
		if (style) {
			(Object.keys(style) as Array<keyof CSSProperties>).forEach((key) => {
				(node.style as unknown as Record<string, unknown>)[key as string] =
					style[key] as unknown as string;
			});
		}
		if (onUpdate) {
			portalNodeInstanceRef.current = onUpdate(portalNodeInstanceRef.current);
		}
	});

	const child = children ? Children.only(children) : null;

	if (!isMounted || !portalNodeRef.current || !child) {
		return null;
	}

	return createPortal(child, portalNodeRef.current);
};

Portal.displayName = 'Portal';

export default Portal;
