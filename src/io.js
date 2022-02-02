const fs = require('fs');

const saveImage = (_editionCount, sharp, canvas, buildDir) => {
    sharp(canvas.toBuffer('image/png',{ compressionLevel: 0, filters: canvas.PNG_FILTER_NONE })).png({compressionLevel: 4}).toFile( `${buildDir}/images/${_editionCount}.png`);
};

module.exports = {
    saveImage,
};