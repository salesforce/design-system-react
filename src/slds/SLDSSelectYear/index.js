import React, { Component } from 'react';
import SLDSPopover from '../SLDSPopover/index';
import moment from 'moment';

var ListItemComponent = React.createClass( {

  getDefaultProps: function(){
    return {
      onSelect:function(moment){
        console.log('onSelect should be defined');
      }
    }
  },

  handleClick() {
    if(this.props.onSelect && this.props.value){
      this.props.onSelect(moment().set('year', this.props.value));
    }
  },

  render() {
    return (
      <li aria-selected="false" onClick={this.handleClick}>
        { this.props.value }
      </li>
    )
  }
});

module.exports = React.createClass( {

  getDefaultProps: function(){
    return {
      moment:moment(),
      relativeFrom:-3,
      relativeTo:15,
      onChange:function(moment){
        console.log('onChange should be defined');
      }
    }
  },

  handleSelectDate(day) {
    this.setState({selectedDate:day})
  },

  handleClose() {
    this.setState({isOpen:false})
  },

  handleClick() {
    this.setState({isOpen:true})
  },

  handleFocus() {
    this.setState({isOpen:true})
  },

  handleSelect(moment) {
    alert(moment.get('year'));
  },

  listItems() {
    var listItems = [];
    var currentYear = this.props.moment.years();
    var from = currentYear+this.props.relativeFrom;
    var to = currentYear+this.props.relativeTo;

    for(var i=from;i<to;i++){
      listItems.push(<ListItemComponent onSelect={this.handleSelect} value={i} />);
    }
    return listItems;
  },

  popover() {
    if(this.state && this.state.isOpen){
      return (
        <SLDSPopover targetElement={this.refs.date}>
          <div className="ignore-react-onclickoutside">
          <ul className="sds-datepicker--time__list" tabindex="0">
            { this.listItems() }
          </ul>
          </div>
        </SLDSPopover>
      );
    }
    return <span />;
  },

  render() {
    return (
      <div className="sds-form-element">
        <div className="sds-form-element__control">
          <div className="sds-input-has-icon sds-input-has-icon--right">
            <button id="year" 
              className="sds-button sds-button--neutral sds-picklist__label" 
              onClick={this.handleClick.bind(this)}
              onFocus={this.handleFocus.bind(this)}
              aria-haspopup="true" 
              aria-expanded="false">2015
              <span style={{color:'black'}}>&nbsp;&nbsp;&darr;</span>
            </button>
          </div>
        </div>
        {this.popover()}
      </div>
    );
  }
});