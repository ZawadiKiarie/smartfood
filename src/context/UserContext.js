import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    date_joined: '',
    profile_picture: ''
  })

  const loadUser = (data) => {
    const { id, name, email, date_joined, profile_picture } = data;
    setUser({ id, name, email, date_joined, profile_picture });
  }

  return (
    <UserContext.Provider value={{ user, loadUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext);
}