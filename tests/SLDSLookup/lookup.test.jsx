const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
import {SLDSLookup} from '../../components';

describe('SLDSLookup: ',  function(){

  let items = [
    {label:'Paddy\'s Pub'},
    {label:'Tyrell Corp'},
    {label:'Paper St. Soap Company'},
    {label:'Nakatomi Investments'},
    {label:'Acme Landscaping'},
    {label:'Acme Construction'}
  ];

  const generateLookup = function(lookupInstance) {
    let reactCmp = TestUtils.renderIntoDocument(lookupInstance);
    return React.findDOMNode(reactCmp);
  };

  const getLookup = function(withHeader) {
    return <SLDSLookup
      items={items}
      label="Leads"
      type="lead"
      headerRenderer={withHeader?SLDSLookup.DefaultHeader:null}
      footerRenderer={SLDSLookup.DefaultFooter}
    />;
  };

  describe('component renders', function() {
    it('lookup renders', function() {
      let lookup = generateLookup(getLookup());
      expect(lookup).to.not.equal(undefined);
    });
  });

  describe('component basic props render', function() {
    it('renders label', function() {
      let lookup = generateLookup(getLookup());
      let label = lookup.getElementsByTagName("label")[0];
      expect(label.innerText).to.equal('Leads');
    });
  });

  describe('accessibility markup passes', function() {
    it('label for matches input id', function() {
      let lookup = generateLookup(getLookup());
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
      let lookup = generateLookup(getLookup(true));
      let input = lookup.getElementsByTagName("input")[0];
      TestUtils.Simulate.click(input);
      TestUtils.Simulate.keyDown(input, {key: "Down", keyCode: 40, which: 40});
      TestUtils.Simulate.keyDown(input, {key: "Down", keyCode: 40, which: 40});
      let ariaActiveDescendant = lookup.getElementsByTagName("input")[0].getAttribute("aria-activedescendant");
      expect(ariaActiveDescendant).to.equal('item-0');
    });

    it('selects correct item', function() {
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

});
