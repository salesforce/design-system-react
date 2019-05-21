"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _deprecatedPropertyValue = _interopRequireDefault(require("../warning/deprecated-property-value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
describe('Console Warnings: ', function () {
  describe('Deprecated Property Value: ', function () {
    it('Warns if value has been moved to another property', function () {
      var log = sinon.spy();
      var deprecatedValue = 'info';
      (0, _deprecatedPropertyValue.default)('Dummy Component Name', {
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
      (0, _deprecatedPropertyValue.default)('Dummy Component Name', {
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