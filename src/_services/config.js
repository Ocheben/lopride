export const APIS = {
  baseUrl: 'https://lopservdealer.herokuapp.com/lopser/dealer/v1',
  initSignup: {
    method: 'POST',
    path: '/init',
  },
  verifyOtp: {
    method: 'PUT',
    path: '/init/verifyotp',
  },
  completeSignup: {
    method: 'PUT',
    path: '/init/complete',
  },
  login: {
    method: 'POST',
    path: '/auth',
  },
  changePassword: {
    method: 'PUT',
    path: 'https://lopservdealer.herokuapp.com/lopser/dealer/v1/auth/password',
  },
  editProfile: {
    method: 'PUT',
    path: '/auth/profile',
  },
  acceptOrders: {
    method: 'POST',
    path: '/acceptorder',
  },
  completeOrders: {
    method: 'POST',
    path: '/confirmation',
  },
  getOders: {
    method: 'GET',
    path: page => `/orders/pagination?pagenumber=${page || '0'}`,
  },
};

export const toastDefault = {
  buttonText: 'Okay',
  duration: 4000,
  position: 'bottom',
};
