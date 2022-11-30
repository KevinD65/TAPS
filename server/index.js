const express = require('express');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const port = process.env.PORT || 4000;
const connectDB = require('./config/db');

const app = express();

const cors = require('cors');


connectDB();

app.use(cors());

app.use('/graphql', graphqlHTTP((req, res, graphQLParams) => {
    return{
    schema,
    graphiql: process.env.NODE_ENV === "production",
    context: { req, res },
}}));



app.listen(port, console.log('Server running on port ${port}', port));