import React, { useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Mail, Pen, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import AppliedJobTable from "../cards/appliedjobstable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";

import getAllAppliedJob from "@/hooks/usegetAllAppliedJob";

const ViewProfile = () => {
  getAllAppliedJob();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-white to-gray-100 shadow-lg rounded-2xl my-10 p-8 transition-transform transform hover:scale-105">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-28 w-28 border-4 border-purple-600 shadow-lg">
            <AvatarImage
              src={
                user?.profile?.profilePhoto || "https://via.placeholder.com/150"
              }
              className="rounded-full"
            />
          </Avatar>
          <div>
            <h1 className="font-semibold text-2xl text-gray-800">
              {user.fullname}
            </h1>
            <p className="text-gray-600">{user.profile.bio}</p>
          </div>
        </div>
        <Button
          onClick={() => setOpen(true)}
          className="text-right text-purple-600 border border-purple-600 hover:bg-purple-600 hover:text-white transition duration-300"
          variant="outline"
        >
          <Pen className="mr-1" /> Edit Profile
        </Button>
      </div>

      <div className="flex flex-col space-y-4 mb-5">
        <span className="flex items-center gap-2 text-gray-700">
          <Mail className="text-purple-600" /> {user.email}
        </span>
        <span className="flex items-center gap-2 text-gray-700">
          <Phone className="text-purple-600" /> {user.phone}
        </span>
      </div>

      <div className="my-5">
        <h1 className="font-semibold text-lg text-gray-800 mb-2">Skills</h1>
        <div className="flex flex-wrap gap-2">
          {user.profile.skills.length === 0 ? (
            <span className="text-gray-500">NA</span>
          ) : (
            user.profile.skills.map((item, ind) => (
              <Badge
                key={ind}
                className="bg-purple-200 text-purple-800 border border-purple-300"
              >
                {item}
              </Badge>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-col mb-5">
        <Label className="text-md font-bold">Resume</Label>
        {user.profile.resume ? (
          <a
            className="text-purple-600 hover:underline transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
            href={user.profile.resume}
          >
            {user.profile.resumeOriginalName}
          </a>
        ) : (
          <span className="text-gray-500">NA</span>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg border border-gray-300 p-4">
        <h1 className="font-bold text-xl text-center my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default ViewProfile;
