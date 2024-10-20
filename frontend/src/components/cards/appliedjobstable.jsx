import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

const appliedjobstable = () => {
  const { userallAppliedJob } = useSelector((store) => store.job);
  console.log(userallAppliedJob);
  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userallAppliedJob.length <= 0 ? (
            <span>No Applied Jobs</span>
          ) : (
          userallAppliedJob.map((appliedjob) => (
            <TableRow key={appliedjob._id}>
              <TableCell>{appliedjob?.createdAt?.split("T")[0]}</TableCell>
              <TableCell>{appliedjob?.job?.title}</TableCell>
              <TableCell>{appliedjob?.job?.company?.name}</TableCell>
              <TableCell className="text-white bg-green text-right">
                <Badge
                  className={`${
                    appliedjob?.status === "pending"
                      ? "bg-gray-400"
                      : appliedjob?.status === "rejected"
                      ? "bg-red-400"
                      : "bg-green-400"
                  }`}
                >
                  {appliedjob?.status}
                </Badge>
              </TableCell>
            </TableRow>
          )))}
        </TableBody>
      </Table>
    </div>
  );
};

export default appliedjobstable;
