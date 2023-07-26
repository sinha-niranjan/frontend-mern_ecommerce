import React, { Fragment, useEffect, useState } from "react";
import "./style.css";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteReviews,
  clearErrors,
  getProductReviews,
} from "../../../actions/productAction";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../../layout/metaData/MetaData";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../sidebar/Sidebar";
import { DELETE_REVIEW_RESET } from "../../../constants/productConstants";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.reviews
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId,productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getProductReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getProductReviews(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review is deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, productId]);

  const columns = [
    {
      field: "id",
      headerName: "Review Id ",
      minWidth: 200,
      flex: 0.5,
    },

    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.row.rating >= 3 ? "greenColor" : "redColor";
      },
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
            <Button onClick={() => deleteReviewHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        name: item.name,
      });
    });
  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - ADMIN`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1>ALL REVIEWS</h1>
            <div>
              <StarIcon />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableRowSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading"> No Reviews Found </h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
