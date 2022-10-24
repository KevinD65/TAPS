require("dotenv").config();
const mongoose = require("mongoose");
const Map = require("../server/models/Map");
const schema = require('../server/schema/schema');
require('isomorphic-fetch');

test("Add map", () => {
    const newMap = {
        "addMap": {
            "compressionLevel": -1,
            "height": 32,
            "infinite": false,
            "nextlayerid": 4,
            "nextobjectid": "1",
            "orientation": "orthogonal",
            "renderorder": "right-down",
            "tiledversion": "1.8.2",
            "tileheight": 16
        }
    };

    return fetch('https://taps-backend.herokuapp.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // The query we are sending to the GraphQL API
    body: JSON.stringify({ query: 
        `mutation{
            addMap(MapInput: { compressionLevel:-1,
                height:32,
                infinite:false,
                nextlayerid:4,
                nextobjectid:"1",
                orientation:"orthogonal",
                renderorder:"right-down",
                tiledversion:"1.8.2",
                tileheight:16
            }){
                compressionLevel,
                height,
                infinite,
                nextlayerid,
                nextobjectid,
                orientation,
                renderorder,
                tiledversion,
                tileheight
            }
            }` 
        })
    })
    .then(res => res.json())
    // The test condition itself
    .then(res => expect(res.data).toStrictEqual(newMap));
})