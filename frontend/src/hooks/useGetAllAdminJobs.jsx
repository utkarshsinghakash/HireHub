import React, { useEffect } from "react";
import { JOB_API_ENDPOINT } from "../utils/constant.js";
import { setAllAdminJobs, setAllJobs } from "@/redux/jobSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/getadminjobs`, {
          withCredentials: true,
        });
       
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllAdminJobs();
  }, []);
};

export default useGetAllAdminJobs;
