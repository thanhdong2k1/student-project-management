import Button3D from "../Button3D";
import Import from "../../Assets/Images/excel-icon.svg";

const ButtonImport = () => {
  return (
    <Button3D>
      Import{" "}
      <img
        style={{ marginLeft: "4px" }}
        height="24pt"
        width="24pt"
        src={Import}
      />
    </Button3D>
  );
};
export default ButtonImport;
