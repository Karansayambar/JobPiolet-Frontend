import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { PiUserCircleLight } from "react-icons/pi";
import { FaGlobe } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import CompanyInfo from "../../Profile/CompanyInfo";
import FoundingInfo from "../../Profile/FoundingInfo";
import SocialLinks from "./SocialLinks";
import Contact from "../../Profile/Contact";
import { useDispatch } from "react-redux";
import { useGetProfileQuery } from "../../../../services/companyApi";
import { updateCompanyData } from "../../../../redux/slices/createCompanyProfileSlice";

const Settings: React.FC = () => {
  const [selector, setSelector] = useState<number>(0);

  // List of sections with their corresponding components
  const dispatch = useDispatch();
  const userId = localStorage.getItem("user_id");

  const { data } = useGetProfileQuery(userId);

  useEffect(() => {
    if (data?.userProfile) {
      const profile = data.userProfile;
      dispatch(updateCompanyData(profile));
    }
  }, [data]);

  const sections = [
    {
      label: "Company Info",
      icon: <FaUserAlt size={22} />,
      component: <CompanyInfo />,
    },
    {
      label: "Founding Info",
      icon: <PiUserCircleLight size={28} />,
      component: <FoundingInfo />,
    },
    {
      label: "Social Links",
      icon: <FaGlobe size={22} />,
      component: <SocialLinks />,
    },
    {
      label: "Account Settings",
      icon: <CiSettings size={28} />,
      component: <Contact />,
    },
  ];

  return (
    <Stack>
      <Stack direction={"row"} gap={4}>
        {sections.map((section, index) => (
          <Stack
            key={index}
            direction="row"
            gap={1}
            alignItems="center"
            sx={{
              cursor: "pointer",
              p: 1,
              borderBottom: selector === index ? "2px solid blue" : "none",
              "&:hover": { color: "blue" },
            }}
            onClick={() => setSelector(index)} // ✅ Set active section
          >
            {section.icon}
            <Typography>{section.label}</Typography>
          </Stack>
        ))}
      </Stack>
      <Stack py={3}>{sections[selector]?.component}</Stack>
    </Stack>
  );
};

export default Settings;
