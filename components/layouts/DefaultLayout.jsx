import React from "react";
import Image from "next/image";
import Head from "./modules/Head";
import { BackTop } from "antd";
const DefaultLayout = ({ children }) => (
  <div className="layout--default">
    <Head />
    {children}
    <div id="new-loader">
      <div className="wrapper">
        <div className="container">
          <span className="circle"></span>
          <span className="circle"></span>
          <span className="circle"></span>
          <span className="circle"></span>
        </div>
      </div>
    </div>
    <BackTop>
      <button className="ps-btn--backtop">
        <i className="icon-arrow-up"></i>
      </button>
    </BackTop>
  </div>
);

export default DefaultLayout;
