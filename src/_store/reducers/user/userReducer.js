import {USERCONSTANTS, AUTHCONSTANTS} from '../../constants';

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
const {LOGOUT} = AUTHCONSTANTS;

const initState = {
  loading: '',
  orders: [],
  rates: {},
  dashboard: {user: '', totalContributionsThisYear: '', lastContribution: {}},
  contributions: [],
  loactions: [],
  accountBalance: '',
  officer: {},
  missing: [],
};

const userData = (state = initState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case SET_DASHBOARD:
      const ratesAr = JSON.parse(action.payload.employment.contribution_rates);
      const employeeRate = ratesAr.find(e => e.contributor === 'employee').rate;
      const employerRate = ratesAr.find(e => e.contributor === 'employer').rate;
      const rates = {employeeRate, employerRate};
      return {
        ...state,
        dashboard: action.payload,
        rates,
      };

    case SET_CONTRIBUTIONS:
      return {
        ...state,
        contributions: action.payload,
      };

    case SET_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
      };

    case SET_ACC_BAL:
      return {
        ...state,
        accountBalance: action.payload,
      };

    case SET_OFFICER:
      return {
        ...state,
        officer: action.payload,
      };

    case SET_MISSING:
      return {
        ...state,
        missing: action.payload,
      };

    case LOGOUT:
      return {
        ...initState,
      };

    default:
      return state;
  }
};

export default userData;
