var fs = require('fs');
var $ = require('jquery');
window.$ = window.jQuery = $;

var chai = require('chai');
var expect = chai.expect;
var domSelectList = require('../dom/selectlist');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
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

  describe('react tests', function() {
    beforeEach(function() {
      this.options = domSelectList.defaultArrayModel();
      var component = React.createElement(SelectList, this.options);
      this.rendered = React.render(component, targetElement);
    });

    it('should keep the selection state in sync with the props.', function() {
      var self = this;
      expect(this.rendered.state.selection).to.equal(this.options.selection);
      this.rendered.setProps({selection: this.options.collection[1]}, function() {
        expect(self.rendered.state.selection).to.equal(self.options.collection[1]);
      });
    });

    it('should keep the disabled state in sync with the props.', function() {
      var self = this;
      expect(this.rendered.state.disabled).to.equal(this.options.disabled);
      this.rendered.setProps({disabled: !this.options.disabled}, function() {
        expect(self.rendered.state.disabled).to.equal(!self.options.disabled);
      });
    });

    it('should fire the on selected callback on an item click.', function() {
      var options = this.options;
      options.onSelected = function(item) {
        chai.expect(item).to.equal(options.collection[4]); // Fourth option is the second clickable.
      };
      var component = React.createElement(SelectList, options);
      this.rendered = React.render(component, targetElement);
      $(this.rendered.getDOMNode().querySelector('button')).click();
      TestUtils.Simulate.click(this.rendered.getDOMNode().querySelectorAll('li a')[1]);
    });
  });
});
