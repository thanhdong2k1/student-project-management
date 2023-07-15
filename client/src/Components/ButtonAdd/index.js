import { Typography } from "@mui/material";
import Button3D from "../Button3D";
import AddNew from "../../Assets/Images/AddNew.svg";
import { useTranslation } from "react-i18next";

const ButtonAdd = ({ onClick, onClose }) => {
  const { t } = useTranslation();
  return (
    <Button3D onClick={onClick} onClose={onClose}>
      {t("Add")}{" "}
      <img
        style={{ marginLeft: "2px" }}
        height="24pt"
        width="24pt"
        src={AddNew}
      />
    </Button3D>
  );
};
export default ButtonAdd;
