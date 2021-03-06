const next = require('next');
const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');

const dev = process.env.NODE_END !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

const AUTH_USER_TYPE = "authenticated";
const COOKIE_SECRET = '123afasfa';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !dev,
  signed: true
};

const authenticate = async (email, password) => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/users');
  const { data: users } = res;
  const isAuth = users.find(user => {
    if (user.email === email && user.website === password) {
      return user;
    }
  })  
  return isAuth;
}

app.prepare().then(() => {
  const server = express();
  server.use(express.json());
  server.use(cookieParser(COOKIE_SECRET));

  server.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await authenticate(email, password);
    if (!user) {
      return res.status(403).send('Invalid email or password');
    }
    const userData = {
      name: user.name,
      email: user.email,
      type: AUTH_USER_TYPE
    };
    res.cookie('token', userData, COOKIE_OPTIONS);
    res.json(userData);
  });

  server.post('/api/logout', (res, req) => {
    console.log('server.js > res.clearCookie: ',res.clearCookie);
    res.clearCookie('token');
    res.sendStatus(204);
  })

  server.get('/api/profile', async (req, res) => {
    const { signedCookies = {} } = req;
    const { token } = signedCookies;
    if (token && token.email) {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      const { data: users } = response;
      const userProfile = users.find(user => user.email === token.email);
      console.log('server > userProfile: ', userProfile);
      return res.json({ user: userProfile });
    }
    res.sendStatus(404);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`Listening on PORT ${port}`);
  });
});