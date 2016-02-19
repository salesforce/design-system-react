import React from 'react';
import assign from 'lodash.assign';
import TestUtils from 'react-addons-test-utils';

import {SLDSLookup} from '../../components';
const Header = SLDSLookup.DefaultHeader;
const Footer = SLDSLookup.DefaultFooter;
const {Simulate, scryRenderedDOMComponentsWithClass, scryRenderedDOMComponentsWithTag} = TestUtils;

describe.only('SLDSLookup: ',  function(){
  const generateLookup = function(lookupInstance) {
    let reactCmp = TestUtils.renderIntoDocument(lookupInstance);
    return React.findDOMNode(reactCmp);
  };

  const defaultProps = {
    emptyMessage:"No items found",
    footerRenderer:Footer,
    iconCategory:"standard",
    iconName:"account",
    label:"Account",
    onChange:function(newValue){console.log("New search term: ", newValue)},
    onSelect:function(item){console.log(item , " Selected")},
    options:[
      {label: "Paddy\"s Pub"},
      {label: "Tyrell Corp"},
      {label: "Paper St. Soap Company"},
      {label: "Nakatomi Investments"},
      {label: "Acme Landscaping"},
      {label: "Acme Construction"}
    ],
  };

  const getLookup = (props={}) => React.createElement(SLDSLookup, assign({}, defaultProps, props))
  const getLookupWithHeader = (props={headerRenderer: Header}) => React.createElement(SLDSLookup, assign({}, defaultProps, props))
  const getLookupWithSelection = (props={selectedItem: 1}) => React.createElement(SLDSLookup, assign({}, defaultProps, props))

  const getItems = lookup => lookup.getElementsByClassName('slds-lookup__item');

  describe('component renders', function() {
    it('lookup renders', function() {
      let lookup = generateLookup(getLookup());
      let lookupWithSelection = generateLookup(getLookupWithSelection());
      expect(lookup).to.not.equal(undefined);
      expect(lookupWithSelection).to.not.equal(undefined);
    });
  });

  describe('component basic props render', function() {
    it('renders label', function() {
      let lookup = generateLookup(getLookup());
      let label = lookup.getElementsByTagName("label")[0];
      expect(label.innerText).to.equal('Account');
    });
    it('LookupWithSelection - renders label', function() {
      let lookup = generateLookup(getLookupWithSelection());
      let label = lookup.getElementsByTagName("label")[0];
      expect(label.innerText).to.equal('Account');
    });
  });

  describe('accessibility markup passes', function() {
    it('label for matches input id', function() {
      let lookup = generateLookup(getLookup());
      let labelFor = lookup.getElementsByTagName("label")[0].getAttribute("for");
      let inputId = lookup.getElementsByTagName("input")[0].getAttribute("id");
      expect(labelFor).to.equal(inputId);
    });

    it('LookupWithSelection - label for matches input id', function() {
      let lookup = generateLookup(getLookupWithSelection());
      let labelFor = lookup.getElementsByTagName("label")[0].getAttribute("for");
      let inputId = lookup.getElementsByTagName("input")[0].getAttribute("id");
      expect(labelFor).to.equal(inputId);
    });

  });

  describe('accessibility aria attributes pass', function() {
    it('aria-haspopup is true', function() {
      let lookup = generateLookup(getLookup());
      let ariaHaspopup = lookup.getElementsByTagName("input")[0].getAttribute("aria-haspopup");
      expect(ariaHaspopup).to.equal('true');
    });

    it('aria-expanded is false initally', function() {
      let lookup = generateLookup(getLookup());
      let ariaExpanded = lookup.getElementsByTagName("input")[0].getAttribute("aria-expanded");
      expect(ariaExpanded).to.equal('false');
    });

    it('aria-expanded is true when clicking on input field', function() {
      let lookup = generateLookup(getLookup());
      let input = lookup.getElementsByTagName("input")[0];
      TestUtils.Simulate.click(input);
      let ariaExpanded = lookup.getElementsByTagName("input")[0].getAttribute("aria-expanded");
      expect(ariaExpanded).to.equal('true');
    });

    it('LookupWithSelection - aria-expanded is true when deleting selection', function() {
      let lookup = generateLookup(getLookupWithSelection());
      let input = lookup.getElementsByTagName("input")[0];
      TestUtils.Simulate.keyDown(input, {key: "Down", keyCode: 46, which: 46});
      let ariaExpanded = lookup.getElementsByTagName("input")[0].getAttribute("aria-expanded");
      expect(ariaExpanded).to.equal('true');
    });
  });


  describe('selecting item works', function() {

    it('no fixed header: focuses correct item', function() {
      let lookup = generateLookup(getLookup());
      let input = lookup.getElementsByTagName("input")[0];
      TestUtils.Simulate.click(input);
      TestUtils.Simulate.keyDown(input, {key: "Down", keyCode: 40, which: 40});
      TestUtils.Simulate.keyDown(input, {key: "Down", keyCode: 40, which: 40});
      let ariaActiveDescendant = lookup.getElementsByTagName("input")[0].getAttribute("aria-activedescendant");
      expect(ariaActiveDescendant).to.equal('item-1');
    });

    it('with fixed header: focuses correct item', function() {
      let lookup = generateLookup(getLookupWithHeader());
      let input = lookup.getElementsByTagName("input")[0];
      TestUtils.Simulate.click(input);
      TestUtils.Simulate.keyDown(input, {key: "Down", keyCode: 40, which: 40});
      TestUtils.Simulate.keyDown(input, {key: "Down", keyCode: 40, which: 40});
      let ariaActiveDescendant = lookup.getElementsByTagName("input")[0].getAttribute("aria-activedescendant");
      expect(ariaActiveDescendant).to.equal('item-0');
    });

    it('no header: selects correct item', function() {
      let lookup = generateLookup(getLookup());
      let input = lookup.getElementsByTagName("input")[0];
      TestUtils.Simulate.click(input);
      TestUtils.Simulate.keyDown(input, {key: "Down", keyCode: 40, which: 40});
      TestUtils.Simulate.keyDown(input, {key: "Down", keyCode: 40, which: 40});
      TestUtils.Simulate.keyDown(input, {key: "Down", keyCode: 40, which: 40});
      TestUtils.Simulate.keyDown(input, {key: "Enter", keyCode: 13, which: 13});
      let selected = lookup.getElementsByTagName("a")[0].getElementsByTagName('span')[0].innerText;
      expect(selected).to.equal('Paper St. Soap Company');
    });

    it('with header: selects correct item', function() {
      let lookup = generateLookup(getLookupWithHeader());
      let input = lookup.getElementsByTagName("input")[0];
      TestUtils.Simulate.click(input);
      TestUtils.Simulate.keyDown(input, {key: "Down", keyCode: 40, which: 40});
      TestUtils.Simulate.keyDown(input, {key: "Down", keyCode: 40, which: 40});
      TestUtils.Simulate.keyDown(input, {key: "Down", keyCode: 40, which: 40});
      TestUtils.Simulate.keyDown(input, {key: "Enter", keyCode: 13, which: 13});
      let selected = lookup.getElementsByTagName("a")[0].getElementsByTagName('span')[0].innerText;
      expect(selected).to.equal('Tyrell Corp');
    });

    it('closes lookup menu on esc', function() {
      let lookup = generateLookup(getLookup());
      let input = lookup.getElementsByTagName("input")[0];
      TestUtils.Simulate.click(input);
      TestUtils.Simulate.keyDown(input, {key: "Down", keyCode: 40, which: 40});
      TestUtils.Simulate.keyDown(input, {key: "Esc", keyCode: 27, which: 27});
      let ariaExpanded = input.getAttribute("aria-expanded");
      expect(ariaExpanded).to.equal('false');
    });

    it('aria-expanded is false after selecting item', function() {
      let lookup = generateLookup(getLookup());
      let input = lookup.getElementsByTagName("input")[0];
      TestUtils.Simulate.click(input);
      TestUtils.Simulate.keyDown(input, {key: "Down", keyCode: 40, which: 40});
      TestUtils.Simulate.keyDown(input, {key: "Enter", keyCode: 13, which: 13});
      expect(input.className).to.have.string('slds-hide');
    });

    it('aria-expanded is false after selecting item', function() {
      let lookup = generateLookup(getLookup());
      let input = lookup.getElementsByTagName("input")[0];
      TestUtils.Simulate.click(input);
      TestUtils.Simulate.keyDown(input, {key: "Down", keyCode: 40, which: 40});
      let focusedItem = lookup.getElementsByTagName("ul")[0].getElementsByTagName('li')[0];
      expect(focusedItem.className).to.have.string('slds-theme--shade');
    });

  });

  describe("expanded", function() {
    let lookup, input;

    beforeEach(function() {
      lookup = generateLookup(getLookup());
      input = lookup.getElementsByTagName("input")[0];
      Simulate.click(input);
    });

    it('filters its items', () => {
      Simulate.change(input, {target: {value: 'Pa'}});
      expect(getItems(lookup).length).to.equal(3);
    });

    it('filters its items all the way!', () => {
      Simulate.change(input, {target: {value: 'Poof!'}});
      expect(getItems(lookup).length).to.equal(1); //1 cause of add-item
    });

    it('unfilters its items if no val', () => {
      Simulate.change(input, {target: {value: ''}});
      expect(getItems(lookup).length).to.equal(7);
    });

    it('displays no items when item count is 0', () => {
      expect(lookup.getElementsByClassName('slds-lookup__message').length).to.equal(0);
      Simulate.change(input, {target: {value: 'kdjfksjdf'}});
      expect(getItems(lookup).length).to.equal(1); // add item
      expect(lookup.getElementsByClassName('slds-lookup__message').length).to.equal(1);
    });
  });

  describe("custom filter", function() {
    let lookup, input;

    beforeEach(function() {
      lookup = generateLookup(getLookup({filterWith: (t, i) => t === i.label[0] }));
      input = lookup.getElementsByTagName("input")[0];
      Simulate.click(input);
    });

    it('filters its items by case sensitive first letter', () => {
      Simulate.change(input, {target: {value: 'P'}});
      expect(getItems(lookup).length).to.equal(3);
      Simulate.change(input, {target: {value: 'p'}});
      expect(getItems(lookup).length).to.equal(1);
    });
  })
});
