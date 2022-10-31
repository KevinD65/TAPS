require('isomorphic-fetch');
let tileset = require("./sampleTS.json");

test("Get Tileset", () => {
    const expected = {
        "getTileset": 
            {
                "image": "../OneDrive/Documents/lungo/benchmark2/dist/lungo_assets/tilemaps/level1.png"
            }
        
    };

    const variables = { input: tileset };
    console.log(`TilesetInput: ${JSON.stringify(variables)}`);

    fetch('https://taps416.herokuapp.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // The query we are sending to the GraphQL API
    body: JSON.stringify({ query: 
        `{
            getTileset(id: "635f58b14d5dcb189c86d4a8") {
              image,
            }
          }` 
        })
    })
    .then(res => res.json())
    // The test condition itself
    .then(res => expect(res.data).toEqual(expected));
})