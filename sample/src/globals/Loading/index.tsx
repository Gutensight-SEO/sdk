import { CircularProgress, Box, styled } from "@mui/material";
// import { SVGS } from "../../assets/index.ts"; // Adjust the import path as necessary
// import Logo from "@/assets/images/logo.png";



// STYLED COMPONENT
const StyledLoading = styled("div")({
  position: "fixed",  // Change to fixed positioning
  top: 0,
  left: 0,
  width: "100vw",    // Use viewport width
  height: "100vh",   // Use viewport height
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& img": {
    width: "auto",
    height: "25px"
  },
  "& .circleProgress": {
    position: "absolute",
    left: -7,
    right: 0,
    top: "calc(50% - 12.5px)"  // Center the progress circle relative to the icon
  }
});

export default function Loading() {
  return (
    <StyledLoading>
      <Box position="relative">
        {/* <img src={Logo} alt="Loading" /> */}
        {/* <img src={SVGS.ReactIcon} alt="Loading" /> */}
        <CircularProgress className="circleProgress" />
      </Box>
    </StyledLoading>
  );
}
