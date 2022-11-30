const mongoose = require('mongoose');
Schema = mongoose.Schema;
const TilesetSchema = new mongoose.Schema({
    name: { type: String },
    image: { type: String },
    starred: {type: Boolean },
    ownerID: {type: Schema.Types.ObjectId },
    dataURLs: {type: [String]},
    folderId: {type: Schema.Types.ObjectId},
    backgroundcolor: {type: String},
    class: {type: String},
    columns: {type: Number},
    fillmode: {type: String},
    firstgid: {type: Number},
    //grid: {type: Grid},
    image: {type: String},
    imageheight: {type: Number},
    imagewidth: {type: Number},
    margin: {type: Number},
    objectalignment: {type: String},
    //properties: {type: [Property]},
    source: {type: Number},
    //terrains: {type: [Terrain]},
    tilecount: {type: Number},
    source: {type: String},
    tiledversion: {type: String},
    tilerendersize: {type: String},
    //tiles: {type: [Tile]},
    tileheight: {type: Number},
    tilewidth: {type: Number},
    //transformations: {type: Transformation},
    transparentcolor: {type: String},
    type: {type: String},
    version: {type: String},
    bio:{type: String}
});

module.exports = mongoose.model('Tileset', TilesetSchema);