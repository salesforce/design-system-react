"use strict";

var _chai = require("chai");

var _chai2 = _interopRequireDefault(_chai);

var _deprecatedPropertyValue = require("../warning/deprecated-property-value");

var _deprecatedPropertyValue2 = _interopRequireDefault(_deprecatedPropertyValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
describe('Console Warnings: ', function () {
  describe('Deprecated Property Value: ', function () {
    it('Warns if value has been moved to another property', function () {
      var log = sinon.spy();
      var deprecatedValue = 'info';
      (0, _deprecatedPropertyValue2.default)('Dummy Component Name', {
        propAsString: 'variant',
        propValue: deprecatedValue,
        deprecatedPropValue: deprecatedValue,
        replacementPropAsString: 'theme',
        replacementPropAsValue: 'info',
        log: log
      });
      (0, _chai.expect)(log.calledOnce).to.be.true;
    });
    it('Should NOT warn, since propValue does not equal deprecatedPropValue', function () {
      var log = sinon.spy();
      var deprecatedValue = 'info';
      var notDeprecatedValue = 'test';
      (0, _deprecatedPropertyValue2.default)('Dummy Component Name', {
        propAsString: 'variant',
        propValue: notDeprecatedValue,
        deprecatedPropValue: deprecatedValue,
        replacementPropAsString: 'theme',
        replacementPropAsValue: 'info',
        log: log
      });
      (0, _chai.expect)(log.calledOnce).to.be.false;
    });
  });
});