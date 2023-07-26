import React, { Fragment, useState, useEffect } from "react";
import "./style.css";
import Loader from "../../layout/loader/Loader";
import MetaData from "../../layout/metaData/MetaData";

import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { resetPassword } from "../../../actions/userAction";
import { useAlert } from "react-alert";
import {
  CLEAR_ERRORS,
  UPDATE_PASSWORD_RESET,
} from "../../../constants/userConstant";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const params = useParams();

  const { error, success, loading } = useSelector((state) => state.forgotPassword);

   
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({
        type: CLEAR_ERRORS,
      });
    }

    if (success) {
      alert.success("Password Updated Successfully");

      navigate("/login");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, success, navigate]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>
              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                

                <div className="password">
                  <LockOpenIcon />

                  <input
                    type={passwordType}
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <VisibilityOffIcon
                    className={
                      passwordType === "password" ? "loginEye" : "hidden"
                    }
                    onClick={() => setPasswordType("text")}
                  />
                  <VisibilityIcon
                    className={
                      passwordType === "text" ? "loginEye" : "hidden"
                    }
                    onClick={() => setPasswordType("password")}
                  />
                </div>

                <div className="password">
                  <LockIcon />

                  <input
                    type={confirmPasswordType}
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <VisibilityOffIcon
                    className={
                      confirmPasswordType === "password" ? "loginEye" : "hidden"
                    }
                    onClick={() => setConfirmPasswordType("text")}
                  />
                  <VisibilityIcon
                    className={
                      confirmPasswordType === "text" ? "loginEye" : "hidden"
                    }
                    onClick={() => setConfirmPasswordType("password")}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="signUpBtn"
                  //   disabled={loading ? true : false}
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ResetPassword;
