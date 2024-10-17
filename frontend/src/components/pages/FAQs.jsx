import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // For icons

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What types of jobs can I find on HireHub?",
      answer:
        "You can find a wide range of jobs in various sectors, including IT, finance, healthcare, and more.",
    },
    {
      question: "How do I apply for a job?",
      answer:
        "Simply find a job listing that interests you and click on the apply button to submit your application.",
    },
    {
      question: "Is there a fee to use HireHub?",
      answer: "No, the platform is completely free for job seekers.",
    },
  ];

  return (
    <section className="my-20 max-w-4xl mx-auto px-6 lg:px-8">
      <h2 className="text-5xl font-bold text-center text-gray-800 mb-12">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {faqItems.map((faq, index) => (
          <div
            key={index}
            className={`p-6 bg-white rounded-lg shadow-lg transition-transform duration-300 ${
              activeIndex === index ? "transform scale-105" : ""
            }`}
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {faq.question}
              </h3>
              {activeIndex === index ? (
                <ChevronUp className="w-6 h-6 text-gray-600" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-600" />
              )}
            </div>
            {activeIndex === index && (
              <p className="mt-4 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQs;
