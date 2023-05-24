import React, { useContext, useState } from "react";

export const UserInfoContext = React.createContext({});

export const UserInfoProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    return (
        <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserInfoContext.Provider>
    );
};

export const useUserInfo = () => {
    return useContext(UserInfoContext);
};