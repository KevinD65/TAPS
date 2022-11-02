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
            updateUser(id: "63629a7c161eda1dd75b47e4", newuser: "Bobby Shmurda", newusername: "Changed", newemail: "GoNewYorkGoNewYorkGo@gmail.com", newhash: "4567", newbio: "Mechanical Engineer"){
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
            updateUser(id: "63629a7c161eda1dd75b47e4", newuser: "KEVINDUONGBABY", newusername: "Kev", newemail: "kevinduong@yahoo.com", newhash: "1234", newbio: "Software Engineer"){
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
