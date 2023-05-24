import React, { useContext, useState } from "react";

export const UserIDContext = React.createContext("0");

export const UserIDProvider = ({ children }) => {
    const [userID, setUserID] = useState(null);
    return (
        <UserIDContext.Provider value={{ userID, setUserID }}>
            {children}
        </UserIDContext.Provider>
    );
};

export const useUserID = () => {
    return useContext(UserIDContext);
};