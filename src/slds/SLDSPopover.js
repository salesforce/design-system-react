var React = require( "react/addons" );
var TetherDrop = require( "tether-drop" );
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
import { TransitionSpring, Spring } from 'react-motion';

//require('./index.css');

module.exports = React.createClass( {

  displayName: "SLDSPopover",

  mixins: [ require( "react-onclickoutside" ) ],

  handleClickOutside: function(e) {
    if(this.props.onClose){
      this.props.onClose();
    }
  },

  propTypes: {
    attachment: React.PropTypes.string,
    targetAttachment: React.PropTypes.string,
    targetOffset: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      attachment: "top left",
      targetAttachment: "bottom left",
      targetOffset: "-30px 0",
    };
  },

  componentWillMount: function() {


    var popoverContainer = document.createElement( "span" );
    popoverContainer.className = "datepicker__container";

    this._popoverElement = popoverContainer;

    document.querySelector( "body" ).appendChild( this._popoverElement );

  },

  componentDidMount: function() {
    this.renderPopover();
  },

  componentDidUpdate: function() {
    this.renderPopover();
  },

  handleClick: function(event){
    event.preventDefault();
    event.stopPropagation();
  },

  popoverComp: function() {
    var className = this.props.className;
    return (
      <div className={className} 
        onClick={this.handleClick} 
        onMousedown={this.handleClick} 
        onMouseup={this.handleClick}>
        <div className="slds-dropdown" 
              style={{
                transform:'none',
                marginTop:'0.25rem',
                marginBottom:'0.35rem',

              }}>

          <Spring 
            defaultValue={{ val:0 }}
            endValue={{ val:1, config: [70, 10] }}>
            {currentVal => {
                var style = {opacity:currentVal.val};
                return (<div style={style}>{this.props.children}</div>);
              }.bind(this)
            }
          </Spring>
        </div>
      </div>
    );

  },

  beforeClose: function(){
  },

  dropOptions: function() {
    let target = this.props.targetElement?this.props.targetElement.getDOMNode():this.getDOMNode().parentNode;
    return {
      target: target,
      content: this._popoverElement,
      classes: 'drop-theme-arrows',
      position: 'bottom left',
      openOn: 'always',
      beforeClose:this.beforeClose,
      constrainToWindow:true,
      constrainToScrollParent:false
    };
  },

  renderPopover: function() {

    React.render( this.popoverComp(), this._popoverElement );

    if(this._popoverElement && 
        this._popoverElement.parentNode && 
        this._popoverElement.parentNode.parentNode &&
        this._popoverElement.parentNode.parentNode.className &&
        this._popoverElement.parentNode.parentNode.className.indexOf('drop ') > -1 ){
      this._popoverElement.parentNode.parentNode.style.zIndex = 10001;
    }

    if ( this.drop != null ) {
      if(this.drop.setOptions){
        this.drop.setOptions( this.dropOptions() );
      }
    } else if ( window && document ) {
      this.drop = new TetherDrop( this.dropOptions() );
    }
  },

  componentWillUnmount: function() {

    this.drop.destroy();
    React.unmountComponentAtNode( this._popoverElement );
    if ( this._popoverElement.parentNode ) {
      this._popoverElement.parentNode.removeChild( this._popoverElement );
    }
    if(this.props.onClose){
      this.props.onClose();
    }
  },

  render: function() {
    return <span></span>;
  }
} );

