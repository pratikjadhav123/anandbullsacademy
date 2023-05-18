import React, { useEffect, useState } from "react";
import Footer from "../common/Footer";
import Loading from "../common/Loading";
import HomePageTwo from "../pages/homeTwo/HomePageTwo";
import Header from "../common/Header";

function HomeageTowLayout() {
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

export default HomeageTowLayout;
