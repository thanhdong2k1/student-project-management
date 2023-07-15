import { Button } from "@mui/material";

const Button3D = ({ children, onClick, onClose, sx }) => {
  return (
    <Button
      onClick={onClick}
      onClose={onClose}
      size="small"
      sx={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        height: "26px",
        p: "0 8px",
        m: "0px 0px 4px 0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1em",
        color: "#000",
        backgroundColor: "#fff",
        borderRadius: "2px",
        border: "1px solid rgba(0,0,0,0.3)",
        wordSpacing: "normal",
        textTransform: "none",
        boxShadow: "1px 2px 1px 0px #ccc, -9px -13px 12px -18px #666666 inset",
        "&:hover": {
          boxShadow: "1px 2px 1px 0px #ccc, -9px 12px 12px -18px #666666 inset",
        },
        overflow: "hidden",
        fontWeight: "600",
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};
export default Button3D;
