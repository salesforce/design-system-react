const Samples =  {
  Buttons: require('fs').readFileSync('demo/code-snippets/ButtonExamples.js', 'utf8'),
  ButtonGroups: require('fs').readFileSync('demo/code-snippets/ButtonGroupExamples.js', 'utf8'),
  Icons: require('fs').readFileSync('demo/code-snippets/IconExamples.js', 'utf8'),
  IconButtons: require('fs').readFileSync('demo/code-snippets/ButtonIconExamples.js', 'utf8'),
  Lookups: require('fs').readFileSync('demo/code-snippets/LookupExamples.js', 'utf8'),
  Modals: require('fs').readFileSync('demo/code-snippets/ModalExamples.js', 'utf8'),
  StatefulButtons: require('fs').readFileSync('demo/code-snippets/ButtonStatefulExamples.js', 'utf8'),
};

module.exports = Samples;
