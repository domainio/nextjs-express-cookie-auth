import LoginForm from '../components/LoginForm';
import Layout from '../components/Layout';
import { authInitialProps } from '../lib/auth';

const LoginPage = (props) => {
  return (
    <Layout title="Login" {...props}ƒ>
      <LoginForm />
    </Layout>
  );
};

LoginPage.getInitialProps = authInitialProps();

export default LoginPage;