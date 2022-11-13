const Project = require("../models/Project");
const Client = require('../models/Client');
const Tileset = require('../models/Tileset');
const User = require('../models/User');
const Map = require('../models/Map');
const Folder = require('../models/Folder');
const {Layer, LayerSchema} = require('../models/Layer');
const LayerInputType = require("./types/LayerInputType");
const TilesetInputType = require("./types/TilesetInputType");
const MapInputType = require("./types/MapInputType");
const MapType = require("./types/MapType");
const TilesetType = require("./types/TilesetType");
const UserType = require("./types/UserType");
const FolderType = require("./types/Folder");

const tokens = require('../tokens');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType, GraphQLInt, GraphQLInputObjectType, GraphQLFloat, GraphQLBoolean, GraphQLScalarType } = require('graphql');
const nodemailer = require('nodemailer');
const jwt = require('jwt-simple');
const moment = require('moment');
const { TOKEN_SECRET_KEY } = process.env;

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
            resolve(parent, args){
                let user = new User({
                    name: args.name,
                    email: args.email,
                    username: args.username,
                    hash: args.hash,
                    bio: args.bio,
                    pwResetHash: ""
                });
                return user.save();
            }
        },
        updateUser:{
            type: UserType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                username: {type: GraphQLString},
                email: {type: GraphQLString},
                hash: {type: GraphQLString},
                bio: { type: GraphQLString }
            },
            resolve(parent, args){
                return User.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            username: args.username,
                            email: args.email,
                            hash: args.hash,
                            bio: args.bio,
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
        createFolder:{
            type: FolderType,
            args: {
                name: {type: GraphQLString},
                ownerID: {type: GraphQLID},
                folderId: {type: GraphQLID},
            },
            resolve(parent, args){
                let folder = new Folder({
                    name: args.name,
                    ownerID: args.ownerID,
                    folderId: args.folderId
                });
                return folder.save();
            }
        },
        updateFolder:{
            type: FolderType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                ownerID: {type: GraphQLID},
                folderId: {type: GraphQLID},
            },
            resolve(parent, args){
                return Folder.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            ownerID: args.ownerID,
                            folderId: args.folderId,
                        }
                    },
                    {new: true},
                );
            }
        },
        deleteFolder:{
            type: FolderType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(paren, args){
                return Folder.findByIdAndRemove(args.id);
            }
        },
        sendRecoveryEmail:{
            type: UserType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
                email: {type: GraphQLString},
                hash: {type: GraphQLString}
            },
            async resolve(parent, args){
                let testAccount = nodemailer.createTestAccount((err, account) => {
                    if(err){
                        console.log("ERROR OCCURRED WHILE CREATING TEST ACCOUNT");
                    }
                });

                //given the userID, email, and timestamp, encrypt the link and store it in the user DB

                // create reusable transporter object using the default SMTP transport (fake test email)
                const transporter = nodemailer.createTransport({
                    host: 'smtp.ethereal.email',
                    port: 587,
                    auth: {
                        user: 'ashleigh.windler16@ethereal.email', //put in .env
                        pass: 'HTQbZSFyqztfS6Qsq5' //put in .env
                    }
                });

                //CREATE JWT-Simple TOKEN FOR ONE-TIME-USE PASSWORD RESET LINK
                let payload = { id: args.id, email: args.email};
                let secret = args.hash + Date.now();
                //let expiration = moment().add(30, 'seconds').valueOf();
                let token = jwt.encode(payload, secret /*,{exp: expiration}*/);

                let myUser = await User.findByIdAndUpdate(args.id, {pwResetHash: secret}); //store the password reset hash in the DB

                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: 'kevin.duong10@yahoo.com', // sender address
                    to: "cortanakd@gmail.com", // list of receivers
                    subject: "Hello", // Subject line
                    text: "Hello world?", // plain text body
                    html: "<a href=http://localhost:3000/resetpassword/" + args.id + '/' + token + ">Reset password</a>" //change this to deployed netlify version later
                });

                return myUser;

                console.log("SENT EMAIL");
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
        changeTilesetName:{
            type: MapType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
            },
            async resolve(parent, args){
                const tileset = await Tileset.findByIdAndUpdate(
                    args.id,
                    {name: args.name},
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
            type: /*GraphQLNonNull(UserType)*/UserType, //making this non-null causes an issue on sign-up because it couldn't find a User that matched the parameters to return
            args: {
                id: {type: GraphQLID}, 
                username: {type: GraphQLString}, 
                email: {type: GraphQLString}
            },
            resolve(parent, args){
                if(args.id){
                    return User.findById(args.id);
                }
                return User.findOne({"$or": [{username: args.username}, {email: args.email}]});
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
                return Map.find({ownerID: args.ownerID, folderId: null});
            }
        },
        getOwnerTilesets: {
            type: GraphQLList(TilesetType),
            args: {ownerID: {type: GraphQLID}},
            resolve(parent, args){
                return Tileset.find({ownerID: args.ownerID, folderId: null});
            }
        },
        getOwnerFolders: {
            type: GraphQLList(FolderType),
            args: {ownerID: {type: GraphQLID}, folderId: {type: GraphQLID}},
            resolve(parent, args){
                return Folder.find({folderId: args.folderId, ownerID: args.ownerID});
            }
        },
        getMaps: {
            type: GraphQLList(MapType),
            resolve(parent, args){
                return Map.find();
            }
        },
        validateResetPWToken: {
            type: UserType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
                token: {type: GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent, args){
                let user = await User.findById(args.id);
                if(user == undefined){
                    console.log("user does not exist");
                    throw new Error;
                }
                else{
                    let payload;
                    try{
                        payload = jwt.decode(args.token, user.pwResetHash);
                    }
                    catch(err){
                        console.log("TOKEN ERROR");
                        throw new Error;
                    }
                }
                return user;
            }
        },
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation,
});