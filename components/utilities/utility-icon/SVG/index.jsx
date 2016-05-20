/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

import React from 'react';
import SLDS_ICONS_UTILITY from './slds-icons-utility';
import SLDS_ICONS_ACTION from './slds-icons-action';
import SLDS_ICONS_CUSTOM from './slds-icons-custom';
import SLDS_ICONS_DOCTYPE from './slds-icons-doctype';
import SLDS_ICONS_STANDARD from './slds-icons-standard';

module.exports = React.createClass({

  displayName: "Svg",

  getDefaultProps () {
    return {
      name:'announcenent',
      category:'utility'
    };
  },

  getPaths (paths) {
    if(paths instanceof Array){
      return paths.map((item)=>{
        return <path {...item} />;
      });
    }
    return <path key="pathSVG" {...paths} />;
  },

  getCircles (circles) {
    if(circles instanceof Array){
      return circles.map((item)=>{
        return <circle {...item} />;
      });
    }
    return <circle key="circleSVG" {...circles} />;
  },

  getEllipses (ellipses) {
    if(ellipses instanceof Array){
      return ellipses.map((item)=>{
        return <ellipse {...item} />;
      });
    }
    return <ellipse key="ellipseSVG" {...ellipses} />;
  },

  getGroups (groups) {
    if(groups instanceof Array){
      return groups.map((item)=>{
        return <g>{ this.getShapes(item) }</g>;
      });
    }
    return <g key="groupsSVG">{ this.getShapes(groups) }</g>;
  },

  getShapes (data) {
    var shapes = [];
    if(data){
      if(data.g){
        shapes.push(this.getGroups(data.g));
      }
      if(data.ellipse){
        shapes.push(this.getEllipses(data.ellipse));
      }
      if(data.circle){
        shapes.push(this.getCircles(data.circle));
      }
      if(data.path){
        shapes.push(this.getPaths(data.path));
      }
    }
    return shapes;
  },

  getSVG (name, category) {
    var data;
    var viewBox;
    switch (category) {
      case 'utility':
        data = SLDS_ICONS_UTILITY[name];

        viewBox = SLDS_ICONS_UTILITY.viewBox;
        break;
      case 'action':
        data = SLDS_ICONS_ACTION[name.toLowerCase()];
        viewBox = SLDS_ICONS_ACTION.viewBox;
        break;
      case 'custom':
        data = SLDS_ICONS_CUSTOM[name.toLowerCase()];
        viewBox = SLDS_ICONS_CUSTOM.viewBox;
        break;
      case 'doctype':
        data = SLDS_ICONS_DOCTYPE[name.toLowerCase()];
        viewBox = SLDS_ICONS_DOCTYPE.viewBox;
        break;
      case 'standard':
        data = SLDS_ICONS_STANDARD[name.toLowerCase()];
        viewBox = SLDS_ICONS_STANDARD.viewBox;
        break;
      default:
        data = SLDS_ICONS_UTILITY[name.toLowerCase()];
        viewBox = SLDS_ICONS_UTILITY.viewBox;
        break;
    }
    return <svg {...this.props} viewBox={viewBox}>{this.getShapes(data)}</svg>;
  },

  render () {
      return (
        this.getSVG(this.props.name, this.props.category)
      );
  }
});
