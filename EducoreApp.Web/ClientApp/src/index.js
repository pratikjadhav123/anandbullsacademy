import React, { useContext, useEffect, useState } from 'react'
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "./components/App";
import HomePageTwoLayout from "./components/layout/HomeageTowLayout";
import About from "./components/pages/about/About";
import Contact from "./components/pages/contact/Contact";
import Error from "./components/pages/error/Error";
import FaqPage from "./components/pages/faq/FaqPage";
import GuidePage from "./components/pages/guide/GuidePage";
import CourseGrid from "./components/pages/courseGrid/CourseGrid";
import SimpleReactLightbox from "simple-react-lightbox";

// import all css
import "./index.css";
import CourseDetails from './components/pages/courseDetails/CourseDetails';
import Profile from './components/pages/profile/Profile';
import Auth from './components/pages/auth/Auth';
import { AppContext, ApplicationDataProvider } from './plugins/AppContext';
import CourseVideo from './components/pages/profile/Video/CourseVideo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePageTwo from './components/pages/homeTwo/HomePageTwo';
import AdminLayout from './components/layout/AdminLayout';
// import "./assets/scss/style.scss";
/*
 * Version :Tourx-pro 0.1
 * Event : Rendering all content to web.
 * Actions: Define all routes and page.
 * @return html
 * */
// default Warning Error hide



function Root() {
  const contextObj = useContext(AppContext);
  const [user, setUser] = useState()
  useEffect(() => {
    contextObj.user ? setUser(contextObj.user) : contextObj.getAllData();
  }, [contextObj.user])
  console.log("root",contextObj.user);
  return (
    <>
      <BrowserRouter basename="/">
        <Switch>
          {/*main layout*/}
          <Route exact path="/" component={HomePageTwoLayout} />
          {/* secound layout */}
          <Route path="/Admin" component={AdminLayout} />
          {/* all inner page load layout component */}
          <Layout>
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/about`}
              component={About}
            />

            {/* all package pages component */}
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/courses`}
              component={CourseGrid}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/course-details/:id`}
              component={CourseDetails}
            />

            {/* all blog pages */}
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guide`}
              component={GuidePage}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/faq`}
              component={FaqPage}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/contact`}
              component={Contact}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/myProfile`}
              component={user ? Profile : HomePageTwo}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/video/:id`}
              component={user ? CourseVideo : HomePageTwo}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/auth/:path`}
              component={Auth}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/error`}
              component={Error}
            />
          </Layout>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default Root
ReactDOM.render(
  <React.StrictMode>
    <ApplicationDataProvider>
      {/* <AppContext> */}
      <ToastContainer />
      <SimpleReactLightbox>
        <Root />
      </SimpleReactLightbox>
      {/* </AppContext> */}
    </ApplicationDataProvider>

  </React.StrictMode>,
  document.getElementById("root")
);
