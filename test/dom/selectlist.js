var Backbone = require('backbone');
var $ = require('jquery');
var chai = require('chai');
var expect = chai.expect;

var defaultArray = [
  { _itemType: 'header', name: 'One thing' },
  { id: 0, name: 'One', value: '1' },
  { _itemType: 'divider' },
  { _itemType: 'header', name: 'All the things' },
  { id: 1, name: 'Two', value: '2' },
  { _itemType: 'item', id: 2, name: 'Three', value: '3'  },
  { id: 3, name: 'Buzz', value: '4'  },
  { id: 4, name: 'Item Five', value: 'Item Five', fizz: 'buzz', foo: 'bar'  },
  { id: 5, name: 'A Disabled Item', disabled: true, value: 'disabled' }
];

module.exports = {
  defaultArrayModel: function() {
    var clonedArray = JSON.parse(JSON.stringify(defaultArray));
    return {
      collection: clonedArray,
      disabled: false,
      selection: clonedArray[0],
      resize: 'auto'
    };
  },
  initializedWithDefaultArray: function(element) {
    it('should have ' + defaultArray.length + ' list items.', function() {
      expect(element.querySelectorAll('li').length).to.equal(9);
    });

    it('should not be disabled.', function() {
      expect(element.classList.contains('disabled')).to.equal(false);
    });

    it('should not have a disabled button.', function() {
      expect(element.querySelector('button').classList.contains('disabled')).to.equal(false);
    });

    it('should respect the _itemType field on options.', function() {
      var listItems = element.querySelectorAll('li');
      expect(listItems[2].classList.contains('divider')).to.equal(true);
      expect(listItems[3].classList.contains('dropdown-header')).to.equal(true);
      expect(listItems[3].textContent).to.equal(defaultArray[3].name);
    });

    it('should mark the default selection as selected.', function() {
      expect(element.querySelector('.selected-label').textContent).to.equal(defaultArray[0].name);
    });

    it('should be closed by default', function() {
      var innerElement = element.querySelector('.selectlist');
      expect(innerElement.classList.contains('open')).to.equal(false);
    });

    it('should open when clicked.', function() {
      var innerElement = element.querySelector('.selectlist');
      $(innerElement.querySelector('button')).click();
      expect(innerElement.classList.contains('open')).to.equal(true);
    });
  },
  initializedDisabled: function(element) {
    it('should be disabled.', function() {
      expect(element.querySelector('.selectlist').classList.contains('disabled')).to.equal(true);
    });

    it('should have a disabled button.', function() {
      expect(element.querySelector('button').classList.contains('disabled')).to.equal(true);
    });

    it('should mark the default selection as selected.', function() {
      expect(element.querySelector('.selected-label').textContent).to.equal(defaultArray[0].name);
    });

    it('should be closed by default', function() {
      var innerElement = element.querySelector('.selectlist');
      expect(innerElement.classList.contains('open')).to.equal(false);
    });

    it('should not open when clicked.', function() {
      var innerElement = element.querySelector('.selectlist');
      $(innerElement.querySelector('button')).click();
      expect(innerElement.classList.contains('open')).to.equal(false);
    });
  }
};
