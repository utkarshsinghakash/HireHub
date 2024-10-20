import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AdminJobTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) return true;
        return (
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            ?.toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="rounded-lg bg-opacity-80 bg-white shadow-xl p-6 backdrop-filter backdrop-blur-xl border border-gray-200">
      <Table>
        <TableCaption className="text-lg text-indigo-500 font-semibold mb-6">
          Recently Registered Jobs
        </TableCaption>
        <TableHeader className="bg-indigo-100 p-4 text-gray-600 rounded-t-lg">
          <TableRow>
            <TableHead className="py-3">Company</TableHead>
            <TableHead className="py-3">Role</TableHead>
            <TableHead className="py-3">Date</TableHead>
            <TableHead className="py-3 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.length <= 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500"
            >
              No jobs found.
            </motion.div>
          ) : (
            filterJobs.map((job) => (
              <motion.tr
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                }}
                className="hover:bg-gray-50 transition-all duration-300 rounded-lg"
              >
                <TableCell className="py-4 px-6">
                  {job?.company?.name}
                </TableCell>
                <TableCell className="py-4 px-6">{job?.title}</TableCell>
                <TableCell className="py-4 px-6">
                  {job?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="py-4 px-6 text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer text-gray-600 hover:text-gray-900 transition-all duration-200" />
                    </PopoverTrigger>
                    <PopoverContent className="bg-white shadow-lg rounded-lg p-4">
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}`)}
                        className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded-lg cursor-pointer transition-all duration-200"
                      >
                        <Edit2 className="w-4 text-indigo-500" />
                        <span>Edit</span>
                      </div>
                      <hr className="border-gray-300 my-2" />
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded-lg cursor-pointer transition-all duration-200"
                      >
                        <Eye className="w-4 text-indigo-500" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </motion.tr>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobTable;
