import React, { Fragment, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
// import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";

import SpeedDialAction from "@mui/material/SpeedDialAction";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { logout } from "../../../actions/userAction";

const UserOptions = ({ user }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);

  const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(0),
      left: theme.spacing(7),
    },
  }));

  const options = [
    {
      icon: <PersonIcon />,
      name: "Profile",
      func: account,
    },
    {
      icon: <AddShoppingCartIcon style={{color:cartItems.length  >0 ? "tomato":"unset"}} />,
      name: `Cart(${cartItems.length})`,
     
      func: cart,
    },
    {
      icon: <ListAltIcon />,
      name: "Orders",
      func: orders,
    },

    {
      icon: <ExitToAppIcon />,
      name: "Logout",
      func: logoutUser,
    },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }

  function account() {
    navigate("/account");
  }

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  function cart() {
    navigate("/cart");
  }

  return (
    <Fragment>
      <StyledSpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/profile.jpeg"}
            alt="Profile"
          />
        }
      >
        {options.map((item, i) => (
          <SpeedDialAction
            key={i}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 1000 ? true : false}
          />
        ))}
      </StyledSpeedDial>
    </Fragment>
  );
};

export default UserOptions;
