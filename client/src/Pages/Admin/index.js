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
import Content from "../../Components/Admin/Content";
import Header from "../../Components/Admin/Header";
import { Outlet, useNavigate } from "react-router-dom";
import FileUpload from "../../Components/FileUpload";
import { useEffect } from "react";
import notifyApi from "../../Service/Api/notifyApi";
import { toast } from "react-toastify";
import moment from "moment";

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getNotify = async () => {
      const responseNotify = await notifyApi.getAll();
      // console.log("responseNotify", responseNotify);
      const dataTable = await responseNotify.data.map((res) => {
        return {
          id: res.MaTB,
          title: res.TenTB,
          startDate: moment(res.NgayBatDau).format("DD/MM/YYYY"),
          endDate: moment(res.NgayKetThuc).format("DD/MM/YYYY"),
          MaBanDaoTao: res.MaBanDaoTao,
        };
      });
      dataTable.forEach((res) => {
        if (
          moment().isBetween(
            moment(res.startDate, "DD/MM/YYYY"),
            moment(res.endDate, "DD/MM/YYYY"),
            "day"
          )
        ) {
          // console.log(1);
          toast.info(res.title); // current date is between startTime and endTime
        } else if (moment(res.endDate, "DD/MM/YYYY").isSame(moment(), "day")) {
          // console.log(2);
          toast.warn(res.title); // current day is same as the end day
        }
      });
    };
    getNotify();
  }, []);

  const handleDrawerOpen = () => {
    // console.log("Đã click", open);
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const isLogin =
      localStorage.getItem("roleUser") && localStorage.getItem("idUser");
    if (!isLogin) {
      navigate(`/login`);
    }
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen}></Header>
      <Content open={open}>
        <Outlet></Outlet>
      </Content>
    </Box>
  );
}
