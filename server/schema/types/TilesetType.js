const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType, GraphQLInt, GraphQLInputObjectType, GraphQLFloat, GraphQLBoolean, GraphQLScalarType } = require('graphql');
const UserType = require("./UserType");

const User = require('../../models/User');

const TilesetType = new GraphQLObjectType({
    name: 'Tileset',
    fields: () => ({
        name: {type: GraphQLString},
        image: {type: GraphQLString},
        starred: {type: GraphQLBoolean},
        id: {type: GraphQLID},
        ownerID: {type: GraphQLID},
        dataURLs: {type: GraphQLList(GraphQLString)},
        folderId: {type: GraphQLID},
        collabIDs:{type:GraphQLList(GraphQLID)},
        collabolators:{
           type: GraphQLList(UserType),
           async resolve(parent, args){
               let a=[];
               let ids=parent.collabIDs
 
               for (const id of ids){
                  
                   let b= await User.findById(id);
                   console.log(b)
                  a.push(b)
               }
             
               return a
           }
       },

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
        tags: {type: GraphQLList(GraphQLString)},
        tilecount: {type: GraphQLInt},
        source: {type: GraphQLString},
        tiledversion: {type: GraphQLString},
        tilerendersize: {type: GraphQLString},
        //tiles: {type: [Tile]},
        tileheight: {type: GraphQLInt},
        tilewidth: {type: GraphQLInt},
        //transformations: {type: Transformation},
        transparentcolor: {type: GraphQLString},
        type: {type: GraphQLString},
        version: {type: GraphQLString},
        bio: {type: GraphQLString},
        isEditing: {type: GraphQLID} 

    })
});

module.exports = TilesetType;