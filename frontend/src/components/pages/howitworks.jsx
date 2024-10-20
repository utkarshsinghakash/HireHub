import React from "react";
import { Fade } from "react-awesome-reveal"; // Import for animation effects
import { Search, CheckCircle, UserPlus } from "lucide-react"; // Importing icons from lucide-react

const HowItWorks = () => {
  return (
    <section className="my-20 bg-gray-100 p-10 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold text-center mb-10 text-[#6A38C2]">
        How It Works
      </h2>
      <div className="flex flex-col md:flex-row justify-around items-center">
        <Fade direction="up" cascade triggerOnce>
          {/* Step 1 */}
          <div className="flex flex-col items-center p-6 m-4 bg-white rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-105">
            <div className="flex items-center justify-center w-20 h-20 bg-[#6A38C2] rounded-full mb-4">
              <Search className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">1. Search</h3>
            <p className="text-gray-700 text-center mt-2">
              Use our powerful search tools to find job openings that match your
              skills.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center p-6 m-4 bg-white rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-105">
            <div className="flex items-center justify-center w-20 h-20 bg-[#6A38C2] rounded-full mb-4">
              <UserPlus className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">2. Apply</h3>
            <p className="text-gray-700 text-center mt-2">
              Submit your application directly through our platform with ease.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center p-6 m-4 bg-white rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-105">
            <div className="flex items-center justify-center w-20 h-20 bg-[#6A38C2] rounded-full mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">
              3. Get Hired
            </h3>
            <p className="text-gray-700 text-center mt-2">
              Connect with potential employers and get hired for your dream job.
            </p>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default HowItWorks;
