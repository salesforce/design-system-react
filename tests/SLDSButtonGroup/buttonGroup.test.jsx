import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import {SLDSButtonGroup} from '../../components';
import {SLDSButton} from '../../components';

describe('SLDSButtonGroup: ',  function(){

  let generateButtonGroup = function(buttonGroupInstance) {
    let reactCmp = TestUtils.renderIntoDocument(buttonGroupInstance);
    return React.findDOMNode(reactCmp);
  };

  describe('component renders', function() {
    it('buttonGroup renders', function() {
      let instance = <SLDSButtonGroup>
        <SLDSButton label='Chart' variant='icon' iconName='chart' iconVariant='border'/>
        <SLDSButton label='Filter' variant='icon' iconName='filter' iconVariant='border'/>
        <SLDSButton label='Sort' variant='icon' iconName='sort' iconVariant='more'/>
      </SLDSButtonGroup>;
      let buttonGroup = generateButtonGroup(instance);
      expect(buttonGroup).to.not.equal(undefined);
    });

    it('renders proper attributes', function() {
      let instance = <SLDSButtonGroup>
        <SLDSButton label='Chart' variant='icon' iconName='chart' iconVariant='border'/>
        <SLDSButton label='Filter' variant='icon' iconName='filter' iconVariant='border'/>
        <SLDSButton label='Sort' variant='icon' iconName='sort' iconVariant='more'/>
      </SLDSButtonGroup>;
      let buttonGroup = generateButtonGroup(instance);
      let role = buttonGroup.getAttribute('role');
      expect(role).to.equal('group');
    });

    it('renders children', function() {
      let instance = <SLDSButtonGroup>
        <SLDSButton label='Chart' variant='icon' iconName='chart' iconVariant='border'/>
        <SLDSButton label='Filter' variant='icon' iconName='filter' iconVariant='border'/>
        <SLDSButton label='Sort' variant='icon' iconName='sort' iconVariant='more'/>
      </SLDSButtonGroup>;
      let buttonGroup = generateButtonGroup(instance);
      let children = buttonGroup.getElementsByTagName('button');
      expect(children.length).to.equal(3);
    });
  });

  describe('component behavior works', function() {
    it('first button in group invokes method from props', function() {
      let onClick = sinon.spy();
      let instance = <SLDSButtonGroup>
                  <SLDSButton label='Refresh' variant='neutral' onClick={onClick} />
                  <SLDSButton label='Edit' variant='neutral' />
                  <SLDSButton label='Save' variant='neutral' />
                  <SLDSButton label='More Options' variant='icon' iconName='down' iconVariant='border-filled' />
      </SLDSButtonGroup>;
      let buttonGroup = generateButtonGroup(instance);
      let firstBtn = buttonGroup.getElementsByTagName('button')[0];
      TestUtils.Simulate.click(firstBtn);
      expect(onClick.calledOnce).to.be.true;
    });
  });

});
