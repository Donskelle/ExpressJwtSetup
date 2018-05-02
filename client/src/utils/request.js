
export function getStorage() {
  let jwt, user;
  try {
    user = JSON.parse(localStorage.getItem('user'));
    jwt = localStorage.getItem('jwt');
  }
  catch (e) {
    user = null;
    jwt = null;
  }

  return {
    user,
    jwt,
  }
}
export function setStorage({ user, jwt }) {
  try {
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('user', JSON.stringify(user));
  }
  catch (e) {
    console.log(e);
  }
}
export function clearStorage() {
  localStorage.removeItem('jwt');
  localStorage.removeItem('user');
}



export function isAuthorized(response) {
  if (response.body === 'Unauthorized') {
    return true;
  }
  return false;
}

