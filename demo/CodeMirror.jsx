const CM = require('codemirror');
import 'codemirror/addon/runmode/runmode';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/theme/solarized.css';
import 'demo/assets/styles/codemirror.css';
import babel from 'babel-core/browser';

const React = require('react');
const ReactDOM = require('react-dom');
const classNames = require('classnames');

const SLDSButton =  require('../components/SLDSButton');
const SLDSButtonStateful =  require('../components/SLDSButtonStateful');
const SLDSButtonGroup =  require('../components/SLDSButtonGroup');
const SLDSIcon =  require('../components/SLDSIcon');
const SLDSLookup =  require('../components/SLDSLookup');
const SLDSMenuDropdown =  require('../components/SLDSMenuDropdown');
const SLDSMenuPicklist =  require('../components/SLDSMenuPicklist');
const SLDSModal =  require('../components/SLDSModal');
const SLDSNotification =  require('../components/SLDSNotification');
const SLDSPopoverTooltip =  require('../components/SLDSPopoverTooltip');

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
    const node = ReactDOM.findDOMNode(this.refs.editor);
    this.editor = CM.fromTextArea(node, {
      mode: 'javascript',
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
    React.render = (element) => this._initialExample = element;

    // Stub out mountNode for the example code.
    const mountNode = null;  // eslint-disable-line no-unused-vars

    try {
      const compiledCode = this.props.transformer(this.props.codeText);

      /* eslint-disable */
      eval(compiledCode);
      /* eslint-enable */
    } finally {
      React.render = originalRender;
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

    const mountNode = ReactDOM.findDOMNode(this.refs.mount);
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
      <div>
        <h1 className="slds-text-heading--small slds-p-vertical--small">Edit code to modify above examples</h1>
        <CodeMirrorEditor
          key="jsx"
          onChange={this.handleCodeChange.bind(this)}
          className="highlight"
          codeText={this.state.code}
        />
      </div>
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

  toggleEditor() {
    this.setState({ showCode: !this.state.showCode })
  }

  render() {
    return (
      <div className="playground">
        <div className="slds-p-vertical--medium">
          {this.renderExample()}
        </div>

        <SLDSButton label={this.state.showCode ? "Hide Code" : "Show Code"} onClick={this.toggleEditor.bind(this)} />
        {this.renderEditor()}
      </div>
    );
  }
}

CodeMirror.displayName = displayName;
CodeMirror.propTypes = propTypes;
CodeMirror.defaultProps = defaultProps;

module.exports = CodeMirror;

