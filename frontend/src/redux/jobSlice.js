import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    company: null,
    searchJobByText: "",
    userallAppliedJob: [],

    searchQuery: "",
    allfilterJob: [],
    filterQuery: "",
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setallfiterJob: (state, action) => {
      state.allfilterJob = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setcompany: (state, action) => {
      state.company = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setuserAllAppliedJob: (state, action) => {
      state.userallAppliedJob = action.payload;
    },
    setsearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setfilterQuery: (state, action) => {
      state.filterQuery = action.payload;
    },
  },
});
export const {
  setAllJobs,
  setSingleJob,
  setcompany,
  setAllAdminJobs,
  setSearchJobByText,
  setuserAllAppliedJob,
  setsearchQuery,
  setallfiterJob,

  setfilterQuery,
} = jobSlice.actions;
export default jobSlice.reducer;
