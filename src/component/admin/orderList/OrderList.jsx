import React, { Fragment, useEffect } from "react";
import "./style.css";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../../layout/metaData/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../sidebar/Sidebar";

import {
  getAllOrders,
  clearErrors,
  deleteOrder,
} from "../../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../../constants/orderConstants";

const OrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order is deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_ORDER_RESET });
    }
    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "status",
      headerName: "status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "processing"
          ? "redColor"
          : params.row.status === "shipped"
          ? "yellowColor"
          : "greenColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "action",
      flex: 0.3,
      headerName: "Action",
      minWidth: 150,
      type: "number",
      sortable: "false",
      renderCell: (params) => {
        return (
          <div>
            <Link to={`/admin/order/${params.row.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteOrderHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((order) => {
      rows.push({
        id: order._id,
        status: order.orderStatus,
        itemsQty: order.orderItems.length,
        amount: order.totalPrice,
      });
    });
  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - ADMIN`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableRowSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
