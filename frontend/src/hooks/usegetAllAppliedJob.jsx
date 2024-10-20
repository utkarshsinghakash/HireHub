import { APP_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { React, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setuserAllAppliedJob } from "@/redux/jobSlice";

const getAllAppliedJob = () => {
  console.log("1");
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("2");
    const fetchAllAppliedJob = async () => {
      try {
        const res = await axios.get(`${APP_API_ENDPOINT}/getappliedjobs`, {
          withCredentials: true,
        });
        console.log(res.data);
        if (res.data.success) {
          dispatch(setuserAllAppliedJob(res.data.applications));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllAppliedJob();
  }, [dispatch]);
};

export default getAllAppliedJob;
