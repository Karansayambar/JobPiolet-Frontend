import { createAvatar } from "@dicebear/core";
import { identicon } from "@dicebear/collection";

function CompanyLogo({ companyName = "Company", size = 100 }) {
  const logo = createAvatar(identicon, {
    seed: companyName, // Same name = same logo
    size,
    scale: 80, // How filled the icon is (80%)
    radius: 50, // Roundness (50 = maximum)
    backgroundColor: ["#4285F4", "#34A853", "#EA4335"], // Color options
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: logo }}
      style={{
        width: size,
        height: size,
        display: "inline-block",
      }}
    />
  );
}
export default CompanyLogo;
