import {Toast} from 'native-base';
import {USERCONSTANTS} from '../constants';
import {APIS, requestJwt, toastDefault} from '../../_services';

const {
  SET_DASHBOARD,
  SET_ORDERS,
  SET_LOADING,
  SET_CONTRIBUTIONS,
  SET_LOCATIONS,
  SET_ACC_BAL,
  SET_OFFICER,
  SET_MISSING,
} = USERCONSTANTS;
const actionCreator = (type, payload) => ({type, payload});

export const getOrders = (jwt, page) => {
  const {
    baseUrl,
    getOders: {method, path},
  } = APIS;
  const url = `${baseUrl}${path(page)}`;
  return async dispatch => {
    dispatch(actionCreator(SET_LOADING, 'orders'));
    const response = await requestJwt(method, url, {}, jwt);
    console.log(response);
    if (response.meta && response.meta.status === 200) {
      dispatch(actionCreator(SET_ORDERS, response.data.orders));
    }
    dispatch(actionCreator(SET_LOADING, ''));
  };
};


export const getDash = jwt => {
  const {
    baseUrl,
    dashboard: {method, path},
  } = APIS;
  const url = `${baseUrl}${path}`;
  return async dispatch => {
    dispatch(actionCreator(SET_LOADING, 'dashboard'));
    const response = await requestJwt(method, url, {}, jwt);
    console.log(response)
    if (response.user) {
      dispatch(actionCreator(SET_DASHBOARD, response));
    }
    dispatch(actionCreator(SET_LOADING, ''));
  };
};

export const getContri = (jwt, start, end) => {
  const {
    baseUrl,
    getContributions: {method, path},
  } = APIS;
  console.log(start, end);
  const url = `${baseUrl}${path(start, end)}`;
  return async dispatch => {
    dispatch(actionCreator(SET_LOADING, 'contributions'));
    const response = await requestJwt(method, url, {}, jwt);
    console.log(url, response);
    if (response) {
      dispatch(actionCreator(SET_CONTRIBUTIONS, response));
    }
    dispatch(actionCreator(SET_LOADING, ''));
  };
};

export const getLocations = (state, jwt) => {
  const {
    baseUrl,
    getLocations: {method, path},
  } = APIS;
  const url = `${baseUrl}${path(state)}`;
  return async dispatch => {
    dispatch(actionCreator(SET_LOADING, 'locations'));
    const response = await requestJwt(method, url, {}, jwt);
    console.log(url, response);
    if (response.offices) {
      dispatch(actionCreator(SET_LOCATIONS, response.offices));
    }
    dispatch(actionCreator(SET_LOADING, ''));
  };
};

export const getAccBal = jwt => {
  const {
    baseUrl,
    getEnquiry: {method, path},
  } = APIS;
  const url = `${baseUrl}${path('account_balance')}`;
  return async dispatch => {
    dispatch(actionCreator(SET_LOADING, 'accountBalance'));
    const response = await requestJwt(method, url, {}, jwt);
    console.log(url, response);
    if (response.data) {
      dispatch(actionCreator(SET_ACC_BAL, response.data));
    }
    dispatch(actionCreator(SET_LOADING, ''));
  };
};

export const getOfficer = jwt => {
  const {
    baseUrl,
    getEnquiry: {method, path},
  } = APIS;
  const url = `${baseUrl}${path('account_officer')}`;
  return async dispatch => {
    dispatch(actionCreator(SET_LOADING, 'accountOfficer'));
    const response = await requestJwt(method, url, {}, jwt);
    console.log(url, response);
    if (response.data) {
      dispatch(actionCreator(SET_OFFICER, response.data));
    } else {
      Toast.show({
        ...toastDefault,
        text: 'There might be a problem with your connection',
        type: 'danger',
      });
    }
    dispatch(actionCreator(SET_LOADING, ''));
  };
};

export const getMissing = jwt => {
  const {
    baseUrl,
    getEnquiry: {method, path},
  } = APIS;
  const url = `${baseUrl}${path('missing_contributions')}`;
  return async dispatch => {
    dispatch(actionCreator(SET_LOADING, 'missingContributions'));
    const response = await requestJwt(method, url, {}, jwt);
    console.log(url, response);
    if (response.data) {
      dispatch(actionCreator(SET_MISSING, response.data));
    } else {
      Toast.show({
        ...toastDefault,
        text: 'There might be a problem with your connection',
        type: 'danger',
      });
    }
    dispatch(actionCreator(SET_LOADING, ''));
  };
};
