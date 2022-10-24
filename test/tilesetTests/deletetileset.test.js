require('isomorphic-fetch');
let tileset = require("./sampleTS.json");

test("Delete Tileset", async () => {
    const newMap = {
        "deleteUser": {
            "image": "../OneDrive/Documents/lungo/benchmark2/dist/lungo_assets/tilemaps/level1.png"
        }
    };

    let res = await fetch('https://taps-backend.herokuapp.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // The query we are sending to the GraphQL API
    body: JSON.stringify({ query: 
        `mutation{
            addTileSet(TilesetInput: $input){
              image,
            }
          }` 
        })
    })
    .then(res => res.json())
    
    let idnum = res.data.addTileSet.id;

    return fetch('https://taps-backend.herokuapp.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // The query we are sending to the GraphQL API
    body: JSON.stringify({ query: 
        `mutation{
            deleteUser(id: "${idnum}"){
                image,
            }
          }` 
        })
    })
    .then(res => res.json())
    // The test condition itself2
    .then(res => expect(res.data).toEqual(newMap));
})