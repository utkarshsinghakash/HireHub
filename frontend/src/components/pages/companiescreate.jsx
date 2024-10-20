import React, { useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setSingleCompany } from "@/redux/companySlice";

const companiescreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let [companyName, setCompanyName] = useState();

  const registerCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res.data.company._id;
        console.log(companyId);
        navigate(`/admin/company/${companyId}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="my-10">
        <h1 className="font-bold text-2xl">Company Name</h1>
        <p>
          what name would you like to give to your company? You can change this
          later
        </p>
      </div>
      <Label>Company Name</Label>
      <Input
        type="text"
        className="my-2"
        placeholder="Enter Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <div className="flex items-center gap-2 my-5">
        <Button variant="outline" onClick={() => navigate("/admin/companies")}>
          Cancel
        </Button>
        <Button onClick={registerCompany}>Continue</Button>
      </div>
    </div>
  );
};

export default companiescreate;
