import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar.jsx";
import Intro from "./components/intro.jsx";
import FooterNew from "./components/footernew.jsx";
import Archive from "./components/archive.jsx";
import LatestPosts from "./components/latestposts.jsx";
// Assuming Intro is a component that provides an introduction or welcome message
const Start = () => {
  return (
    <>
      <Navbar />
      <Intro />
      <Archive />
      <LatestPosts />
      <FooterNew />
    </>
  );
};

export default Start;
