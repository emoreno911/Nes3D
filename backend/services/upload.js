require('dotenv').config();

// Require the cloudinary library
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    secure: true
});

async function composeAndUpload(items) {
    const layers = getSharpLayers(items);
    const ly = [{background: "#14a6f4"}, ...layers];
    const composedTAG = cloudinary.image("nes3d/1_bg.png", {transformation: ly});
    const composed = composedTAG.replace("<img src='","").replace("' />",""); // remove tag html

    // Upload the image
    const url = await uploadImage(composed);
    return url;
}

function getSharpLayers(items) {
    // items = ['helmet1.png', 'chest1.png', 'legs1.png', 'legs2.png']
    const match = (str, patt) => str.indexOf(patt) !== -1; 
    
    items.sort(); // best equipement will overlay
    const layers = items.map(item => {
        const overlay = `nes3d:${item.replace('.png','')}`;
        if (match(item,"chest")) {
            return [{overlay}, {flags: "layer_apply", x:0, y: 0}]
        }
        if (match(item,"helmet")) {
            return [ {overlay}, {flags: "layer_apply", x:0, y: -64} ]
        }
        if (match(item,"legs")) {
            return [ {overlay}, {flags: "layer_apply", x:0,y: 64} ]
        }
        if (match(item,"shoes")) {
            return [ {overlay}, {flags: "layer_apply", y: 64, x: -64} ]
        }
        if (match(item,"sword")) {
            return [ {overlay}, {flags: "layer_apply", y: 0, x: 64} ]
        }
    });

    return layers.flat();
}

async function uploadImage(imagePath) {
    const options = {
        folder: "nes3d_up",
        use_filename: false,
        unique_filename: false,
        overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result.secure_url);
      return result.secure_url;
    } catch (error) {
      console.error(error);
      return null;
    }
}

module.exports = {
    composeAndUpload
}