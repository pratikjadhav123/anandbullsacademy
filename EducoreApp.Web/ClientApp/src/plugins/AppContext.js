import React, { createContext, useState } from "react";
import auth from "./../utils/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

export const AppContext = createContext();

export const ApplicationDataProvider = ({ children }) => {
    const navigate = useHistory();
    const [user, setUser] = useState();
    const getAllData = () => {
        getUser();
    };
    const getUser = () => {
        console.log("getUser");
        if (auth.getToken()) {
            auth
                .getUser()
                .then((data) => {
                    console.log(data);
                    if (data.Active) {
                        setUser(data);
                    } else {
                        setUser();
                    }
                })
                .catch(() => {
                    console.log("error");
                    setUser();
                });
        } else {
            console.log("not token");
            setUser();
        }
    };

    const logout = () => {
        console.log("abc");
        auth.logout().then((data)=>{
            getUser();
        }).catch((error)=>{
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
