import axios from 'axios';

const loginUser = async (email, password) => {
  const response = await axios.post('/api/login', { email, password });
  const { data } = response;
  console.log(data);
};

export {
  loginUser,
}