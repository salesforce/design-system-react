const OLD_CSS_PREFIX = 'slds-';
const NEW_CSS_PREFIX = 'slds2-';
const pf = (className) => {
  return className.split(/\s+/).map(c => {
    // Add prefix only for "context" classes
    return c.indexOf('context') >= 0 ? `${NEW_CSS_PREFIX}${c}` : `${OLD_CSS_PREFIX}${c}`;
  }).join(' ');
};

const SASS_VARIABLES = {
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
  '$spacing-xxx-small': '0.125rem',
};

const mainSass = `
.slds2-context-bar {
  height: $height-context-bar;
  background-color: $color-background-context-bar;
  color: $color-text-context-bar;
}
.slds2-context-bar__primary,
.slds2-context-bar__secondary {
  flex: 0 0 auto;
}

.slds2-context-bar__shadow {
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  height: rem(4px);
  background: linear-gradient(to bottom, rgba($color-context-bar-shadow, 0.25) 0, rgba($color-context-bar-shadow, 0) 100%);
}

.slds2-context-bar__vertical-divider {
  width: 0;
  overflow: hidden;
  border-left: $border-width-thin solid $color-border-context-bar-divider;
}

.slds2-context-bar-action {
  position: relative;
}

.slds2-context-bar-action.slds2-context-bar-action {
  display: flex;
}

/* height = $square-tooltip-nubbin * 0.7 */
.slds2-context-bar-action:hover:before {
  content: '';
  position: absolute;
  top: 100%;
  width: 100%;
  height: 0.7rem;
}

.slds2-context-bar-action__label,
.slds2-context-bar-action__trigger {
  transition: background-color $duration-immediately linear;
}

.slds2-context-bar-action__label:hover,
.slds2-context-bar-action__label:focus {
  outline: 0;
  background-color: $color-background-context-bar-highlight;
}

.slds2-context-bar-action__trigger:hover,
.slds2-context-bar-action__trigger:focus {
  outline: 0;
  background-color: $color-background-context-bar-highlight;
}

.slds2-context-bar-action__label {
  padding-left: $spacing-small;
  padding-right: $spacing-small;
}

.slds2-context-bar-action__label--expand {
  padding-right: $spacing-large;
}

.slds2-context-bar-action__trigger {
  position: absolute;
  right: $spacing-x-small;
  bottom: 0;
  top: 0;
  pointer-events: none;
}

.slds2-context-bar-action__trigger,
.slds2-context-bar-action__trigger:focus {
  color: $color-text-context-nav-trigger;
}

.slds2-context-bar-action__trigger-icon {
  fill: currentColor;
  height: 100%;
}

/* vertical-alignment-center */
.slds-grid--vertical-align-center {
  align-items: center; // Single Row Alignment
  align-content: center; // Multi Row Alignment
}
`;

const fixedSass = `
.slds2-FIX-context-bar-a {
  color: $color-text-context-bar !important;
}
`;

const getComponentStyles = () => {
  function replacer(match, p1) {
    return SASS_VARIABLES[p1] || p1;
  }

  return (mainSass + fixedSass).replace(/(\$[a-zA-Z0-9\-]+)/g, replacer);
}

module.exports = {
  getComponentStyles: getComponentStyles,
  pf: pf
};
