import React, { Fragment, useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../../actions/productAction";
import Loader from "../../layout/loader/Loader";
import ProductCard from "../productCard/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
// import Slider from "@material-ui/core/Slider";
// import { Typography } from "@material-ui/core";

import { Slider } from "@mui/material";
import { Typography } from "@mui/material";
import MetaData from "../../layout/metaData/MetaData";



const categories = [
  "Laptop",
  "Mobile",
  "Footwear",
  "Dress",
  "Shorts",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];



const Products = () => {
  let { keyword } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [key, setKey] = useState(keyword);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 250000]);
  const [category, setCategory] = useState();
  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productCount,
    resultPerPage,
    filteredProductCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setCurrentPage(1);
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    window.scrollTo(0, 0);
    dispatch(getProduct(key, currentPage, price, category, ratings));
  }, [dispatch, key, currentPage, price, category, ratings, error, alert]);

  let count = filteredProductCount;
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="product">
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>{" "}
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={250000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => {
                    setCurrentPage(1);
                    setCategory(category);
                  }}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setCurrentPage(1);
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                min={0}
                max={5}
                valueLabelDisplay="auto"
              />
            </fieldset>

            <button
              className="glow-on-hover"
              onClick={() => {
                setKey("");
                setCurrentPage(1);
                setPrice([0, 250000]);
                setCategory("");
                setRatings(0);
              }}
            >
              {" "}
              Reset{" "}
            </button>
          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Products;
