require('isomorphic-fetch');

test("Create User", () => {
    const newuser = {
        "createUser": {
            "username": "Kev",
            "hash": "1234",
            "bio": "Software Engineer"
        }
    };

    return fetch('https://taps416.herokuapp.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // The query we are sending to the GraphQL API
    body: JSON.stringify({ query: 
        `mutation{
            createUser(username: "Kev", hash: "1234", bio: "Software Engineer"){
              username,
              hash,
              bio,
            }
          }` 
        })
    })
    .then(res => res.json())
    // The test condition itself
    .then(res =>  expect(res.data).toEqual(newuser));
})
