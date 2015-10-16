// BUTTON CORE

import * as Lib from '../lib/lib';
import Base from './base';

require('../../scss/components/button-groups/flavors/base/index.scss');
require('../../scss/components/button-groups/flavors/icon-group/index.scss');
require('../../scss/components/button-groups/flavors/inverse/index.scss');
require('../../scss/components/buttons/flavors/base/index.scss');
require('../../scss/components/buttons/flavors/brand/index.scss');
require('../../scss/components/buttons/flavors/hint/index.scss');
require('../../scss/components/buttons/flavors/icon/index.scss');
require('../../scss/components/buttons/flavors/icon-inverse/index.scss');
require('../../scss/components/buttons/flavors/icon-more/index.scss');
require('../../scss/components/buttons/flavors/icon-stateful/index.scss');
require('../../scss/components/buttons/flavors/inverse/index.scss');
require('../../scss/components/buttons/flavors/neutral/index.scss');
require('../../scss/components/buttons/flavors/neutral-icon/index.scss');
require('../../scss/components/buttons/flavors/stateful/index.scss');
require('../../scss/components/buttons/flavors/stateful-inverse/index.scss');

export const CONTROL = 'button';

const ButtonCore = Lib.merge({}, Base, {
	cssClasses: {
		'BASE': Base.cssClasses.NAMESPACE + CONTROL,
		'NOT_SELECTED': Base.cssClasses.NAMESPACE + 'not-selected',
		'SELECTED': Base.cssClasses.NAMESPACE + 'is-selected',
		'small': Base.cssClasses.NAMESPACE + CONTROL + '--small',
		'neutral': Base.cssClasses.NAMESPACE + CONTROL + '--neutral',
		'brand': Base.cssClasses.NAMESPACE + CONTROL + '--brand',
		'inverse': Base.cssClasses.NAMESPACE + CONTROL + '--inverse',
		'icon-bare': Base.cssClasses.NAMESPACE + CONTROL + '--icon-bare',
		'icon-container': Base.cssClasses.NAMESPACE + CONTROL + '--icon-container',
		'icon-border': Base.cssClasses.NAMESPACE + CONTROL + '--icon-border',
		'icon-border-filled': Base.cssClasses.NAMESPACE + CONTROL + '--icon-border-filled',
		'icon-small': Base.cssClasses.NAMESPACE + CONTROL + '--icon-small'
	}
	
	// FIXME: Add default properties here so that we have a default theme, size and style (if they are required for rendering)
	
	// TODO: We usually manage state and throw our own events here, so this will probably need to be expanded for jQuery support
});

export default ButtonCore;
