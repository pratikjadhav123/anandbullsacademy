import React, { createContext, useState } from "react";
import auth from "./../utils/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

export const AppContext = createContext();

export const ApplicationDataProvider = ({ children }) => {
    const navigate = useHistory();
    const [user, setUser] = useState();
    const getAllData = () => {
        console.log("AppContext");
        getUser();
    };
    const getUser = () => {
        if (auth.getToken()) {
            auth
                .getUser()
                .then((data) => {
                    if (data.Active) {
                        setUser(data);
                    } else {
                        navigate.push("/auths/auth-login");
                    }
                })
                .catch(() => {
                    navigate.push("/auths/auth-login");
                });
        } else {
            navigate.push("/auths/auth-login");
        }
    };

    const providerState = {
        user,
        setUser,
        getAllData: getAllData,
        getUser: getUser,
    };
    return (
        <AppContext.Provider value={providerState}>{children}</AppContext.Provider>
    );
};
