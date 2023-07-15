import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
function Layout(props) {
  const his = useLocation();
  // // console.log(his);
  let style = {};
  if (his.pathname === "/login") {
    style = {
      height: "100%",
      // background:"pink",
      backgroundImage: `url("/images/OIP-bg.png")`,
      backgroundPosition: "center",
      backgroundPositionX: "85%",
      backgroundSize: "50%",
      backgroundRepeat: "no-repeat",
      px: "10%",
      display: "flex",
      alignItems: "center",
      justifyContent: "left",
    };
  } else if (his.pathname === "/register") {
    style = {
      // width: "80rem",
      height: "100%",
      // background:"pink",
      backgroundImage: `url("/images/OIP-bg.png")`,
      backgroundPosition: "center",
      backgroundPositionX: "5%",
      backgroundSize: "50%",
      backgroundRepeat: "no-repeat",
      // mx: "auto",
      px: "10%",
      display: "flex",
      alignItems: "center",
      justifyContent: "right",
    };
  }
  return (
    <Typography component="div" sx={style}>
      {props.children}
    </Typography>
  );
}
export default Layout;
