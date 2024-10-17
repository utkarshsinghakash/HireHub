import { React, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // const googlesubmitHandler = (e) => {
  //   e.preventDefault();
  //   window.location.href = `${USER_API_ENDPOINT}/auth/google`;
  //   navigate("/");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
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
        className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full border border-gray-200 transition-transform duration-300 hover:scale-105"
      >
        <h1 className="font-bold text-2xl text-center text-purple-600 mb-6">
          Login
        </h1>

        <div className="my-4">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-purple-500 transition duration-300"
          />
        </div>

        <div className="my-4">
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-purple-500 transition duration-300"
          />
        </div>

        <div className="flex items-center justify-between">
          <RadioGroup className="flex items-center gap-5 my-5">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="candidate"
                checked={input.role === "candidate"}
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
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="r2">Recruiter</Label>
            </div>
          </RadioGroup>
        </div>

        {loading ? (
          <Button className="w-full my-4 flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait...
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full my-2 bg-purple-600 text-white hover:bg-purple-700 transition duration-300"
          >
            Login
          </Button>
        )}
        {/* <Button
          className="w-full my-2 bg-red-600 text-white hover:bg-red-700 transition duration-300"
          onClick={googlesubmitHandler}
        >
          Login with Google
        </Button> */}
        <span className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link className="text-purple-600 hover:underline" to="/signup">
            Sign up
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
