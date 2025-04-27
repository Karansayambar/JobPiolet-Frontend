import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  candidateProfileData: {
    candidateInfo: {
      userFullName: "",
      title: "",
      experience: "",
      education: "",
      personalWebsite: "",
      resume: "",
    },
    profileInfo: {
      nationality: "",
      gender: "",
      maritalStatus: "",
      address: "",
      dateOfBirth: "",
      biography: "",
    },
    SocialInfo: [],
    contactInfo: {
      address: "",
      phone: "",
      email: "",
    },
  },
};

const candidateSlice = createSlice({
  name: "candidateProfile",
  initialState,
  reducers: {
    updateCandidateData: (state, action) => {
      state.candidateProfileData = {
        ...state.candidateProfileData,
        ...action.payload,
      };
    },
  },
});

export const { updateCandidateData } = candidateSlice.actions;
export default candidateSlice.reducer;
