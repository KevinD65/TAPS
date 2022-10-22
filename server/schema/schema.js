const Project = require("../models/Project");
const Client = require('../models/Client');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType, GraphQLInt } = require('graphql');
const Tileset = require("../models/Tileset.js");

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

const TilesetType = new GraphQLObjectType({
    name: 'Tileset',
    fields: () => ({
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
        },

        addTileset: {
            type: TilesetType,
            args:{
                columns: {type: GraphQLInt},
                image: {type: GraphQLString},
                imageheight: {type: GraphQLInt},
                imagewidth: {type: GraphQLID},
                margin: {type: GraphQLInt},
                name: {type: GraphQLString},
                spacing: {type: GraphQLInt},
                tilecount: {type: GraphQLInt},
                tiledversion: {type: GraphQLString},
                tileheight: {type: GraphQLInt},
                tilewidth: {type: GraphQLInt},
                type: {type: GraphQLString},
                version: {type: GraphQLString}
            },
            resolve(parent, args){
                const tileset = new Tileset({
                    columns: args.columns,
                    image: args.image,
                    imageheight: args.imageheight,
                    imagewidth: args.imagewidth,
                    margin: args.margin,
                    name: args.name,
                    spacing: args.spacing,
                    tilecount: args.tilecount,
                    tiledversion: args.tiledversion,
                    tileheight: args.tileheight,
                    tilewidth: args.tilewidth,
                    type: args.type,
                    version: args.version
                });
                return tileset.save();
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
        },
        tilesets: {
            type: TilesetType,
            resolve(parent, args){
                return Tileset.find();
            }
        }
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation,
});