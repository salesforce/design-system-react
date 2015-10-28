import {errMsg, createChainableTypeChecker} from './common';

/**
 * Checks whether a prop provides an icon format
 * *
 * @param props
 * @param propName
 * @param componentName
 * @returns {Error|undefined}
 */

function validate (props, propName, componentName) {
	if (!/^\w+\.\w+$/.test(props[propName]) && props[propName] !== undefined) {
		return new Error(
			errMsg(props, propName, componentName,
				', expected a format of [icon_set].[icon]')
		);
	}
}

export default createChainableTypeChecker(validate);
