const mongoose = require('mongoose');
const MapSchema = new mongoose.Schema({
    ownerID: {
        type: Number
    },
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
    /*
    layers: {
        type: [Layer],
    },*/
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