const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType, GraphQLInt, GraphQLInputObjectType, GraphQLFloat, GraphQLBoolean, GraphQLScalarType } = require('graphql');

const LayerInputType = new GraphQLInputObjectType({
    name: 'LayerInput',
    fields: () => ({
        //chunks: {type: [Chunk]},
        id: {type: GraphQLID},
        parentmapID: {type: GraphQLID},
        class: {type: GraphQLString},
        compression: {type: GraphQLString},
        data: { type: GraphQLList(GraphQLInt)},
        draworder: {type: GraphQLString},
        encoding: {type: GraphQLString},
        height: {type: GraphQLInt},
        id: {type: GraphQLInt},
        image: {type: GraphQLString},
        //layers: {type: [Number]},
        locked: {type: GraphQLBoolean},
        name: {type: GraphQLString},
        //objects: {type: [Object]},
        offsetx: {type: GraphQLInt},
        offsety: {type: GraphQLInt},
        opacity: {type: GraphQLInt},
        parallaxx: {type: GraphQLInt},
        parallaxy: {type: GraphQLInt},
        //properties: {type: [Property]},
        repeatx: {type: GraphQLInt},
        repeaty: {type: GraphQLInt},
        startx: {type: GraphQLInt},
        starty: {type: GraphQLInt},
        tintcolor: {type: GraphQLString},
        transparentcolor: {type: GraphQLString},
        type: {type: GraphQLString},
        visible: {type: GraphQLBoolean},
        width: {type: GraphQLInt},
        x: {type: GraphQLInt},
        y: {type: GraphQLInt}
    })   
});

module.exports = LayerInputType;