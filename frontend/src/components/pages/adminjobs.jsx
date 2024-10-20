import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { useDispatch } from "react-redux";
import { setSearchJobByText } from "@/redux/jobSlice";
import AdminJobTable from "../cards/adminJobTable";

const AdminJobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useGetAllAdminJobs();
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="max-w-7xl mx-auto my-10 px-6 py-8 bg-white shadow-2xl rounded-xl relative bg-opacity-70 backdrop-filter backdrop-blur-lg border border-gray-200">
      <div className="flex items-center justify-between my-5">
        <Input
          className="w-80 py-3 px-5 rounded-full shadow-lg bg-white bg-opacity-70 focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-300 placeholder-gray-500"
          placeholder="Filter by Job Title or Company Name"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          onClick={() => navigate("/admin/jobs/create")}
          className="py-3 px-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-full shadow-xl hover:scale-105 transition-transform duration-300"
        >
          New Job
        </Button>
      </div>
      <AdminJobTable />
    </div>
  );
};

export default AdminJobs;
