import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../utilities/api/auth";
import programme from "../utilities/api/programme";

export const AppContext = createContext();

export const ApplicationDataProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [programmesList, setProgrammesList] = useState([]);
    const getAllData = () => {
        console.log("AppContext");
        getUser();
        getProgrammes();
    };
    const getUser = () => {
        if (auth.getToken()) {
            auth
                .getUser()
                .then((data) => {
                    if (data.Active) {
                        setUser(data);
                    } else {
                        navigate("/auths/auth-login");
                    }
                })
                .catch(() => {
                    navigate("/auths/auth-login");
                });
        } else {
            navigate("/auths/auth-login");
        }
    };
    const getProgrammes = () => {
        programme.list().then((data) => {
            setProgrammesList(data);
        })
    }

    const providerState = {
        user,
        setUser,
        programmesList,
        setProgrammesList,
        getAllData: getAllData,
        getUser: getUser,
    };
    return (
        <AppContext.Provider value={providerState}>{children}</AppContext.Provider>
    );
};
