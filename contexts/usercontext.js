import React, { useState, useEffect, useMemo, createContext } from 'react';
import PropTypes from 'prop-types';

export const UserContext = React.createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/user')
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.log(error));
  }, []);

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const userContextValue = useMemo(() => ({ user, updateUser }), [user]);

  return (
    <>
      <UserContext.Provider value={userContextValue}>
        {children}
      </UserContext.Provider>
    </>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


