var React = require( "react" );
var TetherDrop = require( "tether-drop" );

var SLDSDatePicker = React.createClass( {
  displayName: "SLDSDatePicker",

  propTypes: {
    attachment: React.PropTypes.string,
    targetAttachment: React.PropTypes.string,
    targetOffset: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      attachment: "top left",
      targetAttachment: "bottom left",
      targetOffset: "-30px 0"
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

  _popoverComponent: function() {

    var className = this.props.className;
    return (
      <div className={className}>
        ::{this.props.children}
      </div>
    );

  },


  _dropOptions: function() {
    return {
      target: this.getDOMNode(),
      element: this._popoverElement,
      classes: 'drop-theme-arrows',
      position: 'bottom left',
      openOn: 'click'
    };
  },

  _renderPopover: function() {

    React.render( this._popoverComponent(), this._popoverElement );

    if ( this._drop != null ) {
      this._drop.setOptions( this._dropOptions() );
    } else if ( window && document ) {
//      var Tether = require( "tether" );
      this._drop = new TetherDrop( this._dropOptions() );
    }

  },

  componentWillUnmount: function() {

    this._drop.destroy();
    React.unmountComponentAtNode( this._popoverElement );
    if ( this._popoverElement.parentNode ) {
      this._popoverElement.parentNode.removeChild( this._popoverElement );
    }

  },

  render: function() {
    return <div>Date Picker</div>;
  }
} );

module.exports = SLDSDatePicker;