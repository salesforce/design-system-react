/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { Component, Children } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { PortalSettingsContext } from '../../portal-settings';

/*
 * This component mounts its children within a disconnected render tree (portal).
 */

const documentDefined = typeof document !== 'undefined';
class Portal extends Component {
	constructor(props) {
		super(props);
		this.portalNode = null;
		this.state = {
			isOpen: false,
		};
	}

	componentDidMount() {
		this.renderPortal();
	}

	componentDidUpdate() {
		this.renderPortal();
	}

	componentWillUnmount() {
		this.unmountPortal();
	}

	getChildren() {
		return Children.only(this.props.children);
	}

	getPortalParentNode() {
		let element;
		if (typeof this.props.renderTo === 'string') {
			element = document.querySelector(this.props.renderTo);
		} else if (
			this.context &&
			typeof this.context.renderTo === 'string' &&
			document.querySelectorAll(this.context.renderTo) &&
			document.querySelectorAll(this.context.renderTo)[0]
		) {
			[element] = document.querySelectorAll(this.context.renderTo);
		} else {
			element = this.props.renderTo || (documentDefined && document.body);
		}
		return element;
	}

	setupPortalNode() {
		const parentParentNode = this.getPortalParentNode();
		this.portalNode = {};

		if (documentDefined) {
			this.portalNode = document.createElement(this.props.renderTag);
			this.portalNode.setAttribute(
				'style',
				'display: block; height: 0px; width: 0px;'
			);
			this.portalNode.setAttribute('className', 'design-system-react-portal');
			parentParentNode.appendChild(this.portalNode);
			this.portalNodeInstance = this.props.onMount
				? this.props.onMount(undefined, { portal: this.portalNode })
				: this.portalNode;
		}
	}

	unmountPortal() {
		if (this.portalNode) {
			ReactDOM.unmountComponentAtNode(this.portalNode);
			this.portalNode.parentNode.removeChild(this.portalNode);
		}
		this.portalNode = null;
	}

	updatePortal() {
		if (this.props.id) {
			this.portalNode.id = this.props.id;
		}

		if (this.props.className) {
			this.portalNode.className = this.props.className;
		}

		if (this.props.style) {
			Object.keys(this.props.style).forEach((key) => {
				this.portalNode.style[key] = this.props.style[key];
			});
		}

		if (this.props.onUpdate) {
			this.portalNodeInstance = this.props.onUpdate(this.portalNodeInstance);
		}
	}

	renderPortal() {
		// if no portal contents, then unmount
		if (!this.getChildren() || !documentDefined) {
			this.unmountPortal();
			return;
		}

		if (!this.portalNode) {
			this.setupPortalNode();
		}

		if (this.props.portalMount) {
			this.props.portalMount({
				instance: this,
				reactElement: this.getChildren(),
				domContainerNode: this.portalNode,
				updateCallback: () => {
					this.updatePortal(); // update after subtree renders
				},
			});
		} else {
			// actual render
			ReactDOM.unstable_renderSubtreeIntoContainer(
				this,
				this.getChildren(),
				this.portalNode,
				() => {
					this.updatePortal(); // update after subtree renders

					if (this.state.isOpen === false) {
						if (this.props.onOpen) {
							this.props.onOpen(undefined, { portal: this.getChildren() });
						}
						this.setState({ isOpen: true });
					}
				}
			);
		}
	}

	render() {
		return null;
	}
}

Portal.displayName = 'Portal';

Portal.propTypes = {
	/*
	 * What tag to use for the portal, defaults to `div`.
	 */
	renderTag: PropTypes.string,
	/*
	 * What node the portal is rendered to, defaults to `document.body`.
	 */
	renderTo: PropTypes.any,
	/*
	 * React id prop.
	 */
	id: PropTypes.string,
	/*
	 * Accepts a _single_ element or component.
	 */
	children: PropTypes.node,
	/*
	 * ClassName added to .
	 */
	className: PropTypes.any,
	/*
	 * An object of styles that are applied to the portal.
	 */
	style: PropTypes.object,
	/*
	 * Triggers when Portal render tree mounts. Pass in an undefined event and `{ portal: [node] }``
	 */
	onMount: PropTypes.func,
	/*
	 * Triggers when the portal is mounted.
	 */
	onOpen: PropTypes.func,
	/*
	 * Triggers when Portal re-renders its tree.
	 */
	onUpdate: PropTypes.func,
	/**
	 * If a dialog is `positione="overflowBoundaryElement"`, it will be rendered in a portal or separate render tree. This `portalMount` callback will be triggered instead of the the default `ReactDOM.unstable_renderSubtreeIntoContainer` and the function will mount the portal itself. Consider the following code that bypasses the internal mount and uses an Enzyme wrapper to mount the React root tree to the DOM.
	 *
	 * ```
	 * <Popover
	 *   isOpen
	 *   portalMount={({ instance, reactElement, domContainerNode }) => {
	 *     portalWrapper = Enzyme.mount(reactElement, { attachTo: domContainerNode });
	 *   }}
	 *   onOpen={() => {
	 *     expect(portalWrapper.find(`#my-heading`)).to.exist;
	 *     done();
	 *   }}
	 * />
	 * ```
	 */
	portalMount: PropTypes.func,
};

Portal.defaultProps = {
	renderTag: 'span',
	renderTo: null,
	onMount: () => null,
	onOpen: () => null,
	onUpdate: () => null,
	onUnmount: () => null,
};
Portal.contextType = PortalSettingsContext;
export default Portal;
