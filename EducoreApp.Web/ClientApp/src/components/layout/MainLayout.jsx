import React, { useEffect, useState } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Loading from "../common/Loading";
import HomePageTwo from "../pages/homeTwo/HomePageTwo";
function MainLayout() {
  const [load, setLoad] = useState(false);

  return (
    <>
      {load ? (
        <Loading />
      ) : (
        <>
          <Header />
          <HomePageTwo />
          <Footer className="footer-area mt-110" />
        </>
      )}
    </>
  );
}

export default MainLayout;
