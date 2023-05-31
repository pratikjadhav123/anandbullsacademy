import React, { useContext, useEffect, useState } from "react";
import Footer from "./common/Footer";
import Header from "./common/Header";
import { AppContext } from "../plugins/AppContext";

function App(props) {
  const contextObj = useContext(AppContext);
  const [user, setUser] = useState()
  useEffect(() => {
    contextObj.user ? setUser(contextObj.user) : contextObj.getAllData();
  }, [])
  console.log("layout",contextObj.user);
  return (
    <>
      <Header />
      {props.children}
      <Footer className="footer-area mt-110" />
    </>
  );
}

export default App;
