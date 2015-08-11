var traits = {
    selectable: require('../../src/traits/selectable'),
    disableable: require('../../src/traits/disableable')
};

var containsTrait = function (traitName) {
    // called from the context of another object:
    // containsTrait.call(anObject, 'selectable');
    return Object.keys(traits[traitName]).every(function (trait) {
        return this.hasOwnProperty(trait)
    });
}

export default containsTrait;
