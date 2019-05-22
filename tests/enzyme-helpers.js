import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

/*
	Setup and takedown
 */

function createMountNode({ context, mountNodeId }) {
	const internalmountNodeId = mountNodeId || 'mount-node';
	// eslint-disable-next-line no-param-reassign
	context.dom = document.createElement('div');
	const mountNode = document.body.appendChild(context.dom);
	mountNode.id = internalmountNodeId;
	return mountNode;
}

const mountComponent = (instance) =>
	function mountComponentInside() {
		this.dom = document.createElement('div');
		const mountNode = document.body.appendChild(this.dom);
		mountNode.id = 'mount-node';
		this.wrapper = mount(instance, { attachTo: mountNode });
	};

function unmountComponent() {
	this.wrapper.unmount();
	document.body.removeChild(this.dom);
}

function destroyMountNode({ wrapper, mountNode }) {
	wrapper.unmount();
	document.body.removeChild(mountNode);
}

export { createMountNode, destroyMountNode, mountComponent, unmountComponent };
