import { useState } from "react";
import Navbar from "./components/includes/navbar";
import Login from "./components/authorization/login";
import Signup from "./components/authorization/signup";
import Home from "./components/pages/home";
import Job from "./components/pages/jobs";
import Browse from "./components/pages/browse";
import Profile from "./components/pages/viewprofile";
import Companies from "./components/pages/admincompanies";
import AdminJobs from "./components/pages/adminjobs";
import Footer from "./components/includes/footer";
import Jobdescription from "./components/pages/jobdescription";
import CompanyCreate from "../src/components/pages/companiescreate";
import CompanySetup from "../src/components/pages/companySetup";
import JobCreate from "../src/components/pages/adminJobcreate";
import Applicants from "./components/pages/Applicants";
import EditAdminJobs from "./components/pages/editAdminJobs";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/pages/protectedroutes";


import "./App.css";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/jobs" element={<Job />} />
            <Route path="/description/:id" element={<Jobdescription />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/admin/companies"
              element={
                <ProtectedRoute>
                  <Companies />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/companies/create"
              element={
                <ProtectedRoute>
                  <CompanyCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/company/:id"
              element={
                <ProtectedRoute>
                  <CompanySetup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/jobs"
              element={
                <ProtectedRoute>
                  <AdminJobs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/jobs/:id"
              element={
                <ProtectedRoute>
                  <EditAdminJobs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/jobs/create"
              element={
                <ProtectedRoute>
                  <JobCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/jobs/:id/applicants"
              element={
                <ProtectedRoute>
                  <Applicants />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
