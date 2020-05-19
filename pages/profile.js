import { useEffect, useState } from 'react';
import { getUserProfile } from '../lib/auth';

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
    <div>
      <h1>profile page</h1>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  )
};

export default ProfilePage;