require('isomorphic-fetch');

test("Get User", () => {
    const newMap = {
        "getUser": [
            {
              "username": "Anmol",
              "hash": "1234",
              "bio": "Software Engineer"
            }
        ]
    };

    fetch('https://taps416.herokuapp.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // The query we are sending to the GraphQL API
    body: JSON.stringify({ query: 
        `{
            getUser(username: "Anmol") {
              username
              hash
              bio
            }
          }` 
        })
    })
    .then(res => res.json())
    // The test condition itself
    .then(res => expect(res.data).toEqual(newMap));
})