const Project = require("../models/Project");
const Client = require('../models/Client');
const Tileset = require('../models/Tileset');
const User = require('../models/User');
const Map = require('../models/Map');
const {Layer, LayerSchema} = require('../models/Layer');
const LayerInputType = require("./types/LayerInputType");
const TilesetInputType = require("./types/TilesetInputType");
const MapInputType = require("./types/MapInputType");
const MapType = require("./types/MapType");
const UserType = require("./types/UserType");

const tokens = require('../tokens');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType, GraphQLInt, GraphQLInputObjectType, GraphQLFloat, GraphQLBoolean, GraphQLScalarType } = require('graphql');


const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},
    })
});

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parent, args){
                return Client.findById(parent.clientId);
            }
        }
    })
});

const ChunkType = new GraphQLObjectType({
    name: 'Chunk',
    fields: () => ({
        id: {type: GraphQLID},
        data: {type: [GraphQLInt]},
        height: {type: GraphQLInt},
        width: {type: GraphQLInt},
        x: {type: GraphQLInt},
        y: {type: GraphQLInt},
    })
});

const TilesetType = new GraphQLObjectType({
    name: 'Tileset',
    fields: () => ({
        id: {type: GraphQLID},
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

const LayerType = new GraphQLObjectType({
    name: 'Layer',
    fields: () => ({
         //chunks: {type: [Chunk]},
         id: {type: GraphQLID},
         parentID: {type: GraphQLID},
         class: {type: GraphQLString},
         compression: {type: GraphQLString},
         data: { type: GraphQLList(GraphQLInt)},
         draworder: {type: GraphQLString},
         encoding: {type: GraphQLString},
         height: {type: GraphQLInt},
         image: {type: GraphQLString},
         //layers: {type: [GraphQLFloat]},
         locked: {type: GraphQLBoolean},
         name: {type: GraphQLString},
         //objects: {type: []},
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

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser:{
            type: UserType,
            args: {
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                username: {type: GraphQLString},
                hash: {type: GraphQLString},
                bio: { type: GraphQLString }
            },
            resolve(paren, args){
                let user = new User({
                    name: args.name,
                    email: args.email,
                    username: args.username,
                    hash: args.hash,
                    bio: args.bio,
                });
                return user.save();
            }
        },
        updateUser:{
            type: UserType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
                newuser: {type: GraphQLString},
                newusername: {type: GraphQLString},
                newemail: {type: GraphQLString},
                newhash: {type: GraphQLString},
                newbio: { type: GraphQLString }
            },
            resolve(paren, args){
                return User.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.newuser,
                            username: args.newusername,
                            email: args.newemail,
                            hash: args.newhash,
                            bio: args.newbio,
                        }
                    },
                    {new: true},
                );
            }
        },
        deleteUser:{
            type: UserType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(paren, args){
                return User.findByIdAndRemove(args.id);
            }
        },
        addTileSet:{
            type: TilesetType,
            args: {
                TilesetInput: {type: TilesetInputType}
            },
            resolve(parent, args){
                let input = args.TilesetInput;
                const tileset = new Tileset(input);
                return tileset.save();
            },
            
        },

        updateTileSet: {
            type: TilesetType,
            args:{
                id: {type: GraphQLNonNull(GraphQLID)},
                TilesetInput: {type: TilesetInputType}
            },
            async resolve(parent, args){
                let input = args.TilesetInput;
                const tileset = await Tileset.findByIdAndUpdate(
                    args.id,
                    { $set: input },
                    {new: true},
                );
                return tileset;
            }
        },
        deleteTileSet:{
            type: TilesetType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},

            },
            resolve(parent, args){
                return Tileset.findByIdAndRemove(args.id);
            }
        },
        addMap:{
            type: MapType,
            args: {
                MapInput: {type: MapInputType}
            },
            resolve(parent, args){
                let input = args.MapInput;
                console.log(args);
                const map = new Map(input);
                map.layers.forEach(l => {
                    const layer = new Layer(l);
                    layer.parentid = map._id;
                    layer.save();
                });
                console.log(map);
                return map.save();
            }
        },
        changeMapName:{
            type: MapType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
            },
            async resolve(parent, args){
                const map = await Map.findByIdAndUpdate(
                    args.id,
                    {name: args.name},
                    {new: true},
                );
                return map;
            }
        },
        updateMap:{
            type: MapType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
                MapInput: {type: MapInputType}
            },
            async resolve(parent, args){
                let input = args.MapInput;
                const map = await Map.findByIdAndUpdate(
                    args.id,
                    { $set: input },
                    {new: true},
                );
                return map;
            }
        },
        updateLayer:{
            type: LayerType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
                LayerInput: {type: LayerInputType}
            },
            async resolve(parent, args){
                let input = args.LayerInput;
                const layer = await Layer.findByIdAndUpdate(
                    args.id,
                    { $set: input },
                    {new: true},
                );
                return layer;
            }
        },
        deleteMap:{
            type: MapType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                return Map.findByIdAndRemove(args.id);
            }
        },
        deleteLayer:{
            type: LayerType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                return Layer.findByIdAndRemove(args.id);
            }
        },
        addClient:{
            type: ClientType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                phone: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });
                return client.save();
            }
        },
        deleteClient:{
            type: ClientType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                return Client.findByIdAndRemove(args.id);
            }
        },
        addProject:{
            type: ProjectType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLNonNull(GraphQLString)},
                status: {
                    type: new GraphQLEnumType({
                        name: "ProjectStatus",
                        values: {
                            'new': {value: "Not Started"},
                            'progress': {value: "In Progress"},
                            'completed': {value: "Completed"},
                        }
                    }),
                    defaultValue: "Not Started",
                },
                clientid: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientid,
                });
                return project.save();
            }
        },

        deleteProject:{
            type: ProjectType,
            args:{
                id: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                return Project.findByIdAndRemove(args.id);
            }
        },

        updateProject: {
            type: ProjectType,
            args:{
                id: {type: GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                description: {type: GraphQLString},
                status: {
                    type: new GraphQLEnumType({
                        name: "ProjectStatusUpdate",
                        values: {
                            'new': {value: "Not Started"},
                            'progress': {value: "In Progress"},
                            'completed': {value: "Completed"},
                        }
                    }),
                },
            },
            resolve(parent, args){
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status,
                        }
                    },
                    {new: true},
                );
            }
        },
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users:{
            type: GraphQLList(UserType),
            resolve(parent, args){
                return User.find();
            }
        },
        getUser:{
            type: GraphQLList(UserType),
            args: {username: {type: GraphQLString}},
            resolve(parent, args){
                console.log(args.username);
                return User.find({username: args.username});
            }
        },
        projects:{
            type: GraphQLList(ProjectType),
            resolve(parent, args){
                return Project.find();
            }
        },
        project: {
            type: ProjectType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args){
                return Project.findById(args.id);
            }
        },
        clients:{
            type: GraphQLList(ClientType),
            resolve(parent, args){
                return Client.find();
            }
        },
        client: {
            type: ClientType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args){
                return Client.findById(args.id);
            }
        },
        tilesets: {
            type: GraphQLList(TilesetType),
            resolve(parent, args){
                return Tileset.find();
            }
        },
        getTileset: {
            type: TilesetType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args){
                return Tileset.findById(args.id);
            }
        },
        getOwnerMaps: {
            type: GraphQLList(MapType),
            args: {ownerID: {type: GraphQLID}},
            resolve(parent, args){
                return Map.find({ownerID: args.ownerID});
            }
        },
        getMaps: {
            type: GraphQLList(MapType),
            resolve(parent, args){
                return Map.find();
            }
        }
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation,
});