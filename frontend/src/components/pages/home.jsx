import React, { useEffect } from "react";
import HeroSection from "./herosection";
import CategoryCarousel from "./carousel.jsx";
import Latestjobs from "./latestjob";
import Footer from "../includes/footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllCompany from "@/hooks/useGetAllCompany";
import { setsearchQuery } from "@/redux/jobSlice";
import useGetAllfilterJobs from "@/hooks/usegetallfilterjobs";
import HowItWorks from "./howitworks";
import FAQs from "./FAQs";
import WhyChooseUs from "./whychooseus";
import getAllAppliedJob from "@/hooks/usegetAllAppliedJob";

const Home = () => {
  useGetAllJobs();
  useGetAllfilterJobs();
  useGetAllCompany();
  getAllAppliedJob();

  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div className="bg-gray-100">
      <HeroSection />
      <CategoryCarousel />
      <Latestjobs />
      <HowItWorks />
      <WhyChooseUs />
      <FAQs />
    </div>
  );
};

export default Home;
