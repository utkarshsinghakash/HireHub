import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "../cards/companiesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompany from "@/hooks/useGetAllCompany";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const AdminCompanies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useGetAllCompany();
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 bg-gradient-to-r from-gray-100 to-white rounded-lg shadow-2xl transition-all duration-500 hover:shadow-3xl">
      <div className="flex items-center justify-between my-5">
        <Input
          className="w-fit transition-transform transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
          placeholder="Filter by Name"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-600 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          onClick={() => navigate("/admin/companies/create")}
        >
          + New Company
        </Button>
      </div>
      <CompaniesTable />
    </div>
  );
};

export default AdminCompanies;
