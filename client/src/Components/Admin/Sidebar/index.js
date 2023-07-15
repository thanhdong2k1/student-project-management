import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import itemSidebar from "./itemSidebar";
import { Link, Navigate, useNavigate } from "react-router-dom";

import logo from "../../../Assets/Images/logo.png";
import logoMini from "../../../Assets/Images/logo-mini.png";
import routes from "../../../Routes";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useEffect } from "react";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  boxShadow:
    "rgb(145 158 171 / 30%) 0px 2px 1px -1px, rgb(145 158 171 / 30%) 0px 1px 1px 0px, rgb(145 158 171 / 30%) 0px 1px 3px 0px",
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  height: "100vh",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Sidebar({ open, handleDrawerOpen }) {
  const theme = useTheme();
  const [selectedLink, setSelectedLink] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [logoShow, setLogoShow] = React.useState(logo);
  React.useLayoutEffect(() => {
    // console.log(open);
    if (open) {
      setLogoShow(logo);
    } else {
      setLogoShow(logoMini);
    }
  }, [open]);
  // const itemSidebar = itemSidebar;
  const [roleUser, setRoleUser] = useState(null);
  const [itemSidebarRole, setItemSidebarRole] = useState(null);
  // console.log(roleUser);
  useEffect(() => {
    setRoleUser(localStorage.getItem("roleUser"));
    itemSidebar.map((item, index) => {
      if (item.role.includes(roleUser)) {
        // console.log(item.name);
      }
    });
  }, []);
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Typography
          id="#header-logo"
          component="div"
          variant="div"
          // sx={{ ...styles.logo({ isMiniSidebar }) }}
          // onClick={onCloseMobileSidebar}
        >
          <Link to={routes.admin.dashboard}>
            <Typography
              component="img"
              src={logoShow}
              sx={{ height: "36px" }}
            ></Typography>
          </Link>
        </Typography>
      </DrawerHeader>
      <Divider />
      <List>
        {itemSidebar
          .filter((item) => item.role.includes(roleUser)) // lọc item có role "sinhvien"
          .map((item, index) => (
            <ListItem
              key={item}
              disablePadding
              sx={{ display: "block" }}
              selected={selectedLink === item.link}
              onClick={() => {
                setSelectedLink(item.link);
                navigate(`/admin/${item.link}`);
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: "initial",
                  // px: 2.5,
                  borderLeft: `4px solid ${
                    selectedLink === item.link ? "#3f51b5" : "transparent"
                  }`,
                  // fontWeight: `${selectedLink === item.link ? "bold" : ""}`,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    opacity: open ? 1 : 0,
                    "& span": {
                      fontWeight: `${selectedLink === item.link ? "bold" : ""}`,
                    },
                  }}
                >
                  {t(item.name)}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      {/* <Divider /> */}
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Drawer>
  );
}
