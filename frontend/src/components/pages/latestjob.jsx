import React from "react";
import Latestjobcards from "../cards/latestjobcards";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "@/redux/jobSlice";
import { Fade } from "react-awesome-reveal"; // For entry animation

const LatestJobs = () => {
  const dispatch = useDispatch();
  const { allJobs } = useSelector((store) => store.job);

  React.useEffect(() => {
    dispatch(setAllJobs(allJobs));
  }, [allJobs]);

  return (
    <div className="max-w-7xl mx-auto my-20 px-4 lg:px-8">
      {/* Title with Background Decoration */}
      <div className="relative text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
        </h1>
        <div className="absolute left-1/2 transform -translate-x-1/2 w-32 h-1 bg-[#6A38C2] rounded-md shadow-lg" />
      </div>

      {/* Job Cards with Animation */}
      <Fade direction="right" distance="10px" cascade damping={0.15}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {allJobs.length <= 0 ? (
            <span className="text-center text-gray-500">
              No Latest Jobs found
            </span>
          ) : (
            allJobs
              .slice(0, 6)
              .map((job) => <Latestjobcards key={job._id} job={job} />)
          )}
        </div>
      </Fade>
    </div>
  );
};

export default LatestJobs;
