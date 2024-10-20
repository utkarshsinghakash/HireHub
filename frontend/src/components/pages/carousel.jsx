import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setsearchQuery } from "@/redux/jobSlice";
import frontend from "@/assets/frontend.jpeg";
import backend from "@/assets/backend.jpeg";
import datascience from "@/assets/datascience.jpeg";
import graphic from "@/assets/graphic.jpeg";
import fullstack from "@/assets/fullstack.jpeg";

const categories = [
  { name: "Frontend Developer", image: frontend },
  { name: "Backend Developer", image: backend },
  { name: "Data Science", image: datascience },
  { name: "Graphic Designer", image: graphic },
  { name: "FullStack Developer", image: fullstack },
];

const CarouselComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (cat) => {
    dispatch(setsearchQuery(cat));
    navigate("/browse");
  };

  return (
    <div className="my-20">
      <h2 className="text-3xl font-bold text-center mb-8">
        Explore Job Categories
      </h2>
      <Carousel className="w-full max-w-xl mx-auto">
        <CarouselContent>
          {categories.map((cat) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={cat.name}>
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-40 object-cover"
                />
                <Button
                  onClick={() => submitHandler(cat.name)}
                  className="absolute bottom-2 left-1/2 transform -translate-x-1/2 rounded-full bg-[#6A38C2] text-white hover:bg-[#5A2BA0] transition duration-300"
                >
                  {cat.name}
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
