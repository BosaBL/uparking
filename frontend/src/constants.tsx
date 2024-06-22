export const BASEAPI = new URL('http://localhost/api/').toString();

export const APIS = {
  auth: new URL('auth/', BASEAPI).toString(),
  admin: new URL('v1/admin/', BASEAPI).toString(),
  vigilante: new URL('v1/vigilante/', BASEAPI).toString(),
  user: new URL('v1/', BASEAPI).toString(),
};
