import React, { Fragment, useState, useEffect } from "react";
import "./style.css";
import Loader from "../../layout/loader/Loader";
import MetaData from "../../layout/metaData/MetaData";

import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updatePassword } from "../../../actions/userAction";
import { useAlert } from "react-alert";
import {
  CLEAR_ERRORS,
  UPDATE_PASSWORD_RESET,
} from "../../../constants/userConstant";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPasswordType, setOldPasswordType] = useState("password");
  const [newPasswordType, setNewPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({
        type: CLEAR_ERRORS,
      });
    }

    if (isUpdated) {
      alert.success("Password Updated Successfully");

      navigate("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, isUpdated, navigate]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>
              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="password">
                  <VpnKeyIcon />

                  <input
                    type={oldPasswordType}
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <VisibilityOffIcon
                    className={
                      oldPasswordType === "password" ? "loginEye" : "hidden"
                    }
                    onClick={() => setOldPasswordType("text")}
                  />
                  <VisibilityIcon
                    className={
                      oldPasswordType === "text" ? "loginEye" : "hidden"
                    }
                    onClick={() => setOldPasswordType("password")}
                  />
                </div>

                <div className="password">
                  <LockOpenIcon />

                  <input
                    type={newPasswordType}
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <VisibilityOffIcon
                    className={
                      newPasswordType === "password" ? "loginEye" : "hidden"
                    }
                    onClick={() => setNewPasswordType("text")}
                  />
                  <VisibilityIcon
                    className={
                      newPasswordType === "text" ? "loginEye" : "hidden"
                    }
                    onClick={() => setNewPasswordType("password")}
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
                  value="Change"
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

export default UpdatePassword;
