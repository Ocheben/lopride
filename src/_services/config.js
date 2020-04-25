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
};

export const toastDefault = {
  buttonText: 'Okay',
  duration: 4000,
  position: 'bottom',
};
