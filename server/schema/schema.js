const Project = require("../models/Project");
const Client = require('../models/Client');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType, GraphQLInt, GraphQLBoolean, GraphQLFloat } = require('graphql');


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
const UserType = GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        hash: {type: GraphQLString},
        username: {type: GraphQLString},
        bio: {type: GraphQLString},
    })
});

const ChunkType = GraphQLObjectType({
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
        backgroundcolor: {type: String},
        class: {type: String},
        columns: {type: number},
        fillmode: {type: String},
        firstgid: {type: Number},
        //grid: {type: Grid},
        image: {type: String},
        imageheight: {type: Number},
        imagewidth: {type: Number},
        margin: {type: Number},
        objectalignment: {type: String},
        properties: {type: [Property]},
        source: {type: Number},
        terrains: {type: [Terrain]},
        tilecount: {type: Number},
        source: {type: String},
        tiledversion: {type: String},
        tilerendersize: {type: String},
        tiles: {type: [Tile]},
        tilewidth: {type: Number},
        transformations: {type: Transformation},
        transparentcolor: {type: String},
        type: {type: String},
        version: {type: String}
    })
});

const MapType = new GraphQLObjectType({
    name: 'Map',
    fields: () => ({
        backgroundColor: {
            type: GraphQLString,
        },
        class: {
            type: GraphQLString,
        },
        compressionLevel: {
            type: GraphQLFloat,
        },
        height: {
            type: GraphQLFloat,
        },
        hexSideLength: {
            type: GraphQLFloat,
        },
        infinite: {
            type: GraphQLBoolean,
        },
        layers: {
            type: [Layer],
        },
        nextlayerid: {
            type: GraphQLInt,
        },
        nextobjectid: {
            type: GraphQLString,
        },
        orientation: {
            type: GraphQLString,
        },
        parallaxOriginX: {
            type: GraphQLString,
        },
        parallaxOriginY: {
            type: GraphQLFloat,
            
        },
        properties: {
            type: [Property],
            
        },
        renderorder: {
            type: GraphQLString,
        },
        staggeraxis: {
            type: GraphQLString,
        },
        staggerindex: {
            type: GraphQLString,
        },
        tiledversion: {
            type: GraphQLString,
        },
        tileheight: {
            type: GraphQLFloat,
            
        },
        tilesets: {
            type: [Tileset] 
            
        },
        tilewidth: {
            type: GraphQLFloat,
            
        },
        type: {
            type: GraphQLString,
            
        },
        version: {
            type: GraphQLString,
            
        },
        width: {
            type: GraphQLFloat,
            
        }
    })
});



const LayerType = new GraphQLObjectType({
    name: 'Layer',
    fields: () => ({
         chunks: {type: [Chunk]},
         class: {type: GraphQLString},
         compression: {type: GraphQLString},
         data: { type: [GraphQLInt]},
         draworder: {type: GraphQLString},
         encoding: {type: GraphQLString},
         height: {type: GraphQLInt},
         image: {type: GraphQLString},
         layers: {type: [GraphQLFloat]},
         locked: {type: GraphQLBoolean},
         name: {type: GraphQLString},
         objects: {type: [Object]},
         offsetx: {type: GraphQLInt},
         offsety: {type: GraphQLInt},
         opacity: {type: GraphQLInt},
         parallaxx: {type: GraphQLInt},
         parallaxy: {type: GraphQLInt},
         properties: {type: [Property]},
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
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
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
        }
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation,
});