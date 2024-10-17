import { APP_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setuserAllAppliedJob } from "@/redux/jobSlice";

const usegetAllAppliedJob = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAppliedJob = async () => {
      try {
        const res = await axios.get(`${APP_API_ENDPOINT}/getappliedjobs`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setuserAllAppliedJob(res.data.application));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllAppliedJob();
  }, []);
};

export default usegetAllAppliedJob;
