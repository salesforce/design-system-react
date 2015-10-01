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
    let onSelectStub = this.stub();
    let options = [
      {"value" : '1', "label" : '1'}
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
    expect(onSelectStub.calledWith('1')).to.be.ok;
  }));
});
