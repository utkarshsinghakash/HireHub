import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  JOB_API_ENDPOINT,
  COMPANY_API_ENDPOINT,
  APP_API_ENDPOINT,
} from "@/utils/constant";
import { setcompany, setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  AiOutlineCalendar,
  AiOutlineDollar,
  AiOutlineEnvironment,
  AiOutlineTeam,
} from "react-icons/ai"; // Import icons

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const { company, singleJob } = useSelector((store) => store.job);
  const companyId = singleJob?.company;
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const date = new Date(singleJob?.createdAt).toLocaleDateString();

  let isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  let [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APP_API_ENDPOINT}/applyjob/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user._id
            )
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_ENDPOINT}/get/${companyId}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setcompany(res.data.company));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchCompany();
  }, [companyId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12 my-10 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">{company?.name}</h1>
          <div className="flex items-center gap-4 mt-2">
            <Badge
              className="bg-blue-100 text-blue-700 font-bold"
              variant="ghost"
            >
              {singleJob?.position} Positions
            </Badge>
            <Badge
              className="bg-red-100 text-red-700 font-bold"
              variant="ghost"
            >
              {singleJob?.jobType}
            </Badge>
            <Badge
              className="bg-purple-100 text-purple-700 font-bold"
              variant="ghost"
            >
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        {user && (
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg px-6 py-3 font-semibold text-white ${
              isApplied
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-lg font-semibold border-b pb-2 mb-4">
            Job Details
          </h2>
          <p className="text-sm text-gray-600 flex items-center mb-2">
            <AiOutlineEnvironment className="mr-2" /> Location:
            <span className="font-medium pl-2">{singleJob?.location}</span>
          </p>
          <p className="text-sm text-gray-600 flex items-center mb-2">
            <AiOutlineCalendar className="mr-2" /> Posted On:
            <span className="font-medium pl-2">{date}</span>
          </p>
          <p className="text-sm text-gray-600 flex items-center mb-2">
            <AiOutlineDollar className="mr-2" /> Salary:
            <span className="font-medium pl-2">{singleJob?.salary} LPA</span>
          </p>
          <p className="text-sm text-gray-600 flex items-center mb-2">
            <AiOutlineTeam className="mr-2" /> Total Applications:
            <span className="font-medium pl-2">
              {singleJob?.applications?.length}
            </span>
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold border-b pb-2 mb-4">
            Job Description
          </h2>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Role: </strong>
            {singleJob?.title}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Experience: </strong>
            {singleJob?.experience} years
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Description: </strong>
            {singleJob?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
