require('isomorphic-fetch');
let tileset = require("./sampleTS.json");
let tileset2 = require("./sampleTS2.json");

test("Update Tileset", async () => {
    const newtileset = {
        "updateTileSet": {
            "image": "../OneDrive/Documents/lungo/benchmark2/dist/lungo_assets/tilemaps/level500.png"
        }
    };

    const variables = { input: tileset2 };

    await fetch('https://taps416.herokuapp.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // The query we are sending to the GraphQL API
    body: JSON.stringify({ query: 
        `mutation($input: TileInput){
            updateTileSet(id: "635f58f64d5dcb189c86d4aa", TilesetInput: $input){
              image,
            }
          }`,
          variables  
        })
    })
    .then(res => res.json())
    .then(res => expect(res.data).toEqual(newtileset));

    const variables2 = { input: tileset };

    await fetch('https://taps416.herokuapp.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // The query we are sending to the GraphQL API
    body: JSON.stringify({ query: 
        `mutation($input: TileInput){
            updateTileSet(id: "635f58f64d5dcb189c86d4aa", TilesetInput: $input){
              image,
            }
          }`,
          variables2  
        })
    })
    .then(res => res.json());
})