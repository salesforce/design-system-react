var React = require( "react/addons" );
var TetherDrop = require( "tether-drop" );
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
//var ReactMotion = require( "react-motion" );
import {TransitionSpring} from 'react-motion';

require('./index.css');

var SLDSPopover = React.createClass( {
  displayName: "SLDSPopover",

  propTypes: {
    attachment: React.PropTypes.string,
    targetAttachment: React.PropTypes.string,
    targetOffset: React.PropTypes.string
  },

  mixins: [ require( "react-onclickoutside" ) ],

  handleClickOutside: function(e) {
    e.preventDefault();
    e.stopPropagation();
    if(this.props.onClose){
      this.props.onClose();
    }
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
    this._renderPopover();
  },

  componentDidUpdate: function() {
    this._renderPopover();
  },

  handleClick: function(event){
    console.log('>>>>> handleClick >>>>>');
    event.stopImmediatePropagation();
    event.preventDefault();
    event.stopPropagation();
    return false;
  },

  _popoverComponent: function() {


    console.log('_popoverComponent: ', this.props.children);
    var className = this.props.className;
    return (
      <div className={className} 
        onClick={this.handleClick} 
        onMousedown={this.handleClick} 
        onMouseup={this.handleClick}>
        <div className="SLDSPopover">
          <ReactCSSTransitionGroup transitionName="SLDSPopoverAnim" transitionAppear={true}>
            {this.props.children}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );

  },


  _dropOptions: function() {
    let target = this.props.targetElement?this.props.targetElement.getDOMNode():this.getDOMNode().parentNode;
    return {
      target: target,
      content: this._popoverElement,
      classes: 'drop-theme-arrows',
      position: 'bottom left',
      openOn: 'always'
    };
  },

  _renderPopover: function() {

    React.render( this._popoverComponent(), this._popoverElement );

    if ( this._drop != null ) {
      if(this._drop.setOptions){
        this._drop.setOptions( this._dropOptions() );
      }
    } else if ( window && document ) {
      this._drop = new TetherDrop( this._dropOptions() );
    }
  },

  componentWillUnmount: function() {

    this._drop.destroy();
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

module.exports = SLDSPopover;