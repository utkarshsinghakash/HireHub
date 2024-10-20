import React, { useEffect } from "react";
import { COMPANY_API_ENDPOINT, JOB_API_ENDPOINT } from "../utils/constant.js";

import { useDispatch } from "react-redux";
import axios from "axios";
import { setSingleCompany } from "@/redux/companySlice.js";

const usegetcompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchcompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_ENDPOINT}/get/${companyId}`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchcompany();
  }, [companyId, dispatch]);
};

export default usegetcompanyById;
