import axios from 'axios';

axios.defaults.withCredentials = true;

const loginUser = async (email, password) => {
  const res = await axios.post('/api/login', { email, password });
  const { data: { userData } } = res;
  return userData;
};

const getUserProfile = async () => {
  const res = await axios.get('/api/profile');
  const { data: { user } } = res;
  return user;
}

export {
  loginUser,
  getUserProfile,
}