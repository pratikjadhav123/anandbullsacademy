import React, { useContext, useEffect, useState } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Loading from "../common/Loading";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import GuidePage from "../pages/guide/GuidePage";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AppContext } from "../../plugins/AppContext";
import auth from "../../utils/auth";
import CourseSetting from "../pagesAdmin/courseSetting/CourseSetting";
import VideoSetting from "../pagesAdmin/videoSetting/VideoSetting";
import UserSetting from "../pagesAdmin/userSetting/UserSetting";
function AdminLayout() {
  const [load, setLoad] = useState(false);
  const contextObj = useContext(AppContext);

  const navigate = useHistory()
  useEffect(() => {
    if (auth.getToken()) {
      contextObj.user && contextObj?.user?.Role !== "Admin" && navigate.push("/");
    } else {
      navigate.push("/");
    }
  }, [contextObj.user])

  return (
    <>
      {load ? (
        <Loading />
      ) : (
        <>
          <Header />
          <Switch>
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/Admin/CourseSetting`}
              component={CourseSetting}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/Admin/UserSetting`}
              component={UserSetting}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/Admin/VideoSetting`}
              component={VideoSetting}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/Admin/PayementSetting`}
              component={GuidePage}
            />
          </Switch>
          <Footer className="footer-area mt-110" />
        </>
      )}
    </>
  );
}

export default AdminLayout;
