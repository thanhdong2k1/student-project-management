import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { locales } from "../../../../i18n/i18n";
import englandIcon from "../../../../Assets/Images/england.JPG";
import vietnamIcon from "../../../../Assets/Images/vietnam.JPG";
const options = {
  en: englandIcon,
  vi: vietnamIcon,
};
export default function SwitchLaguage({ sx }) {
  const [switchLang, setSwitchLang] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLanguge = i18n.language;
  const handleClick = () => {
    setSwitchLang(true);
  };
  const handleClose = () => {
    setSwitchLang(false);
  };
  const changeLanguage = (lng) => {
    // console.log("Đổi ngôn ngữ", lng);
    i18n.changeLanguage(lng);
  };
  return (
    <div>
      <Button
        sx={{
          // bgcolor: "background.paper",

          // top: "50%",
        }}
        id="demo-positioned-button"
        aria-controls={switchLang ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={switchLang ? "true" : undefined}
        onClick={handleClick}
      >
        <img src={options[currentLanguge]} style={{ width: "35px" }}></img>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={switchLang}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            // handleClose();
            changeLanguage("en");
          }}
        >
          <img
            src={options["en"]}
            style={{
              bgcolor: "background.paper",
              width: "35px",
              // height: "60px",
            }}
          ></img>
        </MenuItem>
        <MenuItem
          onClick={() => {
            // handleClose();
            changeLanguage("vi");
          }}
        >
          <img
            src={options["vi"]}
            style={{
              bgcolor: "background.paper",
              width: "35px",
              // height: "60px",
            }}
          ></img>
        </MenuItem>
      </Menu>
    </div>
  );
}
