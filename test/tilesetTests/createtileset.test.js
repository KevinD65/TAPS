require('isomorphic-fetch');
let tileset = require("./sampleTS.json");

test("Create Tileset", () => {
   
    const expected = {
        "addTileSet": {
            "image": "../OneDrive/Documents/lungo/benchmark2/dist/lungo_assets/tilemaps/level1.png"
          }
    };
    
    
    const variables = { input: tileset };
    console.log(`TilesetInput: ${JSON.stringify(variables)}`);

    return fetch('https://taps-backend.herokuapp.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // The query we are sending to the GraphQL API
    body: JSON.stringify({ query: 
        `mutation($input: TileInput){
            addTileSet(TilesetInput: $input){
              image,
            }
          }`,
          variables 
        })
    })
    .then(res => res.json())
    // The test condition itself
    .then(res => expect(res.data).toEqual(expected));
})