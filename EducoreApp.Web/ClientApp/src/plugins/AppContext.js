import React, { createContext, useState } from "react";
import auth from "./../utils/auth";

export const AppContext = createContext();

export const ApplicationDataProvider = ({ children }) => {
    const [user, setUser] = useState();
    const getAllData = () => {
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
                        setUser();
                    }
                })
                .catch(() => {
                    setUser();
                });
        } else {
            setUser();
        }
    };

    const logout = () => {
        auth.logout().then((data) => {
            getUser();
        }).catch((error) => {
            console.log(error);
        })
    }

    const providerState = {
        user,
        setUser,
        getAllData: getAllData,
        getUser: getUser,
        logout: logout,
    };
    return (
        <AppContext.Provider value={providerState}>{children}</AppContext.Provider>
    );
};
