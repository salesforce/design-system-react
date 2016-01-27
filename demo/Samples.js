const Samples =  {
  Buttons: require('fs').readFileSync('demo/code-snippets/ButtonExamples.js', 'utf8'),
  ButtonGroups: require('fs').readFileSync('demo/code-snippets/ButtonGroupExamples.js', 'utf8'),
  Dropdowns: require('fs').readFileSync('demo/code-snippets/DropdownExamples.js', 'utf8'),
  Icons: require('fs').readFileSync('demo/code-snippets/IconExamples.js', 'utf8'),
  IconButtons: require('fs').readFileSync('demo/code-snippets/ButtonIconExamples.js', 'utf8'),
  Lookups: require('fs').readFileSync('demo/code-snippets/LookupExamples.js', 'utf8'),
  Modals: require('fs').readFileSync('demo/code-snippets/ModalExamples.js', 'utf8'),
  Notifications: require('fs').readFileSync('demo/code-snippets/NotificationExamples.js', 'utf8'),
  Picklists: require('fs').readFileSync('demo/code-snippets/PicklistExamples.js', 'utf8'),
  CustomPicklists: require('fs').readFileSync('demo/code-snippets/PicklistCustomExamples.js', 'utf8'),
  StatefulButtons: require('fs').readFileSync('demo/code-snippets/ButtonStatefulExamples.js', 'utf8'),
  Tooltips: require('fs').readFileSync('demo/code-snippets/TooltipExamples.js', 'utf8'),
  DatepickerSingleSelect: require('fs').readFileSync('demo/code-snippets/DateInputExample-1.js', 'utf8'),
};

module.exports = Samples;
