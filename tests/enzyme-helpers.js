import { mount } from 'enzyme';

/*
	Setup and takedown
 */
const mountComponent = (instance) => function () {
	this.dom = document.createElement('div');
	const mountNode = document.body.appendChild(this.dom);
	mountNode.id = 'mount-node';
	this.wrapper = mount(instance, { attachTo: mountNode });
};

function unmountComponent () {
	this.wrapper.unmount();
	document.body.removeChild(this.dom);
}

module.exports.mountComponent = mountComponent;
module.exports.unmountComponent = unmountComponent;
