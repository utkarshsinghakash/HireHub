import React, { useEffect } from "react";
import { JOB_API_ENDPOINT } from "../utils/constant.js";
import { setAllJobs } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/getAll/?keyword=${searchQuery}`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllJobs();
  }, []);
};

export default useGetAllJobs;
