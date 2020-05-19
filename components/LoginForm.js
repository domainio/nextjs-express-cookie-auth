import { useState } from 'react';
import { loginUser } from '../lib/auth';

const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('email: ', email, ', password: ', password);
    loginUser(email, password);
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
      <button type="submit">Submit</button>
    </form>
  )
}

export default LoginForm;