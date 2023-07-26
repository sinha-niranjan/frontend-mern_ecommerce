import React, { Fragment, useEffect } from "react";
import "./style.css";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  getAdminProduct,
  deleteProduct,
  clearErrors,
} from "../../../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../../layout/metaData/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../sidebar/Sidebar";
import { DELETE_PRODUCT_RESET } from "../../../constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
      alert.success("Product is deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  const columns = [
    {
      field: "id",
      headerName: "Product Id ",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 150,
      flex: 0.1,
    },
    {
      field: "price",
      headerName: "Price",
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
            <Link to={`/admin/product/${params.row.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteProductHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item, index) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });
  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - ADMIN`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
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

export default ProductList;
