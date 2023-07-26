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
  getAllUsers,
  clearErrors,
  deleteUser,
} from "../../../actions/userAction";
import { DELETE_USER_RESET } from "../../../constants/userConstant";

const UserList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, message]);

  const columns = [
    {
      field: "id",
      headerName: "User Id ",
      minWidth: 180,
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "role",
      headerName: "Role",

      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.role === "admin" ? "greenColor" : "redColor"
      }
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
            <Link to={`/admin/user/${params.row.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteUserHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        email: item.email,
        role: item.role,
        name: item.name,
      });
    });
  return (
    <Fragment>
      <MetaData title={`ALL USERS - ADMIN`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>
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

export default UserList;
