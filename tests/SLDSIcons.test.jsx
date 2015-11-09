const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
import { SLDSIcons } from '../components';
const { InputIcon, Icon, ButtonIcon } = SLDSIcons;
import { generateCmp, cmpClassName } from './tests_helpers';

describe('SLDSIcons:', () => {
  describe('Icon:', () => {

    describe('component renders', () => {
      it('renders', () => {
        const cmp = generateCmp(<Icon />);
        expect(cmp).to.not.equal(undefined);
        expect(cmp.children).to.not.equal(undefined);
        expect(cmp.children[0]).to.not.equal(undefined);
        
        const className = cmpClassName(cmp.children[0]);
        expect(className).to.not.equal(undefined);
      });

      it('with class slds-icon, category, and name', () => {
        const cmp = generateCmp(<Icon category="TESTCATEGORY" name="TESTINGNAME" />);
        const className = cmpClassName(cmp.children[0]);
        expect(className).to.contain('slds-icon');
        expect(className).to.contain('slds-icon-TESTCATEGORY-TESTINGNAME');
      });

      it('and transforms underscores in name to dashes', () => {
        const cmp = generateCmp(<Icon category="TEST_CATEGORY" name="TESTING_NAME" />);
        const className = cmpClassName(cmp.children[0]);
        expect(className).to.contain('slds-icon-TEST_CATEGORY-TESTING-NAME');
      });

      it('with custom class', () => {
        const cmp = generateCmp(<Icon className="I_AM_A_TESTING_CLASSNAME" />);
        const className = cmpClassName(cmp.children[0]);
        expect(className).to.contain('I_AM_A_TESTING_CLASSNAME');
      });
    });
  })

  describe('ButtonIcon:', () => {
    describe('component renders', () => {
      it('renders', () => {
        const cmp = generateCmp(<ButtonIcon />);
        expect(cmp).to.not.equal(undefined);
        
        const className = cmpClassName(cmp);
        expect(className).to.not.equal(undefined);
      });

      it('with custom class', () => {
        const cmp = generateCmp(<ButtonIcon className="I_AM_A_TESTING_CLASSNAME" />);
        
        const className = cmpClassName(cmp);
        expect(className).to.contain('I_AM_A_TESTING_CLASSNAME');
      });
    });
  })

  describe('InputIcon:', () => {
    describe('component renders', () => {
      it('renders', () => {
        const cmp = generateCmp(<InputIcon />);
        expect(cmp).to.not.equal(undefined);
        
        const className = cmpClassName(cmp);
        expect(className).to.not.equal(undefined);
      });

      it('with class slds-input__icon', () => {
        const cmp = generateCmp(<InputIcon />);
        const className = cmpClassName(cmp);
        expect(className).to.contain('slds-input__icon');
      });

      it('with custom class', () => {
        const cmp = generateCmp(<InputIcon className="I_AM_A_TESTING_CLASSNAME" />);
        const className = cmpClassName(cmp);
        expect(className).to.contain('I_AM_A_TESTING_CLASSNAME');
      });
    });
  })
});
