const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType, GraphQLInt, GraphQLInputObjectType, GraphQLFloat, GraphQLBoolean, GraphQLScalarType } = require('graphql');
const MapType = require("./MapType");
const TilesetType = require("./TilesetType");
const Map = require('../../models/Map');
const Tileset = require('../../models/Tileset');
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        username: {type: GraphQLString},
        hash: {type: GraphQLString},
        bio: {type: GraphQLString},
        maps: {
            type: GraphQLList(MapType),
            resolve(parent, args){
                return Map.find({ownerID: parent.id});
            } 
        },
        tilesets: {
            type: GraphQLList(TilesetType),
            resolve(parent, args){
                return Tileset.find({ownerID: parent.id});
            }
        }
    })
});

module.exports = UserType;