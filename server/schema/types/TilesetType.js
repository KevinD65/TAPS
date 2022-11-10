const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType, GraphQLInt, GraphQLInputObjectType, GraphQLFloat, GraphQLBoolean, GraphQLScalarType } = require('graphql');
const TilesetType = new GraphQLObjectType({
    name: 'Tileset',
    fields: () => ({
        id: {type: GraphQLID},
        ownerID: {type: GraphQLID},
        backgroundcolor: {type: GraphQLString},
        class: {type: GraphQLString},
        columns: {type: GraphQLInt},
        fillmode: {type: GraphQLString},
        firstgid: {type: GraphQLInt},
        //grid: {type: Grid},
        image: {type: GraphQLString},
        imageheight: {type: GraphQLInt},
        imagewidth: {type: GraphQLInt},
        margin: {type: GraphQLInt},
        objectalignment: {type: GraphQLString},
        //properties: {type: [Property]},
        source: {type: GraphQLInt},
        //terrains: {type: [Terrain]},
        tilecount: {type: GraphQLInt},
        source: {type: GraphQLString},
        tiledversion: {type: GraphQLString},
        tilerendersize: {type: GraphQLString},
        //tiles: {type: [Tile]},
        tilewidth: {type: GraphQLInt},
        //transformations: {type: Transformation},
        transparentcolor: {type: GraphQLString},
        type: {type: GraphQLString},
        version: {type: GraphQLString}

    })
});

module.exports = TilesetType;