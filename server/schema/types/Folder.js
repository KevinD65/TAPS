const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType, GraphQLInt, GraphQLInputObjectType, GraphQLFloat, GraphQLBoolean, GraphQLScalarType } = require('graphql');
const MapType = require("./MapType");
const TilesetType = require("./TilesetType");
const Map = require('../../models/Map');
const Tileset = require('../../models/Tileset');

const FolderType = new GraphQLObjectType({
    name: 'Folder',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        ownerID: {type: GraphQLID},
        folderId: {type: GraphQLID},
        maps: {
            type: GraphQLList(MapType),
            resolve(parent, args){
                return Map.find({folderId: parent.id});
            } 
        },
        tilesets: {
            type: GraphQLList(TilesetType),
            resolve(parent, args){
                return Tileset.find({folderId: parent.id});
            }
        }
    })
});

module.exports = FolderType;