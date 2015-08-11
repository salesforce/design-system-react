var fs = require('fs');
var $ = require('jquery');
window.$ = window.jQuery = $;

var chai = require('chai');
var assert = chai.assert;
var domSelectList = require('../dom/selectlist');
var React = require('react');
var SelectList = require('../../src/react/selectlist/selectlist');
require('bootstrap');

describe('Selectlist React Facade', function() {
  var targetElement = document.body.querySelector('#test-fixture');
  afterEach(function() {
    targetElement.innerHTML = '';
  });

  describe('dom tests', function() {
    describe('default options', function() {
      beforeEach(function() {
        var component = React.createElement(SelectList, domSelectList.defaultArrayModel());
        React.render(component, targetElement);
      });
      domSelectList.initializedWithDefaultArray(targetElement);
    });

    describe('disabled', function() {
      beforeEach(function() {
        var options = domSelectList.defaultArrayModel();
        options.disabled = true;
        var component = React.createElement(SelectList, options);
        React.render(component, targetElement);
      });

      domSelectList.initializedDisabled(targetElement);
    });
  });
});
