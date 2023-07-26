import React from 'react'
import "./style.css"
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Avatar, Button, Typography } from '@mui/material';

const About = () => {
    const visitInstagram = () => {
        window.location = "https://www.instagram.com/sinha_niranjankumar/";
      };
  return (
    <div className="aboutSection">
    <div></div>
    <div className="aboutSectionGradient"></div>
    <div className="aboutSectionContainer">
      <Typography component="h1">About Us</Typography>

      <div>
        <div>
          <Avatar
            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
            src=""
            alt="Founder"
          />
          <Typography>Niranjan Kumar </Typography>
          <Button onClick={visitInstagram} color="primary">
            Visit Instagram
          </Button>
          <span>
            This is a sample wesbite made by @sinha_niranjan. Only with the
            purpose to teach MERN Stack on the channel 6 Pack Programmer
          </span>
        </div>
        <div className="aboutSectionContainer2">
          <Typography component="h2">Our Brands</Typography>
          <a
            href=" "
            target="blank"
          >
            <YouTubeIcon className="youtubeSvgIcon" />
          </a>

          <a href="https://instagram.com/sinha_niranjankumar" target="blank">
            <InstagramIcon className="instagramSvgIcon" />
          </a>
        </div>
      </div>
    </div>
  </div>
  )
}

export default About
