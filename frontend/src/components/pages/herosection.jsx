import { Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setsearchQuery } from "@/redux/jobSlice";
import Slider from "react-slick";
import heroImage from "@/assets/HeroImage.avif"; // Ensure this path is correct
import heroImage2 from "@/assets/HeroImage2.avif"; // Ensure this path is correct
import heroImage3 from "@/assets/HeroImage4.avif"; // Ensure this path is correct
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./herosection.css";

const HeroSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const submitHandler = () => {
    dispatch(setsearchQuery(query));
    navigate("/browse");
  };

  // Slider settings
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <SampleNextArrow />, // Custom Next Arrow Component
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="relative">
      <Slider {...settings} className="h-screen">
        <div className="relative h-screen">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <span className="mx-auto px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-md">
                  No. 1 Job Hunt Website
                </span>
                <h1 className="text-5xl font-extrabold mt-5 mb-4">
                  Search, Apply & <br />
                  Get Your <span className="text-[#6A38C2]">Dream Job</span>
                </h1>
                <p className="text-lg mb-6">
                  Your one-stop destination for the best job opportunities in
                  the industry.
                </p>
                <div className="flex w-full max-w-md mx-auto shadow-lg border border-gray-300 rounded-full overflow-hidden">
                  <input
                    type="text"
                    placeholder="Find your dream jobs"
                    className="outline-none border-none w-full py-2 px-4 text-black"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <Button
                    onClick={submitHandler}
                    className="bg-[#6A38C2] text-white rounded-right px-6"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-screen">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage2})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <span className="mx-auto px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-md">
                  No. 1 Job Hunt Website
                </span>
                <h1 className="text-5xl font-extrabold mt-5 mb-4">
                  Discover Your Next Opportunity
                </h1>
                <p className="text-lg mb-6">
                  Explore a world of job possibilities tailored just for you.
                </p>
                <div className="flex w-full max-w-md mx-auto shadow-lg border border-gray-300 rounded-full overflow-hidden">
                  <input
                    type="text"
                    placeholder="Find your dream jobs"
                    className="outline-none border-none w-full py-2 px-4 text-black"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <Button
                    onClick={submitHandler}
                    className="bg-[#6A38C2] text-white rounded-right px-6"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-screen">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage3})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <span className="mx-auto px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-md">
                  No. 1 Job Hunt Website
                </span>
                <h1 className="text-5xl font-extrabold mt-5 mb-4">
                  Take the Next Step in Your Career
                </h1>
                <p className="text-lg mb-6">
                  Find the perfect job that matches your skills and passion.
                </p>
                <div className="flex w-full max-w-md mx-auto shadow-lg border border-gray-300 rounded-full overflow-hidden">
                  <input
                    type="text"
                    placeholder="Find your dream jobs"
                    className="outline-none border-none w-full py-2 px-4 text-black"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <Button
                    onClick={submitHandler}
                    className="bg-[#6A38C2] text-white rounded-right px-6"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow next-arrow`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow prev-arrow`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

export default HeroSection;
