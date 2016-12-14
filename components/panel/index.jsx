/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Panel - Filter variant

// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React
import React from 'react';

// ## Constants
import { PANEL } from '../../utilities/constants';

/**
 * A panel provides detailed contextual information or contextual filtering options.
 */
const Panel = ({ heading }) => (
	<div className="slds-panel slds-grid slds-grid--vertical slds-nowrap slds-panel--filters">
	  <div className="slds-form--stacked slds-grow slds-scrollable--y slds-grid slds-grid--vertical">
	    <div className="slds-filters">
	      <div className="slds-filters__header slds-grid slds-has-divider--bottom-space">
	        <h4 className="slds-align-middle slds-text-heading--small">{heading}</h4>
	        <button className="slds-button slds-col--bump-left slds-button--icon slds-button--icon-small" title="Close Filter Panel">
	          <svg className="slds-button__icon" aria-hidden="true">
	            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#forward"></use>
	          </svg>
	          <span className="slds-assistive-text">Close Filter Panel</span>
	        </button>
	      </div>
	      <div className="slds-filters__body">
	        <ol className="slds-list--vertical slds-list--vertical-space">
	          <li className="slds-item slds-hint-parent">
	            <div className="slds-filters__item slds-grid slds-grid--vertical-align-center">
	              <a href="javascript:void(0);" className="slds-grow slds-has-blur-focus">
	                <p className="slds-text-body--small">Show Me</p>
	                <p>All Products</p>
	              </a>
	            </div>
	          </li>
	        </ol>
	        <p className="slds-text-body--small slds-m-vertical--x-small">Matching all these filters</p>
	        <ol className="slds-list--vertical slds-list--vertical-space">
	          <li className="slds-item slds-hint-parent">
	            <div className="slds-filters__item slds-grid slds-grid--vertical-align-center">
	              <a href="javascript:void(0);" className="slds-grow slds-has-blur-focus">
	                <p className="slds-text-body--small">Created Date</p>
	                <p>equals THIS WEEK</p>
	              </a>
	              <button className="slds-button slds-button--icon slds-button--icon-small" title="Remove">
	                <svg className="slds-button__icon slds-button__icon--hint" aria-hidden="true">
	                  <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
	                </svg>
	                <span className="slds-assistive-text">Remove</span>
	              </button>
	            </div>
	          </li>
	          <li className="slds-item slds-hint-parent">
	            <div className="slds-filters__item slds-grid slds-grid--vertical-align-center">
	              <a href="javascript:void(0);" className="slds-grow slds-has-blur-focus">
	                <p className="slds-text-body--small">List Price</p>
	                <p>greater than &quot;500&quot;</p>
	              </a>
	              <button className="slds-button slds-button--icon slds-button--icon-small" title="Remove">
	                <svg className="slds-button__icon slds-button__icon--hint" aria-hidden="true">
	                  <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
	                </svg>
	                <span className="slds-assistive-text">Remove</span>
	              </button>
	            </div>
	          </li>
	        </ol>
	      </div>
	      <div className="slds-filters__footer slds-grid slds-shrink-none"><a href="javascript:void(0);">Add Filter</a><a href="javascript:void(0);" className="slds-col--bump-left">Remove All</a></div>
	    </div>
	  </div>
	</div>
);

Panel.displayName = PANEL;

Panel.propTypes = {
	/**
	 * The heading of the filter panel
	 */
	heading: React.PropTypes.node
};

Panel.defaultProps = {
	heading: 'Filter'
};

module.exports = Panel;
