import { useEffect, useState } from 'react';
import { getUserProfile } from '../lib/auth';
import Layout from '../components/Layout';
const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const getUserProfileAsync = async () => {
      const _profile = await getUserProfile();
      setProfile(_profile)
    }
    getUserProfileAsync();
  }, []);

  return (
    <Layout title="Profile">
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </Layout>
  )
};

export default ProfilePage;