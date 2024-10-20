import { Bookmark } from "lucide-react";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Link, useNavigate } from "react-router-dom";

const jobcards = ({ key, job }) => {
  const navigate = useNavigate();
  const date = new Date(job?.createdAt);
  const todayDate = new Date(Date.now());
  const timeDiff = todayDate.getTime() - date.getTime();
  console.log(timeDiff);
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  console.log(days);

  return (
    <div className="p-5 rounded-md shadow-xl bg-white-border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {days == 0 ? (
            <span>Created Today</span>
          ) : (
            <span>{days} days ago</span>
          )}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark></Bookmark>
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" className="p-6" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo}></AvatarImage>
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job._id}`)}
          variant="outline"
        >
          Details
        </Button>

        <Button className="bg-[#7209b7]">Save for later</Button>
      </div>
    </div>
  );
};

export default jobcards;
