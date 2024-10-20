import React, { useEffect, useState } from "react";
import FilterCard from "../cards/filtercards";
import JobCard from "../cards/jobcards";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

const Jobs = () => {
  const { allfilterJob, filterQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allfilterJob);
  const dispatch = useDispatch();

  useEffect(() => {
    if (filterQuery) {
      const filteredJobs = allfilterJob.filter((job) => {
        return (
          job.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(filterQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(filterQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allfilterJob);
    }
  }, [allfilterJob, filterQuery]);

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-5">
        <div className="w-1/5">
          <FilterCard />
        </div>
        <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
          {filterJobs.length <= 0 ? (
            <div className="flex justify-center items-center h-full">
              <span className="text-gray-500 text-xl">No Jobs Found</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterJobs.map((job) => (
                <motion.div
                  key={job._id}
                  className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transform transition-transform hover:scale-105"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <JobCard job={job} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
