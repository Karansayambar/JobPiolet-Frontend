import { Stack, Typography } from "@mui/material";
import { CiUser } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { FaAt } from "react-icons/fa6";

import CompanyInfo from "../../sections/Employee/Profile/CompanyInfo";
import React, { useEffect } from "react";
import FoundingInfo from "../../sections/Employee/Profile/FoundingInfo";
import SocialLinks from "../../sections/Employee/Profile/SocialLinks";
import Contact from "../../sections/Employee/Profile/Contact";
import ProcessBar from "../../components/Common/ProcessBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    label: "Company Info",
    icon: <CiUser size={22} />,
    component: CompanyInfo,
  },
  {
    label: "Founding Info",
    icon: <FaRegUserCircle size={22} />,
    component: FoundingInfo,
  },
  {
    label: "Social Media Info",
    icon: <FaGlobe size={22} />,
    component: SocialLinks,
  },
  {
    label: "Contact",
    icon: <FaAt size={22} />,
    component: Contact,
  },
];

const CreateProfile = () => {
  // const [selector, setSelector] = useState<Number>(0);
  const { step } = useSelector((state) => state.company);
  const navigate = useNavigate();
  useEffect(() => {
    if (step === 4) {
      setTimeout(() => navigate("/company/congradulations"), 1000);
    }
  }, [step]);

  return (
    <Stack alignItems={"center"}>
      <Stack width={"100%"}>
        <ProcessBar />
      </Stack>
      <Stack direction={"row"} gap={4} py={3}>
        {sections.map((section, index) => (
          <Stack
            key={index}
            direction="row"
            gap={1}
            alignItems="center"
            sx={{
              cursor: "pointer",
              p: 1,
              borderBottom: step === index ? "2px solid blue" : "none",
              "&:hover": { color: "blue" },
            }}
          >
            {section.icon}
            <Typography>{section.label}</Typography>
          </Stack>
        ))}
      </Stack>
      <Stack py={3} width={"100vw"} alignItems={"center"}>
        {sections[step] && React.createElement(sections[step].component)}
      </Stack>
    </Stack>
  );
};

export default CreateProfile;
