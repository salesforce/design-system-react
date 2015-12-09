const CM = require('codemirror');
const React = require('react');
const ReactDOM = require('react-dom');
const classNames = require('classnames');
import babel from 'babel-core/browser';

const {Icon}=  require('../../components/SLDSIcons');

const displayName = 'CodeMirror';
const propTypes = {
  className: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onFocusChange: React.PropTypes.func,
  options: React.PropTypes.object,
  path: React.PropTypes.string,
  value: React.PropTypes.string,
};

const defaultProps = {
  transformer: function(code) {
    return babel.transform(code).code;
  }
};

class CodeMirrorEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const node = React.findDOMNode(this.refs.editor);
    this.editor = CM.fromTextArea(node, {
      mode: 'text/jsx',
      lineNumbers: true,
      lineWrapping: false,
      matchBrackets: true,
      tabSize: 2,
      theme: 'solarized light',
      readOnly: this.props.readOnly
    });
    this.editor.on('change', this.handleChange);
  }

  componentDidUpdate() {
    if (this.props.readOnly) {
      this.editor.setValue(this.props.codeText);
    }
  }

  handleChange() {
    if (!this.props.readOnly && this.props.onChange) {
      this.props.onChange(this.editor.getValue());
    }
  }

  render() {
    let editor = <textarea ref="editor" defaultValue={this.props.codeText} />;
    return (
      <div style={this.props.style} className={this.props.className}>
        {editor}
      </div>
      );
  }
}

class CodeMirror extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      code: this.props.codeText,
      codeChanged: false,
      showCode: true,
    };
  }

  componentWillMount() {
    // For the initial render, we can hijack React.render to intercept the
    // example element and render it normally. This is safe because it's code
    // that we supply, so we can ensure ahead of time that it won't throw an
    // exception while rendering.
    const originalRender = ReactDOM.render;
    ReactDOM.render = (element) => this._initialExample = element;

    // Stub out mountNode for the example code.
    const mountNode = null;  // eslint-disable-line no-unused-vars

    try {
      const compiledCode = this.props.transformer(this.props.codeText);

      /* eslint-disable */
      eval(compiledCode);
      /* eslint-enable */
    } finally {
      ReactDOM.render = originalRender;
    }
  }

  handleCodeChange(value) {
    this.setState(
      {code: value, codeChanged: true},
      this.executeCode
    );
  }

  clearExample() {
    if (!this.state.codeChanged) {
      return null;
    }

    const mountNode = React.findDOMNode(this.refs.mount);
    try {
      ReactDOM.unmountComponentAtNode(mountNode);
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    }

    return mountNode;
  }

  executeCode() {
    const mountNode = this.clearExample();

    let compiledCode = null;
    try {
      compiledCode = this.props.transformer(this.state.code);

      /* eslint-disable */
      eval(compiledCode);
      /* eslint-enable */
    } catch (err) {
      if (compiledCode !== null) {
        console.log(err, compiledCode); // eslint-disable-line no-console
      } else {
        console.log(err); // eslint-disable-line no-console
      }

      this.updateTimeout(
        () => {
          ReactDOM.render(
            <div bsStyle="danger">
            {err.toString()}
            </div>,
            mountNode
          );
        },
        500
      );
    }
  }


  renderEditor() {
    if (!this.state.showCode) {
      return null;
    }

    return (
      <CodeMirrorEditor
        key="jsx"
        onChange={this.handleCodeChange.bind(this)}
        className="highlight"
        codeText={this.state.code}
      />
    );
  }

  renderExample() {
    let example;
    if (this.state.codeChanged) {
      example = (
        <div ref="mount" />
      );
    } else {
      example = (
        <div>{this._initialExample}</div>
      );
    }

    return (
      <div className={classNames('bs-example', this.props.exampleClassName)}>
      {example}
      </div>
    );
  }

  render() {
    return (
      <div className="playground">
        <h1>Example</h1>
        {this.renderExample()}

        <h1>Editor</h1>
        {this.renderEditor()}
      </div>
    );
  }
}

/*

class CodeMirror extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isFocused: false,
    };
  }

  componentDidMount () {
    var textareaNode = React.findDOMNode(this.refs.mytextarea);
    this.codeMirror = CM.fromTextArea(textareaNode, this.props.options);
    this.codeMirror.on('change', this.codemirrorValueChanged.bind(this));
    this.codeMirror.on('focus', this.focusChanged.bind(this, true));
    this.codeMirror.on('blur', this.focusChanged.bind(this, false));
    this._currentCodemirrorValue = this.props.defaultValue || this.props.value || '';
    this.codeMirror.setValue(this._currentCodemirrorValue);
  }

  componentWillUnmount () {
    // todo: is there a lighter-weight way to remove the cm instance?
    if (this.codeMirror) {
      this.codeMirror.toTextArea();
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.codeMirror && nextProps.value !== undefined && this._currentCodemirrorValue !== nextProps.value) {
      this.codeMirror.setValue(nextProps.value);
    }
    if (typeof nextProps.options === 'object') {
      for (var optionName in nextProps.options) {
        if (nextProps.options.hasOwnProperty(optionName)) {
          this.codeMirror.setOption(optionName, nextProps.options[optionName]);
        }
      }
    }
  }

  getCodeMirror () {
    return this.codeMirror;
  }

  focus () {
    if (this.codeMirror) {
      this.codeMirror.focus();
    }
  }

  focusChanged (focused) {
    this.setState({
      isFocused: focused
    });
    this.props.onFocusChange && this.props.onFocusChange(focused);
  }

  codemirrorValueChanged (doc, change) {
    var newValue = doc.getValue();
    this._currentCodemirrorValue = newValue;
    this.props.onChange && this.props.onChange(newValue);
  }

  render () {
    var editorClassName = className(
      'ReactCodeMirror',
      this.state.isFocused ? 'ReactCodeMirror--focused' : null,
      this.props.className
    );

    return (
      <div className={editorClassName}>
        <textarea ref="mytextarea" name={this.props.path} defaultValue={''} autoComplete="off" />
      </div>
    )
  }
}

*/
CodeMirror.displayName = displayName;
CodeMirror.propTypes = propTypes;
CodeMirror.defaultProps = defaultProps;

module.exports = CodeMirror;

