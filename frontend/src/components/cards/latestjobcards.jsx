import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import jobPlaceholder from "@/assets/placeholderjob.svg"; // Placeholder image
import { useSelector } from "react-redux";

const Latestjobcards = ({ job }) => {
  const navigate = useNavigate();
  const { allCompanies } = useSelector((store) => store.company);

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="relative p-6 rounded-lg shadow-2xl bg-white border border-gray-200 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
    >
      {/* Job Image */}
      <div className="h-56 w-full mb-4 overflow-hidden rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110">
        <img
          src={allCompanies?.image || jobPlaceholder}
          alt={job?.title}
          className="object-cover w-full h-full transition-transform duration-300 ease-in-out"
        />
      </div>

      {/* Job Details */}
      <div>
        <h1 className="font-semibold text-lg text-gray-900 hover:text-[#6A38C2] transition duration-300">
          {job?.company?.name}
        </h1>
        <p className="text-sm text-gray-500">{job.location}</p>
      </div>

      {/* Job Title and Description */}
      <div className="mt-4">
        <h2 className="font-bold text-xl text-gray-800 transition duration-300 hover:text-[#6A38C2]">
          {job.title}
        </h2>
        <p className="text-gray-600 text-sm mt-2 line-clamp-3">
          {job.description}
        </p>
      </div>

      {/* Badges for Job Info */}
      <div className="flex items-center gap-3 mt-4">
        <Badge
          className="text-blue-700 font-semibold bg-blue-100 hover:bg-blue-200 transition duration-300"
          variant="ghost"
        >
          {job.position} Positions
        </Badge>
        <Badge
          className="text-[#F83002] font-semibold bg-red-100 hover:bg-red-200 transition duration-300"
          variant="ghost"
        >
          {job.jobType}
        </Badge>
        <Badge
          className="text-[#7209b7] font-semibold bg-purple-100 hover:bg-purple-200 transition duration-300"
          variant="ghost"
        >
          {job.salary} LPA
        </Badge>
      </div>

      {/* Floating badge for featured jobs */}
      {job.isFeatured && (
        <span className="absolute top-2 right-2 bg-yellow-400 text-white text-sm px-3 py-1 rounded-full shadow-md animate-bounce">
          Featured
        </span>
      )}
    </div>
  );
};

export default Latestjobcards;
