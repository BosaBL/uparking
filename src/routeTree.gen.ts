/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthImport } from './routes/_auth'
import { Route as AdminImport } from './routes/_admin'
import { Route as IndexIndexImport } from './routes/index/index'
import { Route as AuthAuthRegisterImport } from './routes/_auth/auth.register'
import { Route as AuthAuthLoginImport } from './routes/_auth/auth.login'

// Create/Update Routes

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AdminRoute = AdminImport.update({
  id: '/_admin',
  getParentRoute: () => rootRoute,
} as any)

const IndexIndexRoute = IndexIndexImport.update({
  path: '/index/',
  getParentRoute: () => rootRoute,
} as any)

const AuthAuthRegisterRoute = AuthAuthRegisterImport.update({
  path: '/auth/register',
  getParentRoute: () => AuthRoute,
} as any)

const AuthAuthLoginRoute = AuthAuthLoginImport.update({
  path: '/auth/login',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_admin': {
      id: '/_admin'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AdminImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/index/': {
      id: '/index/'
      path: '/index'
      fullPath: '/index'
      preLoaderRoute: typeof IndexIndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth/auth/login': {
      id: '/_auth/auth/login'
      path: '/auth/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthAuthLoginImport
      parentRoute: typeof AuthImport
    }
    '/_auth/auth/register': {
      id: '/_auth/auth/register'
      path: '/auth/register'
      fullPath: '/auth/register'
      preLoaderRoute: typeof AuthAuthRegisterImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  AuthRoute: AuthRoute.addChildren({
    AuthAuthLoginRoute,
    AuthAuthRegisterRoute,
  }),
  IndexIndexRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_admin",
        "/_auth",
        "/index/"
      ]
    },
    "/_admin": {
      "filePath": "_admin.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/auth/login",
        "/_auth/auth/register"
      ]
    },
    "/index/": {
      "filePath": "index/index.tsx"
    },
    "/_auth/auth/login": {
      "filePath": "_auth/auth.login.tsx",
      "parent": "/_auth"
    },
    "/_auth/auth/register": {
      "filePath": "_auth/auth.register.tsx",
      "parent": "/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
