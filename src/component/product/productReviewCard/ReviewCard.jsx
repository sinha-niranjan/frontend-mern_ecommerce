import React from "react";
import "./style.css";

import profilePng from "../../../assets/img/profilePng.png";
import { styled } from "@mui/material/styles";
import { Rating } from "@mui/material";

const StyledRating = styled(Rating)({
  color: "tomato",
});

const ReviewCard = ({ review }) => {
  const options = {
    size: "medium",
    value: parseInt(review.rating),
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <StyledRating {...options} />
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
