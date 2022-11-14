const mongoose = require('mongoose');
const {Layer, LayerSchema} = require("./Layer");
Schema = mongoose.Schema;

const MapSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    starred: {
        type: Boolean,
    },
    ownerID: {
        type: Schema.Types.ObjectId
    },
    folderId: {type: Schema.Types.ObjectId},
    backgroundColor: {
        type: String,
    },
    class: {
        type: String,
    },
    compressionLevel: {
        type: Number,
    },
    height: {
        type: Number,
    },
    hexSideLength: {
        type: Number,
    },
    infinite: {
        type: Boolean,
    },
    
    layers: {
        type: [LayerSchema],
    },
    nextlayerid: {
        type: Number,
    },
    nextobjectid: {
        type: String,
    },
    orientation: {
        type: String,
    },
    parallaxOriginX: {
        type: String,
    },
    parallaxOriginY: {
        type: Number,
        
    },/*
    properties: {
        type: [Property],
        
    },*/
    renderorder: {
        type: String,
    },
    staggeraxis: {
        type: String,
    },
    staggerindex: {
        type: String,
    },   
    //added tags to schema, array of tag strings
    tags: {
        type: [String],
    },
    tiledversion: {
        type: String,
    },
    tileheight: {
        type: Number,
        
    },/*
    tilesets: {
        type: [Tileset] 
        
    },*/
    tilewidth: {
        type: Number,
        
    },
    type: {
        type: String,
        
    },
    version: {
        type: String,
        
    },
    width: {
        type: Number,
        
    }
    
});

module.exports = mongoose.model('Map', MapSchema);