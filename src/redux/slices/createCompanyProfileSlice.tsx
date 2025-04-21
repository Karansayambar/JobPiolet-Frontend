import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 0,
  companyProfileData: {
    companyInfo: {
      companyName: "",
      about: "",
      logoUrl: "",
      bannerUrl: "",
    },
    foundingInfo: {
      organisationType: "",
      industryType: "",
      teamSize: "",
      companyWebsite: "",
      companyVision: "",
    },
    SocialInfo: [],
    contactInfo: {
      address: "",
      phone: "",
      email: "",
    },
  },
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    updateStep: (state, action) => {
      state.step = action.payload;
    },
    updateCompanyData: (state, action) => {
      state.companyProfileData = {
        ...state.companyProfileData,
        ...action.payload,
      };
    },
  },
});

export const { updateStep, updateCompanyData } = companySlice.actions;
export default companySlice.reducer;
