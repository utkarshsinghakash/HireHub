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
import { Edit2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const CompaniesTable = () => {
  const { allCompanies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setfilterCompany] = useState(allCompanies);

  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      allCompanies.length >= 0 &&
      allCompanies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setfilterCompany(filteredCompany);
  }, [allCompanies, searchCompanyByText]);

  return (
    <div className="overflow-hidden rounded-lg shadow-2xl transition-all duration-500 hover:shadow-3xl">
      <Table className="table-fixed bg-white">
        <TableCaption className="bg-indigo-100 p-4 text-gray-600 rounded-t-lg">
          A list of your recent registered companies
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-indigo-100 p-4 text-gray-600 rounded-t-lg">
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany.length <= 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-8 text-gray-500">
                You haven't registered any companies yet.
              </td>
            </tr>
          ) : (
            filterCompany.map((company) => (
              <TableRow
                key={company._id}
                className="bg-white hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.01] cursor-pointer"
              >
                <TableCell className="p-4">
                  <Avatar className="h-24 w-24 transition-transform transform hover:scale-105 duration-300">
                    <AvatarImage src={company?.logo} />
                  </Avatar>
                </TableCell>
                <TableCell className="p-4 text-gray-700 font-medium">
                  {company?.name}
                </TableCell>
                <TableCell className="p-4 text-gray-500">
                  {new Date(company?.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right p-4">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer text-gray-700 transition-transform transform hover:rotate-90 duration-300" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 p-4 bg-gray-100 rounded-lg shadow-lg transition-opacity duration-300">
                      <div
                        onClick={() =>
                          navigate(`/admin/company/${company._id}`)
                        }
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all duration-300"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
