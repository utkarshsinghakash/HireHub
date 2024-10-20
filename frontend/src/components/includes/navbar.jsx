import React from "react";

import { FaHome, FaBriefcase, FaUser } from "react-icons/fa"; // Example icons
import "./navbar.css";
import { useSelector } from "react-redux";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    console.log("1");
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        {/* Logo Section */}
        <div className="text-white text-2xl font-bold">
          <Link to="/">HireHub</Link>
        </div>

        {/* Centered Navigation Links */}
        <div className="flex-grow flex justify-center">
          <ul className="flex space-x-8 text-white">
            {user && user.role === "recruiter" ? (
              <>
                <Link
                  to="/admin/companies"
                  className="transition duration-300 hover:text-gray-200 flex items-center"
                >
                  <FaHome className="mr-2" /> Companies
                </Link>
                <Link
                  to="/admin/jobs"
                  className="transition duration-300 hover:text-gray-200 flex items-center"
                >
                  <FaHome className="mr-2" /> Jobs
                </Link>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="transition duration-300 hover:text-gray-200 flex items-center"
                  >
                    <FaHome className="mr-2" /> Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="transition duration-300 hover:text-gray-200 flex items-center"
                  >
                    <FaBriefcase className="mr-2" /> Jobs
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {!user ? (
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="bg-white text-purple-600 rounded-full px-6 py-2 transition duration-300 hover:bg-purple-600 hover:text-white shadow-md"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-purple-600 rounded-full px-6 py-2 transition duration-300 hover:bg-purple-600 hover:text-white shadow-md"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="">
                <div className="flex gap-2 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  {user && user.role === "candidate" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}

                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
