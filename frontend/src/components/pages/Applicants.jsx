import React, { useEffect } from "react";
import ApplicantsTable from "../cards/ApplicantsTable";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { APP_API_ENDPOINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APP_API_ENDPOINT}/getApplicants/${params.id}/applicants`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data);
        dispatch(setAllApplicants(res.data.job));
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      }
    };
    fetchAllApplicants();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="font-bold text-xl my-5">
        Applicants ({applicants.applications.length})
      </h1>
      <ApplicantsTable />
    </div>
  );
};

export default Applicants;
