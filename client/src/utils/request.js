
export function getStorage() {
  let jwt = localStorage.getItem('jwt');
  let user = JSON.parse(localStorage.getItem('user'));

  return {
    user,
    jwt,
  }
}
export function setStorage({user,jwt}) {
  localStorage.setItem('jwt', jwt);
  localStorage.setItem('user', JSON.stringify(user));
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

