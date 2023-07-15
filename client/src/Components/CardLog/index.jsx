import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

function Card(props) {
  const his = useLocation();
  // // console.log(his);
  let style = {};
  if (his.pathname === "/login") {
    style = {
      width: "26rem",
      borderRadius: "8px",
      // backgroundColor: "white",
    };
  } else if (his.pathname === "/register") {
    style = {
      width: "40rem",
      borderRadius: "8px",
      // backgroundColor: "white",
    };
  }
  return (
    <Typography component="div" sx={style}>
      {props.children}
    </Typography>
  );
}
export default Card;
