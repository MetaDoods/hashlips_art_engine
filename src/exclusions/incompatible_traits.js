const simplifyTraits = (traits) => {
    const simpleTraits = {};
    traits.forEach((trait) => {
        simpleTraits[trait.layer] = trait.name;
    });
    return simpleTraits;
};

const traitHasDefinedIncompatibilities = (newTrait, incompatibleTraits) => {
    const traitKey = `${newTrait.layer}/${newTrait.name}`;
    return incompatibleTraits[traitKey];
};

const incompatibleTraitsUsed = (newTraits, incompatibleTraits) => {
    if (!incompatibleTraits) {
        return false;
    }

    const simpleNewTraits = simplifyTraits(newTraits);

    for (let i = 0; (i < newTraits.length); i++) {
        const definedIncompatibilities = traitHasDefinedIncompatibilities(newTraits[i], incompatibleTraits);
        if (definedIncompatibilities !== undefined) {
            for (let n = 0; (n < definedIncompatibilities.length); n++) {
                const splittedIncompatibilities = definedIncompatibilities[n].split('/');

                let trait;
                let layer;

                if (splittedIncompatibilities.length > 2) {
                    trait = splittedIncompatibilities.pop();
                    layer = splittedIncompatibilities.join('/');
                } else {
                    [layer, trait] = splittedIncompatibilities;
                }

                if (trait === '*' && simpleNewTraits[layer] !== undefined) {
                    return true;
                }

                if (simpleNewTraits[layer] === trait) {
                    return true;
                }
            }
        }
    }
    return false;
};

module.exports = {
    incompatibleTraitsUsed,
};