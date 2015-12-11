const Samples =  {
  Buttons: require('fs').readFileSync('demo/code-snippets/ButtonExamples.js', 'utf8'),
  Icons: require('fs').readFileSync('demo/code-snippets/IconExamples.js', 'utf8'),
};

module.exports = Samples;
