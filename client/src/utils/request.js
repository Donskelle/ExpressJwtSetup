
export function isUnauthorized(response) {
  if (response.body == 'Unauthorized') {
    return true;
  }
  return false;
}

