const mongoose = require("mongoose");

const ChunkSchema = mongoose.Schema({
    data: { type: [Number] },
    height: { type: Number },
    width: { type: Number },
    x: { type: Number },
    y: { type: Number },
});

module.exports = mongoose.exports('Chunk', ChunkSchema);