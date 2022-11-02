const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType, GraphQLInt, GraphQLInputObjectType, GraphQLFloat, GraphQLBoolean, GraphQLScalarType } = require('graphql');
const UserType = require("./UserType");
const MapType = new GraphQLObjectType({
    name: 'Map',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        image: {type: GraphQLString},
        starred: {type: GraphQLBoolean},
        ownerID: {type: GraphQLID},
        owner: {
            type: UserType,
            resolve(parent, args){
                return User.findById(parent.ownerId);
            }
        },
        backgroundColor: {type: GraphQLString},
        class: {type: GraphQLString},
        compressionLevel: {type: GraphQLFloat},
        height: {type: GraphQLFloat},
        hexSideLength: {type: GraphQLFloat},
        infinite: {type: GraphQLBoolean},

        /*
        layers: {
            type: GraphQLList(LayerType),
            resolve(parent, args){
                return Layer.find({parentID: parent.id});
            }
        },
        */
        nextlayerid: {type: GraphQLInt},
        nextobjectid: {type: GraphQLString},
        orientation: {type: GraphQLString},
        parallaxOriginX: {type: GraphQLString},
        parallaxOriginY: {type: GraphQLFloat},
        //properties: {type: [Property]},
        renderorder: {type: GraphQLString},
        staggeraxis: {type: GraphQLString},
        staggerindex: {type: GraphQLString},
        tiledversion: {type: GraphQLString},
        tileheight: {type: GraphQLFloat},
        //tilesets: {type: GraphQLList(TilesetType)},
        tilewidth: {type: GraphQLFloat},
        type: { type: GraphQLString},
        version: {type: GraphQLString},
        width: {type: GraphQLFloat}
    })
});


module.exports = MapType;