import React, { Children, createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children}) => {
    const[user,setUser] = useState(null);

    //function to update user data
    const updateUser = (userData) => {
        setUser(userData);
    };

    //Function to cleare user data(e.g., on lagout)
    const clearUser = () => {
        setUser(null);
    };

    return(
        <UserContext.Provider
        value={{
            user,
            updateUser,
            clearUser,
        }}
        >
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider;