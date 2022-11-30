const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType, GraphQLInt, GraphQLInputObjectType, GraphQLFloat, GraphQLBoolean, GraphQLScalarType } = require('graphql');
const TilesetInputType = require("./TilesetInputType");

const MapInputType = new GraphQLInputObjectType({
    name: "MapInput",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        image: {type: GraphQLString},
        starred: {type: GraphQLBoolean},
        compressionlevel: {type: GraphQLInt},
        ownerID: {type: GraphQLID},
        backgroundColor: {type: GraphQLString},
        class: {type: GraphQLString},
        compressionLevel: {type: GraphQLFloat},
        height: {type: GraphQLFloat},
        hexSideLength: {type: GraphQLFloat},
        infinite: {type: GraphQLBoolean},
        //layers: {type: GraphQLList(LayerInputType)},
        nextlayerid: {type: GraphQLInt},
        nextobjectid: {type: GraphQLInt},
        orientation: {type: GraphQLString},
        parallaxOriginX: {type: GraphQLString},
        parallaxOriginY: {type: GraphQLFloat},
        //properties: {type: [Property]},
        renderorder: {type: GraphQLString},
        staggeraxis: {type: GraphQLString},
        staggerindex: {type: GraphQLString},
        tags: {type: GraphQLList(GraphQLString)},
        tiledversion: {type: GraphQLString},
        tileheight: {type: GraphQLFloat},
        tilesets: {type: GraphQLList(TilesetInputType)},
        tilewidth: {type: GraphQLFloat},
        type: { type: GraphQLString},
        version: {type: GraphQLString},
        width: {type: GraphQLFloat},
        bio: {type: GraphQLString}
    })
});

module.exports = MapInputType;