import React, { Fragment, useRef, useState, useEffect } from "react";
import "./style.css";
import Loader from "../../layout/loader/Loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useDispatch, useSelector } from "react-redux";

import { login, register } from "../../../actions/userAction";
import { useAlert } from "react-alert";
import { CLEAR_ERRORS } from "../../../constants/userConstant";
import MetaData from "../../layout/metaData/MetaData";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginPasswordType, setLoginPasswordType] = useState("password");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/profile.jpeg");
  const [signUpPasswordType, setSignUpPasswordType] = useState("password");

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({
        type: CLEAR_ERRORS,
      });
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, redirect, isAuthenticated, navigate]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }

    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Login" />
          <div className="LoginSignUpForm">
            <div className="LoginSignUpContainer">
              <div className="LoginSignUpBox">
                <div>
                  <div className="login_signUp_toggle">
                    <p onClick={(e) => switchTabs(e, "login")}> LOGIN</p>
                    <p onClick={(e) => switchTabs(e, "register")}> REGISTER</p>
                  </div>
                  <button ref={switcherTab}> </button>
                </div>
                <form
                  className="loginForm"
                  ref={loginTab}
                  onSubmit={loginSubmit}
                >
                  <div className="loginEmail">
                    <MailOutlineIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                  <div className="password">
                    <LockOpenIcon />

                    <input
                      type={loginPasswordType}
                      placeholder="Password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <VisibilityOffIcon
                      className={
                        loginPasswordType === "password" ? "loginEye" : "hidden"
                      }
                      onClick={() => setLoginPasswordType("text")}
                    />
                    <VisibilityIcon
                      className={
                        loginPasswordType === "text" ? "loginEye" : "hidden"
                      }
                      onClick={() => setLoginPasswordType("password")}
                    />
                  </div>
                  <Link to="/password/forgot"> Forgot Password ?</Link>
                  <input type="submit" value="Login" className="loginBtn" />
                </form>
                <form
                  className="signUpForm"
                  ref={registerTab}
                  encType="multipart/form-data"
                  onSubmit={registerSubmit}
                >
                  <div className="signUpName">
                    <FaceIcon />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={name}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="signUpEmail">
                    <MailOutlineIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="signUpPassword">
                    <LockOpenIcon />
                    <input
                      type={signUpPasswordType}
                      placeholder="Password"
                      required
                      name="password"
                      value={password}
                      onChange={registerDataChange}
                    />
                    <VisibilityOffIcon
                      className={
                        signUpPasswordType === "password"
                          ? "loginEye"
                          : "hidden"
                      }
                      onClick={() => setSignUpPasswordType("text")}
                    />
                    <VisibilityIcon
                      className={
                        signUpPasswordType === "text" ? "loginEye" : "hidden"
                      }
                      onClick={() => setSignUpPasswordType("password")}
                    />
                  </div>
                  <div id="registerImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input
                      type="file"
                      name="avatar"
                      accept="image/"
                      onChange={registerDataChange}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Register"
                    className="signUpBtn"
                    //   disabled={loading ? true : false}
                  />
                </form>
              </div>
            </div>
          </div>{" "}
        </>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
