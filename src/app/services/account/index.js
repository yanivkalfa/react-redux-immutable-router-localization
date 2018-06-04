//  just an example fetch ..

export function login(url, username) {
  return fetch(url, {
    method: 'POST',
    body: `username=${ username }`,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'authorization': 'token'
    }
  });
}
