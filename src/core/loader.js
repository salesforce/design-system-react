import Lib from './lib';
import Base from './base';

export const CONTROL = 'loader';

const LoaderCore = Lib.extend({}, Base, {
	cssClasses: {
		CONTROL: CONTROL
	}
});

export default LoaderCore;
