import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import usegetJobById from "@/hooks/usegetJobById";
import { setAllAdminJobs, setSingleJob } from "@/redux/jobSlice";

const EditJobdetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;
  usegetJobById(jobId);

  const { singleJob } = useSelector((store) => store.job);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: 0,
    location: "",
    jobType: "",
    experience: 0,
    position: 0,
  });
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Update the job
      const res = await axios.put(
        `${JOB_API_ENDPOINT}/update/${jobId}`,
        input, // Send input directly since we're not using FormData anymore
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        // Fetch the updated job data
        const updatedJobRes = await axios.get(
          `${JOB_API_ENDPOINT}/get/${jobId}`,
          {
            withCredentials: true,
          }
        );

        if (updatedJobRes.data.success) {
          dispatch(setSingleJob(updatedJobRes.data.job));

          // Also fetch and update the admin jobs list
          const adminJobsRes = await axios.get(
            `${JOB_API_ENDPOINT}/getadminjobs`,
            {
              withCredentials: true,
            }
          );

          if (adminJobsRes.data.success) {
            dispatch(setAllAdminJobs(adminJobsRes.data.jobs));
          }

          toast.success("Job updated successfully");
          navigate("/admin/jobs");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Error updating job");
    } finally {
      setLoading(false);
    }
  };
  console.log(singleJob);

  // Update input when singleJob changes
  useEffect(() => {
    if (singleJob) {
      setInput({
        title: singleJob.title || "",
        description: singleJob.description || "",
        requirements: singleJob.requirements || "",
        salary: singleJob.salary || 0,
        location: singleJob.location || "",
        jobType: singleJob.jobType || "",
        experience: singleJob.experience || 0,
        position: singleJob.position || 0,
      });
    }
  }, [singleJob]);
  return (
    <div className="flex items-center justify-center w-screen my-5">
      <form
        onSubmit={submitHandler}
        className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
      >
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={input.title}
              onChange={changeEventHandler}
              className="focus-visible-ring-offset-0 focus-visible:ring-0-my-1"
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              className="focus-visible-ring-offset-0 focus-visible:ring-0-my-1"
            />
          </div>

          <div>
            <Label>Requirements</Label>
            <Input
              type="text"
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler}
              className="focus-visible-ring-offset-0 focus-visible:ring-0-my-1"
            />
          </div>
          <div>
            <Label>Salary</Label>
            <Input
              type="number"
              name="salary"
              value={input.salary}
              onChange={changeEventHandler}
              className="focus-visible-ring-offset-0 focus-visible:ring-0-my-1"
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              className="focus-visible-ring-offset-0 focus-visible:ring-0-my-1"
            />
          </div>
          <div>
            <Label>Job Type</Label>
            <Input
              type="text"
              name="jobType"
              value={input.jobType}
              onChange={changeEventHandler}
              className="focus-visible-ring-offset-0 focus-visible:ring-0-my-1"
            />
          </div>
          <div>
            <Label>Experience Level</Label>
            <Input
              type="number"
              name="experience"
              value={input.experience}
              onChange={changeEventHandler}
              className="focus-visible-ring-offset-0 focus-visible:ring-0-my-1 mb-2"
            />
          </div>
          <div>
            <Label>No of Position</Label>
            <Input
              type="number"
              name="position"
              value={input.position}
              onChange={changeEventHandler}
              className="focus-visible-ring-offset-0 focus-visible:ring-0-my-1 mb-2"
            />
          </div>
        </div>

        {loading ? (
          <Button className="w-full my-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit" className="w-full my-4">
            Update Job Details
          </Button>
        )}
      </form>
    </div>
  );
};

export default EditJobdetails;
