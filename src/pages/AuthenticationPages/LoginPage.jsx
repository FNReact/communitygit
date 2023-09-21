import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginBody from "../../components/LoginBody/LoginBody";


const LoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let token = sessionStorage.getItem("token");
    // if (token) {
    //   navigate("/");
    // }
  }, []);
  return (
    <Fragment>
      <LoginBody />
    </Fragment>
  );
};

export default LoginPage;
