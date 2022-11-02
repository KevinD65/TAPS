require('isomorphic-fetch');

test("Create User", () => {
    const newuser = {
        "createUser": {
            "name": "Kevin",
            "email": "kevinduong@yahoo.com",
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
            createUser(name: "Kevin", email: "kevinduong@yahoo.com", username: "Kev", hash: "1234", bio: "Software Engineer"){
              name,
              email,
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
