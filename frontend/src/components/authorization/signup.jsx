import { React, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { USER_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [signupInput, setSignupInput] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setSignupInput({ ...signupInput, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setSignupInput({ ...signupInput, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", signupInput.fullname);
    formData.append("email", signupInput.email);
    formData.append("phone", signupInput.phone);
    formData.append("password", signupInput.password);
    formData.append("role", signupInput.role);
    if (signupInput.file) {
      formData.append("file", signupInput.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(res);
      if (res.data.success) {
        navigate("/login");
        console.log(res.data.message);
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-400 to-blue-500 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full border border-gray-200 transition-transform duration-300 hover:scale-105"
      >
        <h1 className="font-bold text-2xl text-center text-blue-600 mb-6">
          Sign Up
        </h1>

        <div className="my-4">
          <Label>Full Name</Label>
          <Input
            type="text"
            placeholder="Enter your name"
            name="fullname"
            value={signupInput.fullname}
            onChange={changeEventHandler}
            className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>

        <div className="my-4">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={signupInput.email}
            onChange={changeEventHandler}
            className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>

        <div className="my-4">
          <Label>Phone number</Label>
          <Input
            type="tel"
            placeholder="Enter your phone no"
            name="phone"
            value={signupInput.phone}
            onChange={changeEventHandler}
            className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>

        <div className="my-4">
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={signupInput.password}
            onChange={changeEventHandler}
            className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>

        <div className="flex items-center justify-between my-5">
          <RadioGroup className="flex items-center gap-5">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="candidate"
                checked={signupInput.role === "candidate"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="r1">Candidate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={signupInput.role === "recruiter"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="r2">Recruiter</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex items-center gap-2 my-4">
          <Label>Profile Picture</Label>
          <Input
            type="file"
            name="file"
            accept="image/*"
            onChange={changeFileHandler}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        {loading ? (
          <Button className="w-full my-4 flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait...
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full my-4 bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </Button>
        )}

        <span className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link className="text-blue-600 hover:underline" to="/login">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
