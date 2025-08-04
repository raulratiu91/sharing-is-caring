
export default {
  Base: '/api',
  Users: {
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Auth: {
    Base: '/auth',
    Register: '/register',
    Login: '/login',
    Me: '/me',
    Logout: '/logout',
  },
} as const;
