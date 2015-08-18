import React, { Component } from 'react';
import moment from 'moment';

module.exports = React.createClass( {


  handleClick: function(event){
    event.preventDefault();
    event.stopPropagation();
  },

  render() {
    return (

          <div className="sds-datepicker__filter sds-grid">
            <div className="sds-datepicker__filter--month sds-grid sds-grid--align-spread sds-size--3-of-4">
              <div className="sds-align-middle" role="button" aria-labelledby="bn_prev-label" tabIndex="0">
                <button className="sds-button sds-button--icon-container" onClick={(e)=>{
                    e.preventDefault();

                    e.stopPropagation();
                  }}>
                  <span style={{color:'black'}}>AA</span>
                  <span className="sds-assistive-text">Previous Month</span>
                </button>
              </div>

              <div id="month" className="sds-align-middle" role="heading" aria-live="assertive" aria-atomic="true">{moment().format("MMMM YYYY")}</div>
              <div className="sds-align-middle" role="button" aria-labelledby="bn_next-label" tabIndex="0">
                <button className="sds-button sds-button--icon-container">

                  <span className="sds-assistive-text">Next Month</span>
                </button>
              </div>
            </div>
            <div className="sds-picklist datepicker__filter--year sds-shrink-none">
              <button id="year" className="sds-button sds-button--neutral sds-picklist__label" aria-haspopup="true" aria-expanded="false">2015
{/*
                <svg aria-hidden="true" className="sds-icon sds-icon--small">
                  <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"></use>
                </svg>
*/}
              </button>
            </div>
          </div>

    );
  }
});

