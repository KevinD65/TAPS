require('isomorphic-fetch');
let tileset = require("./sampleTS.json");

test("Get User", () => {
    const expected = {
        "getTileset": 
            {
                "image": "../OneDrive/Documents/lungo/benchmark2/dist/lungo_assets/tilemaps/level1.png"
            }
        
    };

    const variables = { input: tileset };
    console.log(`TilesetInput: ${JSON.stringify(variables)}`);

    fetch('https://taps-backend.herokuapp.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // The query we are sending to the GraphQL API
    body: JSON.stringify({ query: 
        `{
            getTileset(_id: "6355c0ac01c51ccdc0256da6
            ") {
              image,
            }
          }` 
        })
    })
    .then(res => res.json())
    // The test condition itself
    .then(res => expect(res.data).toStrictEqual(expected));
})