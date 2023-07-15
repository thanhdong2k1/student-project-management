import { Drawer, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_MINISIZE } from "../Sidebar/constant";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const Content = ({ children, open }) => {
  return (
    <Box
      component="main"
      sx={{
        mt: "10px",
        ml: {
          md: `${open ? SIDEBAR_WIDTH_MINISIZE : SIDEBAR_WIDTH}px`,
          xs: 0,
        },
        mr: "1rem",
        paddingTop: "1rem",
        paddingLeft: "1rem",
        paddingBottom: "1rem",
        paddingRight: "1rem",
        // backgroundColor: "pink",
        minHeight: "100%",
        height: "fit-content",
        flex: 1,
        transition: "margin-left 0.3s linear",
      }}
    >
      <DrawerHeader />
      {children}
    </Box>
  );
};
export default Content;
