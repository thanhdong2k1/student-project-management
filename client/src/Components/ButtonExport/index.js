import Button3D from "../Button3D";
import Export from "../../Assets/Images/export-icon.svg";
const ButtonExport = () => {
  return (
    <Button3D>
      Export{" "}
      <img
        style={{ marginLeft: "4px" }}
        height="24pt"
        width="24pt"
        src={Export}
      />
    </Button3D>
  );
};
export default ButtonExport;
