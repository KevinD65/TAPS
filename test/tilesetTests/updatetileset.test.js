/*require('isomorphic-fetch');

test("Update Tileset", async () => {
    const newUser = {
        "updateUser": {
            "image": "../OneDrive/Documents/lungo/benchmark2/dist/lungo_assets/tilemaps/level1.png"
        }
    };

    await fetch('http://localhost:42069/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // The query we are sending to the GraphQL API
    body: JSON.stringify({ query: 
        `mutation{
            updateTileset(id: "635639cb164bf6f078855fc1", newuser: "Changed", newhash: "4567", newbio: "Mechanical Engineer"){
              image,
            }
          }` 
        })
    })
    .then(res => res.json())
    .then(res => expect(res.data).toEqual(newUser));

    await fetch('http://localhost:42069/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // The query we are sending to the GraphQL API
    body: JSON.stringify({ query: 
        `mutation{
            updateUser(id: "635639cb164bf6f078855fc1", username: "Kev", hash: "1234", bio: "Software Engineer"){
              image,
            }
          }` 
        })
    })
    .then(res => res.json());
})*/