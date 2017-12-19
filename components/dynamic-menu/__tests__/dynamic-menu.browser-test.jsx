// Copied tests here from Sida's file. Have not separated browser tests from snapshot tests yet.

import React from 'react';
import { shallow } from 'enzyme';

import DynamicMenu from '../index';
import Listbox from '../list-box';
import Listitem from '../list-item';
import Searchbox from '../search-box';

describe('DynamicMenu', () => {
	const item1 = { name: 'a', label: 'a label' };
	const item2 = { name: 'b', label: 'b label' };
	const items = [item1, item2];
	it('renders top normally', () => {
		const wrapper = shallow(<DynamicMenu availableItems={items} />);

		expect(wrapper.find(Listbox)).to.have.length(1);
		expect(wrapper.find(Searchbox)).to.have.length(1);
		expect(wrapper.find('.slds-form-element')).to.have.length(1);
	});

	it('renders listbox normally', () => {
		const wrapper = shallow(<Listbox allObjects={items} searchValue="abc" />);
		expect(wrapper.find('#listbox-unique-id')).to.have.length(1);
	});

	it('renders listbox without items', () => {
		const wrapper = shallow(<Listbox allObjects={[]} searchValue="abc" />);

		expect.include(
			wrapper.html(),
			app.i18n.t('context:details.searchNoMatches', { 0: 'abc' })
		);
	});

	it('renders listbox with onclick', () => {
		const onSelectItem = sinon.spy();
		const wrapper = shallow(
			<Listbox allObjects={items} onSelectItem={onSelectItem} />
		);
		const listitem = wrapper.find(Listitem);
		expect(listitem).to.have.length(2);
		listitem.at(0).simulate('click');
		expect.equal(onSelectItem.calledOnce, true);
		expect(onSelectItem.calledWith(item1));
	});

	it('renders listitem normally', () => {
		const onClick = sinon.spy();
		const wrapper = shallow(
			<Listitem objectEntity={item1} onClick={onClick} />
		);
		expect(wrapper.find('.slds-listbox__item')).to.have.length(1);
		expect.include(wrapper.html(), item1.name);
	});

	it('renders searchbox normally', () => {
		const wrapper = shallow(<Searchbox searchValue="abc" />);
		expect(wrapper.find('.slds-form-element')).to.have.length(1);
		expect(wrapper.find('.slds-combobox_container')).to.have.length(1);
		expect(wrapper.find('.slds-has-inline-listbox')).to.have.length(0);
	});

	it('renders searchbox with selectedItem', () => {
		const wrapper = shallow(
			<Searchbox selectedItem={item2} searchValue="abc" />
		);
		expect(wrapper.find('.slds-form-element')).to.have.length(1);
		expect(wrapper.find('.slds-combobox_container')).to.have.length(1);
		expect(wrapper.find('.slds-has-inline-listbox')).to.have.length(1);
	});
});
