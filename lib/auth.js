import axios from 'axios';

axios.defaults.withCredentials = true;
const WINDOW_USER_SCRIPT_KEY = '__USER__';

const loginUser = async (email, password) => {
  const res = await axios.post('/api/login', { email, password });
  const { data } = res;
  console.log('loginUser > data: ', data);
  // detemine if we are on server-side or client-side ?
  if (typeof window !== 'undefined') {
    console.log('loginUser > client-side window');
    window[WINDOW_USER_SCRIPT_KEY] = data || {};
  } else {
    console.log('loginUser > server-side no win');
  }
};

const getUserProfile = async () => {
  const res = await axios.get('/api/profile');
  const { data: { user } } = res;
  return user;
};

const getServerSideToken = async (req) => {
  console.log('auth > getServerSideToken > req:', req);
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

const getUserScript = (user) => {
  return `${WINDOW_USER_SCRIPT_KEY} = ${JSON.stringify(user)};`;
}

const getClientSideToken = () => {
  if (typeof window !== 'undefined') {
    const user = window[WINDOW_USER_SCRIPT_KEY];
    return { user };
  }
  return { user: {} };
};

const authInitialProps = () => ({ req, res }) => {
  console.log('authInitialProps > req: ', !!req);
  const auth = (req ? getServerSideToken(req) : getClientSideToken());
  console.log('authInitialProps > auth: ', auth);
  return { auth };
}

export {
  loginUser,
  getUserProfile,
  getServerSideToken,
  getUserScript,
  authInitialProps
}