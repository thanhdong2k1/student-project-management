import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Button3D from "../Button3D";
import { Box, Button, Tooltip } from "@mui/material";
import uploadApi from "../../Service/Api/uploadApi";
import filesApi from "../../Service/Api/filesApi";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const FileUpload = ({ name, label, idFile, setIdFile, ...field }) => {
  const { t } = useTranslation();
  const [filePath, setFilePath] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  // const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = useCallback((e) => {
    // console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }, []);
  const getFile = (id) => {
    axios
      .get(`http://phuongnamdts:5000/files/${id}`)
      .then((response) => {
        // console.log(response);
        setFilePath(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };
  useEffect(() => {
    getFile(1);
  }, []);
  const uploadFile = async (e) => {
    e.preventDefault();
    // console.log("Đã vào");
    // const formData = new FormData();
    // // console.log(file, fileName);
    // formData.append("file", file);
    // formData.append("fileName", fileName);
    // try {
    //   const res = await axios.post("http://phuongnamdts:5000/upload", formData);
    //   // console.log(res);
    // } catch (ex) {
    //   // console.log(ex);
    // }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    // console.log("formData", file, fileName, formData);
    await uploadApi
      .post(formData)
      .then((response) => {
        // console.log(response.data);
        // handleIdFile(response);
        const file = {
          name: fileName,
          path: response.data.path,
        };
        // console.log("idFile", idFile);
        if (idFile) {
          filesApi
            .put(file, idFile)
            .then((res) => {
              // console.log("đã nhận", res.response);
              if (res.status == "200") {
                toast.success(`Upload ${label} Success`);
              } else {
                // toast.error(res.data.sqlMessage);
              }
            })
            .catch((error) => {
              toast.error(`${t(error.response.data.sqlMessage)}`);
              console.log("đã nhận", error);
            });
        } else {
          filesApi
            .post(file)
            .then((res) => {
              console.log(res);
              // console.log("đã nhận", res.response.status);
              // console.log("id đã nhận", res.data.id);
              setIdFile(res.data.id);
              if (res.status == "200") {
                // console.log(res);
                toast.success(`Upload ${label} Success`);
              } else {
                // console.log(res);
                // toast.error(res.data.sqlMessage);
              }
            })
            .catch((error) => {
              console.log(error);
              toast.error(`${t(error.response.data.sqlMessage)}`);
            });
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <input
        type="file"
        name={name}
        accept=".doc,.docx,.pdf"
        onChange={(event) => {
          handleFileChange(event);
          field.onChange(event);
        }}
      />
      <Button
        variant="outlined"
        onClick={uploadFile}
        sx={{
          fontSize: {
            width: "60%",
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // fontSize: "0.8em",
          textTransform: "none",
          height: "25px",
          // maxWidth: "100px",
          mb: "2px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          "& span": {
            display: "inline-block",
            maxWidth: "80%",
            textAlign: "center",
          },
        }}
      >
        <Tooltip title={`Upload ${label}`}>
          <span>Upload {label}</span>
        </Tooltip>
      </Button>
      {/* {filePath && (
        <a href={`http://phuongnamdts:5000/${filePath.path}`} download>
          {filePath.name}
        </a>
      )} */}
    </Box>
  );
};

export default FileUpload;
