// @mui material components
import Link from "@mui/material/Link";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React base styles
import typography from "assets/theme/base/typography";

function Footer() {
  const { size } = typography;

  return (
    <MDBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        <MDTypography variant="body2" color="text.secondary" align="center" sx={{ mt: 8 }}>
          {"Copyright © "}
          <Link color="inherit" href="https://www.facebook.com/k.sytem/?ref=pages_you_manage">
            Kathuna System
          </Link>{" "}
          {new Date().getFullYear()}.
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

export default Footer;
