require('isomorphic-fetch');

test("Update User", async () => {
    const newUser = {
        "updateUser": {
            "name": "Bobby Shmurda",
            "username": "Changed",
            "email": "GoNewYorkGoNewYorkGo@gmail.com",
            "hash": "4567",
            "bio": "Mechanical Engineer"
        }
    };

    await fetch('https://taps416.herokuapp.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // The query we are sending to the GraphQL API
    body: JSON.stringify({ query: 
        `mutation{
            updateUser(id: "635639cb164bf6f078855fc1", newuser: "Changed", newhash: "4567", newbio: "Mechanical Engineer"){
              name,
              username,
              email,
              hash,
              bio
            }
          }` 
        })
    })
    .then(res => res.json())
    .then(res => expect(res.data).toEqual(newUser));

    await fetch('https://taps416.herokuapp.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // The query we are sending to the GraphQL API
    body: JSON.stringify({ query: 
        `mutation{
            updateUser(id: "635639cb164bf6f078855fc1", name: "Kevin", username: "Kev", email: "kevinduong@yahoo.com", hash: "1234", bio: "Software Engineer"){
              name,
              username,
              email,
              hash,
              bio,
            }
          }` 
        })
    })
    .then(res => res.json());
})