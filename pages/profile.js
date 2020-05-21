import { useEffect, useState } from 'react';
import { getUserProfile, authInitialProps } from '../lib/auth';
import Layout from '../components/Layout';

const ProfilePage = (props) => {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const getUserProfileAsync = async () => {
      const _profile = await getUserProfile();
      setProfile(_profile)
      console.log('profile > useEffect > getUserProfileAsync > _profile:  ',_profile);
    }
    getUserProfileAsync();
  }, []);

  return (
    <Layout title="Profile" {...props}>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </Layout>
  )
};

ProfilePage.getInitialProps = authInitialProps();

export default ProfilePage;