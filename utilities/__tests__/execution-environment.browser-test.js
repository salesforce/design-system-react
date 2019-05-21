"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _executionEnvironment = require("../execution-environment");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
describe('Execution Environment: ', function () {
  it('Window and Document/DOM exists, elements can be created', function () {
    (0, _chai.expect)(_executionEnvironment.canUseDOM).to.be.true;
  });
  it('Event Listeners can be created', function () {
    (0, _chai.expect)(_executionEnvironment.canUseEventListeners).to.be.true;
  });
  it('Viewport exists', function () {
    (0, _chai.expect)(_executionEnvironment.canUseViewport).to.be.true;
  });
});