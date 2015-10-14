// BUTTON CORE

import * as Lib from '../lib/lib';
import Base from './base';

export const CONTROL = 'button';

const ButtonCore = Lib.merge({}, Base, {
	cssClasses: {
		'base': Base.cssClasses.NAMESPACE + CONTROL,
		'not-selected': Base.cssClasses.NAMESPACE + 'not-selected',
		'selected': Base.cssClasses.NAMESPACE + 'is-selected',
		'small': Base.cssClasses.NAMESPACE + CONTROL + '--small',
		'neutral': Base.cssClasses.NAMESPACE + CONTROL + '--neutral',
		'brand': Base.cssClasses.NAMESPACE + CONTROL + '--brand',
		'inverse': Base.cssClasses.NAMESPACE + CONTROL + '--inverse',
		'icon-bare': Base.cssClasses.NAMESPACE + CONTROL + '--icon-bare',
		'icon-container': Base.cssClasses.NAMESPACE + CONTROL + '--icon-container',
		'icon-border': Base.cssClasses.NAMESPACE + CONTROL + '--icon-border',
		'icon-border-filled': Base.cssClasses.NAMESPACE + CONTROL + '--icon-border-filled',
		'icon-small': Base.cssClasses.NAMESPACE + CONTROL + '--icon-small'
	},

	_defaultProperties: {
		type: CONTROL
	}
});

export default ButtonCore;
