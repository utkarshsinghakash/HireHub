import React, { useEffect } from "react";
import { COMPANY_API_ENDPOINT, JOB_API_ENDPOINT } from "../utils/constant.js";

import { useDispatch } from "react-redux";
import axios from "axios";

import { setSingleJob } from "@/redux/jobSlice.js";

const usegetJobById = (jobId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchJob();
  }, [jobId, dispatch]);
};

export default usegetJobById;
