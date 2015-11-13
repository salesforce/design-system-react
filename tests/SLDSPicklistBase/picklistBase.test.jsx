const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
import {SLDSPicklistBase} from '../../components';

describe('SLDSPicklistBase: ',  function(){

  let clickOnItem = (cmp, index) => {
       let items = TestUtils.scryRenderedDOMComponentsWithTag(
           cmp, 'a'
       );

       TestUtils.Simulate.click(items[index]);
   };

  it('onSelect fires upon selection change', sinon.test(function() {
    const expectedSelOption = {"value" : '1', "label" : '1', "extra1": 'extra1', "extra2" : { "prop1" : 'prop1', "prop2" : 'prop2'};
    const onSelectStub = this.stub();
    
    let options = [
      {"value" : '1', "label" : '1', "extra1": 'extra1', "extra2" : { "prop1" : 'prop1', "prop2" : 'prop2'}
    ];

    let cmp = TestUtils.renderIntoDocument(
      <SLDSPicklistBase options={options} onSelect={onSelectStub}/>
    );

    let button = TestUtils.findRenderedDOMComponentWithTag(
      cmp, 'button'
    );

    TestUtils.Simulate.click(button);
    clickOnItem(cmp, 0);

    expect(onSelectStub.calledOnce).to.be.ok;
    expect(onSelectStub.calledWith(expectedSelOption)).to.be.ok;
  }));
});
