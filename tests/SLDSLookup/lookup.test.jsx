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

  let generateLookup = function(lookupInstance) {
    let reactCmp = TestUtils.renderIntoDocument(lookupInstance);
    return React.findDOMNode(reactCmp);
  };

  describe('component renders', function() {
    it('lookup renders', function() {
      let lookup = generateLookup(<SLDSLookup items={items} label="Leads" type="lead" />);
      expect(lookup).to.not.equal(undefined);
    });
  });

  describe('component basic props render', function() {
    it('renders label', function() {
      let lookup = generateLookup(<SLDSLookup items={items} label="Leads" type="lead" />);
      let label = lookup.getElementsByTagName("label")[0];
      expect(label.innerText).to.equal('Leads');
    });
  });

  describe('accessibility markup passes', function() {
    it('label for matches input id', function() {
      let lookup = generateLookup(<SLDSLookup items={items} label="Leads" type="lead" />);
      let labelFor = lookup.getElementsByTagName("label")[0].getAttribute("for");
      let inputId = lookup.getElementsByTagName("input")[0].getAttribute("id");
      expect(labelFor).to.equal(inputId);
    });

  });

  describe('accessibility aria attributes pass', function() {
    it('aria-expanded is false initally', function() {
      let lookup = generateLookup(<SLDSLookup items={items} label="Leads" type="lead" />);
      let ariaExpanded = lookup.getElementsByTagName("input")[0].getAttribute("aria-expanded");
      expect(ariaExpanded).to.equal('false');
    });

    it('aria-expanded is true when lookup menu opens', function() {
      let lookup = generateLookup(<SLDSLookup items={items} label="Leads" type="lead" />);
      let input = lookup.getElementsByTagName("input")[0];
      let ariaExpanded = lookup.getElementsByTagName("input")[0].getAttribute("aria-expanded");
      TestUtils.Simulate.focus(input);
      expect(ariaExpanded).to.equal('true');
    });
  });

});
