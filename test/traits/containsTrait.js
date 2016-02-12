import selectable from '../../src/traits/selectable';
import disableable from '../../src/traits/disableable';
const traits = {
	selectable: selectable,
	disableable: disableable
};
export default function (traitName) {
	// called from the context of another object:
	// containsTrait.call(anObject, 'selectable');

	return Object.keys(traits[traitName]).every(function (trait) {
		return this.default.hasOwnProperty(trait);
	}, this);
}

