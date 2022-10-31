require('isomorphic-fetch');
let tileset = require("./sampleTS.json");

test("Delete Tileset", async () => {
    const newMap = {
        "deleteTileSet": 
        {
            "image": "../OneDrive/Documents/lungo/benchmark2/dist/lungo_assets/tilemaps/level1.png"
        }
    };

    const variables = { input: tileset };
    console.log(`TilesetInput: ${JSON.stringify(variables)}`);

    let res = await fetch('http://taps416.herokuapp.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // The query we are sending to the GraphQL API
    body: JSON.stringify({ query: 
        `mutation($input: TileInput){
            addTileSet(TilesetInput: $input){
              id,
              image,
            }
          }`,
          variables   
        })
    })
    .then(res => res.json())
    

    console.log(res)
    let idnum = res.data.addTileSet.id;
    console.log(typeof(idnum))



    return fetch('http://taps416.herokuapp.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // The query we are sending to the GraphQL API
    body: JSON.stringify({ query: 
        `mutation{
            deleteTileSet(id: "${idnum}"){
                image,
            }
          }`
        })
    })
    .then(res => res.json())
    // The test condition itself2
    .then(res => expect(res.data).toEqual(newMap));
})