export const BASEAPI = new URL('http://localhost/api/').toString();

export const APIS = {
  auth: new URL('auth/', BASEAPI).toString(),
  admin: new URL('api/admin/', BASEAPI).toString(),
};
