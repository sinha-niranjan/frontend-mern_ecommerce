import React from "react";
import "./style.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="Order">
      {" "}
      <div className="orderSuccess">
        <CheckCircleIcon />
        <Typography>Your order has been Placed successfully</Typography>
        <Link to="/orders">View Orders</Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
