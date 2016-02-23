'use strict';

var OLD_CSS_PREFIX = 'slds-';
var NEW_CSS_PREFIX = 'slds2-';
var pf = function pf(className) {
  return className.split(/\s+/).map(function (c) {
    // Add prefix only for "context" classes
    return c.indexOf('context') >= 0 ? '' + NEW_CSS_PREFIX + c : '' + OLD_CSS_PREFIX + c;
  }).join(' ');
};

var SASS_VARIABLES = {
  '$border-width-thin': '1px',
  '$color-background-context-bar': 'rgb(22, 50, 92)',
  '$color-background-context-bar-highlight': 'rgba(#fff, 0.2)',
  '$color-border-context-bar-divider': 'rgba(#fff, 0.2)',
  '$color-context-bar-alt': '#fff',
  '$color-context-bar-shadow': '#000',
  '$color-text-context-bar': 'rgb(255, 255, 255)',
  '$color-text-context-nav-trigger': 'rgba(#fff, 0.4)',
  '$duration-immediately': '0.05s',
  '$height-context-bar': '2.25rem',
  '$spacing-large': '1.5rem',
  '$spacing-medium': '1rem',
  '$spacing-small': '0.75rem',
  '$spacing-x-large': '2rem',
  '$spacing-x-small': '0.5rem',
  '$spacing-xx-small': '0.25rem',
  '$spacing-xxx-small': '0.125rem'
};

var mainSass = '\n.slds2-context-bar {\n  height: $height-context-bar;\n  background-color: $color-background-context-bar;\n  color: $color-text-context-bar;\n}\n.slds2-context-bar__primary,\n.slds2-context-bar__secondary {\n  flex: 0 0 auto;\n}\n\n.slds2-context-bar__shadow {\n  position: absolute;\n  top: 100%;\n  right: 0;\n  left: 0;\n  height: rem(4px);\n  background: linear-gradient(to bottom, rgba($color-context-bar-shadow, 0.25) 0, rgba($color-context-bar-shadow, 0) 100%);\n}\n\n.slds2-context-bar__vertical-divider {\n  width: 0;\n  overflow: hidden;\n  border-left: $border-width-thin solid $color-border-context-bar-divider;\n}\n\n.slds2-context-bar-action {\n  position: relative;\n}\n\n.slds2-context-bar-action.slds2-context-bar-action {\n  display: flex;\n}\n\n/* height = $square-tooltip-nubbin * 0.7 */\n.slds2-context-bar-action:hover:before {\n  content: \'\';\n  position: absolute;\n  top: 100%;\n  width: 100%;\n  height: 0.7rem;\n}\n\n.slds2-context-bar-action__label,\n.slds2-context-bar-action__trigger {\n  transition: background-color $duration-immediately linear;\n}\n\n.slds2-context-bar-action__label:hover,\n.slds2-context-bar-action__label:focus {\n  outline: 0;\n  background-color: $color-background-context-bar-highlight;\n}\n\n.slds2-context-bar-action__trigger:hover,\n.slds2-context-bar-action__trigger:focus {\n  outline: 0;\n  background-color: $color-background-context-bar-highlight;\n}\n\n.slds2-context-bar-action__label {\n  padding-left: $spacing-small;\n  padding-right: $spacing-small;\n}\n\n.slds2-context-bar-action__label--expand {\n  padding-right: $spacing-large;\n}\n\n.slds2-context-bar-action__trigger {\n  position: absolute;\n  right: $spacing-x-small;\n  bottom: 0;\n  top: 0;\n  pointer-events: none;\n}\n\n.slds2-context-bar-action__trigger,\n.slds2-context-bar-action__trigger:focus {\n  color: $color-text-context-nav-trigger;\n}\n\n.slds2-context-bar-action__trigger-icon {\n  fill: currentColor;\n  height: 100%;\n}\n\n/* vertical-alignment-center */\n.slds-grid--vertical-align-center {\n  align-items: center; // Single Row Alignment\n  align-content: center; // Multi Row Alignment\n}\n';

var fixedSass = '\n.slds2-FIX-context-bar-a {\n  color: $color-text-context-bar !important;\n}\n';

var getComponentStyles = function getComponentStyles() {
  function replacer(match, p1) {
    return SASS_VARIABLES[p1] || p1;
  }

  return (mainSass + fixedSass).replace(/(\$[a-zA-Z0-9\-]+)/g, replacer);
};

module.exports = {
  getComponentStyles: getComponentStyles,
  pf: pf
};