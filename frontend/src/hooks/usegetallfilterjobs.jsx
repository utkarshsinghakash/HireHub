import React, { useEffect } from "react";
import { JOB_API_ENDPOINT } from "../utils/constant.js";
import { setallfiterJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const useGetAllfilterJobs = () => {
  const dispatch = useDispatch();
  //   const { searchQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllfilterJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/getAll`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setallfiterJob(res.data.jobs));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllfilterJobs();
  }, []);
};

export default useGetAllfilterJobs;
