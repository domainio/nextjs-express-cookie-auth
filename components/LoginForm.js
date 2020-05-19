import { useState } from 'react';
import { loginUser } from '../lib/auth';
import Router from 'next/router';

const LoginForm = () => {

  const [email, setEmail] = useState('Sincere@april.biz');
  const [password, setPassword] = useState('hildegard.org');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setLoading] = useState(false);

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  }

  const onSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    console.log('email: ', email, ', password: ', password);
    try {
      await loginUser(email, password);
      Router.push('/profile');
    } catch (err) {
      console.log(err);
      setErrorMsg(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <button disabled={isLoading} type="submit">Submit</button>
      {!isLoading && (<div>{errorMsg}</div>)}
    </form>
  )
}

export default LoginForm;