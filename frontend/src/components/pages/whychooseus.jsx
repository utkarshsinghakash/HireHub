import React from "react";
import { CheckCircle } from "lucide-react"; // Assuming you're using lucide-react for icons

const WhyChooseUs = () => {
  return (
    <section className="my-20 bg-gradient-to-r from-purple-100 to-blue-100 p-10 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h2 className="text-5xl font-bold text-center text-gray-800 mb-10">
        Why Choose Us?
      </h2>
      <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
        {/* Item 1 */}
        <div className="flex items-start space-x-4">
          <CheckCircle className="text-[#6A38C2] w-8 h-8" />
          <p className="text-lg text-gray-700">
            <span className="font-bold">Comprehensive job listings</span>{" "}
            tailored to your needs.
          </p>
        </div>

        {/* Item 2 */}
        <div className="flex items-start space-x-4">
          <CheckCircle className="text-[#6A38C2] w-8 h-8" />
          <p className="text-lg text-gray-700">
            <span className="font-bold">User-friendly interface</span> for both
            job seekers and employers.
          </p>
        </div>

        {/* Item 3 */}
        <div className="flex items-start space-x-4">
          <CheckCircle className="text-[#6A38C2] w-8 h-8" />
          <p className="text-lg text-gray-700">
            <span className="font-bold">Regular updates</span> to ensure you
            have the latest opportunities.
          </p>
        </div>

        {/* Item 4 */}
        <div className="flex items-start space-x-4">
          <CheckCircle className="text-[#6A38C2] w-8 h-8" />
          <p className="text-lg text-gray-700">
            <span className="font-bold">Dedicated customer support</span> to
            assist you at every step.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
