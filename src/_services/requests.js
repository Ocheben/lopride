export const request = (method, url, data) => {
  const opts = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  console.log(opts);
  return fetch(url, opts)
    .then(res => res.json())
    .then(response => response)
    .catch(error => error);
};

export const requestJwt = (method, url, data, jwt) => {
  const opts =
    method === 'GET'
      ? {
          method,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        }
      : {
          method,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          body: data && JSON.stringify(data),
        };
  return fetch(url, opts)
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(response => response)
    .catch(error => error);
};
