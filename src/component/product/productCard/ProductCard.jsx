import React from "react";
import { Link } from "react-router-dom";

import "./style.css";
import { styled } from "@mui/material/styles";
import { Rating } from "@mui/material";

const StyledRating = styled(Rating)({
  color: "tomato",
 
});

const ProductCard = ({ product }) => {
  const options = {

    size: "small",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <StyledRating {...options} />{" "}
        <span className="productCard-span">({`${product.numOfReview} Review`})</span>
      </div>
      <span>{`₹ ${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
