import { setAllCompany } from "@/redux/companySlice";
import { COMPANY_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompany = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/getAll`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllCompany(res.data.companies));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCompany();
  }, []);
};

export default useGetAllCompany;
