import { useEffect, useContext } from 'react';
import { UserContext } from '../contexts/usercontext';

export function useFetch() {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user');
        const data = await response.json();
        setUser(data);
        console.log("useFetch has setUser to data: " + data)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [setUser]);
}
