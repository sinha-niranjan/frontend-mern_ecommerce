import React, { Fragment, useState, useEffect } from "react";
import "./style.css";
import Loader from "../../layout/loader/Loader";
import MetaData from "../../layout/metaData/MetaData";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import { useDispatch, useSelector } from "react-redux";

import { forgotPassword } from "../../../actions/userAction";
import { useAlert } from "react-alert";
import { CLEAR_ERRORS } from "../../../constants/userConstant";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({
        type: CLEAR_ERRORS,
      });
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Profile</h2>
              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
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

export default ForgotPassword;
