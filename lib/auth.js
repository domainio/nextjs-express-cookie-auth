import axios from 'axios';

axios.defaults.withCredentials = true;

const loginUser = async (email, password) => {
  const res = await axios.post('/api/login', { email, password });
  const { data } = res;
  // detemine if we are on server-side or client-side ?
  if (typeof window !== 'undefined') {
    window[WINDOW_USER_SCRIPT_KEY] = data || {};
  }
};

const getUserProfile = async () => {
  const res = await axios.get('/api/profile');
  const { data: { user } } = res;
  return user; Î
};

const getServerSideToken = async (req) => {
  if (!req) {
    return { user: null };
  }
  const { signedCookies = {} } = req;
  if (!signedCookies) {
    return {};
  } else if (!signedCookies.token) {
    return {};
  }
  return { user: signedCookies.token };
};

const WINDOW_USER_SCRIPT_KEY = '__USER__';

const getUserScript = (user) => {
  return `${WINDOW_USER_SCRIPT_KEY} = ${JSON.stringify(user)};`;
}

export {
  loginUser,
  getUserProfile,
  getServerSideToken,
  getUserScript
}