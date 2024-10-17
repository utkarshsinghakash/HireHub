import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useDispatch } from "react-redux";
import { setfilterQuery } from "@/redux/jobSlice";
import { motion } from "framer-motion"; // For smooth animations

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Noida"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40K", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setfilterQuery(selectedValue));
  }, [selectedValue]);

  return (
    <motion.div
      className="w-full bg-gradient-to-b from-blue-50 to-white shadow-xl p-6 rounded-lg transform hover:scale-105 transition-transform duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="font-bold text-2xl mb-4 text-gray-800">Filter Jobs</h1>
      <hr className="mb-4 border-gray-300" />

      <div className="space-y-6">
        {filterData.map((data, ind) => (
          <div key={ind} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-semibold text-xl mb-2 text-indigo-600">
              {data.filterType}
            </h2>
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
              {data.array.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center space-x-3 my-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RadioGroupItem
                    className="w-5 h-5 rounded-full border-gray-300"
                    value={item}
                  />
                  <Label className="text-gray-700 text-lg cursor-pointer">
                    {item}
                  </Label>
                </motion.div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default FilterCard;
