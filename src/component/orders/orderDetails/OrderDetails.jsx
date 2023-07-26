import React, { Fragment, useEffect } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../layout/metaData/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { getOrderDetails, clearErrors } from "../../../actions/orderAction";
import Loader from "../../layout/loader/Loader";
import { useAlert } from "react-alert";

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, alert, id]);

  return (
    <Fragment>
      {" "}
      {loading ? (
        <Loader />
      ) : (
        <div className="orderDetails">
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography> Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name : </p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone : </p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>

                <div>
                  <p>Address : </p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address} , ${order.shippingInfo.city} , ${order.shippingInfo.state} , ${order.shippingInfo.pinCode} , ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography> Payment </Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}{" "}
                  </p>
                </div>
                <div>
                  <p>Amount</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography> Order Status </Typography>
              <div>
                <p
                  className={
                    order.orderStatus &&
                          order.orderStatus === "processing"
                            ? "redColor"
                            : order.orderStatus === "shipped" ? "yellowColor" : "greenColor"
                  }
                >
                  {order.orderStatus && order.orderStatus}
                </p>
              </div>
            </div>
          </div>
          <div className="orderDetailsCartItems">
            <Typography> Order Items : </Typography>
            <div className="orderDetailsCartItemsContainer">
              {order.orderItems &&
                order.orderItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.Product}`}> {item.name}</Link>
                    <span>
                      {item.quantity} X {item.price}{" "}
                      <b>{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default OrderDetails;
