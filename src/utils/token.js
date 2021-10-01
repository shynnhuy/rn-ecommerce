const EXPIRE_FUDGE = 10;

const decodeJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const getTimestampFromToken = (token) => {
  const decode = decodeJwt(token);

  return decode?.exp;
};

const getExpiresIn = (token) => {
  const expiration = getTimestampFromToken(token);

  if (!expiration) return -1;

  return expiration - Date.now() / 1000;
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  const expiresIn = getExpiresIn(token);
  return !expiresIn || expiresIn <= EXPIRE_FUDGE;
};
