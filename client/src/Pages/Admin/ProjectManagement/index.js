import Button3D from "../../../Components/Button3D";
import ButtonAdd from "../../../Components/ButtonAdd";
import ButtonExport from "../../../Components/ButtonExport";
import ButtonImport from "../../../Components/ButtonImport";
import DataGridTable from "../../../Components/DataGridTable";
import Tooltip from "@mui/material/Tooltip";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import Popup from "../../../Components/Popup";
import { useEffect, useState } from "react";
import {
  Grid,
  Link,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import routes from "../../../Routes";
import projectManagementApi from "../../../Service/Api/projectManagementApi";
import Notification from "awesome-notifications";
import AWN from "awesome-notifications";
import { toast } from "react-toastify";
import studentApi from "../../../Service/Api/studentApi";
import lecturerApi from "../../../Service/Api/lecturerApi";
import topicApi from "../../../Service/Api/topicApi";
import filesApi from "../../../Service/Api/filesApi";
import guideApi from "../../../Service/Api/guideApi";
import { useTranslation } from "react-i18next";
const getSteps = () => {
  return ["Giảng viên nhận xét", "Ban đào tạo xác nhận"];
};
const ProjectManagement = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [rowDetail, setRowDetail] = useState([]);
  const roleUser = localStorage.getItem("roleUser");
  const idUser = localStorage.getItem("idUser");
  const steps = getSteps();
  const [activeStep, setActiveStep] = useState(0);
  const notifier = new Notification({
    position: "top-left",
    // durations: { success: 0 }
  });
  const handleViewClick = (id) => {
    // console.log(id);
    const getProjectManagement = async () => {
      const responseProjectManagement = await projectManagementApi.get({ id });
      // console.log("responseProjectManagement", responseProjectManagement);
      setActiveStep(
        responseProjectManagement.data[0].XacNhanBDT == 1
          ? 2
          : responseProjectManagement.data[0].XacNhanGV == 1
          ? 1
          : 0
      );
      const dataTableProject = await responseProjectManagement.data.map(
        (res) => {
          return {
            id: res.MaDeTai,
            TenDeTai: res.TenDeTai,
            TenChuDe: res.TenChuDe,
            TenSinhVien: res.TenSinhVien,
            TenGiangVien: res.TenGiangVien,
            BanMemDA: res.BanMemDA,
            nameBanMem: res.nameBanMem,
            pathBanMem: res.pathBanMem,
            BienBan: res.BienBan,
            nameBienBan: res.nameBienBan,
            pathBienBan: res.pathBienBan,
            DiemDA: res.DiemDA,
            NhanXet: res.NhanXet,
          };
        }
      );
      const responseStudent = await guideApi.get({
        id: dataTableProject[0].MaSinhVien,
      });
      // console.log("responseStudent", responseStudent);
      const newRowDetail = {
        ...dataTableProject[0],
      };
      // console.log(newRowDetail);
      setRowDetail(newRowDetail);
    };

    getProjectManagement();
    setOpen(!open);
  };
  const columns = [
    // {
    //   field: "id",
    //   headerName: "Mã đề tài",
    //   minWidth: 40,
    //   headerAlign: "center",
    //   flex: 1,
    // },
    {
      field: "TenDeTai",
      headerName: "Tên đề tài",
      minWidth: 400,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "TenChuDe",
      headerName: "Tên chủ đề",
      minWidth: 50,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "TenSinhVien",
      headerName: "Tên sinh viên",
      minWidth: 50,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "TenGiangVien",
      headerName: "Tên giảng viên",
      minWidth: 50,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "nameBanMem",
      headerName: "Bản mềm",
      description: "This column has a value getter and is not sortable.",
      minWidth: 50,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "nameBienBan",
      headerName: "Biên bản",
      description: "This column has a value getter and is not sortable.",
      minWidth: 50,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "DiemDA",
      headerName: "Điểm đồ án",
      description: "This column has a value getter and is not sortable.",
      type: "number",
      minWidth: 30,
      headerAlign: "center",
      flex: 1,
    },
    {
      // field: "Trạng",
      headerName: "Trạng thái",
      description: "This column has a value getter and is not sortable.",
      type: "number",
      minWidth: 120,
      headerAlign: "center",
      flex: 1,
      renderCell: (params) => {
        return (
          <span
            style={{
              margin: "2px 6px",
              padding: "2px",
              fontWeight: "700",
              borderRadius: "3px",
              fontSize: "13px",
              color: "#212529",
              backgroundColor:
                params.row.XacNhanBDT == 1
                  ? "lightgreen"
                  : params.row.XacNhanGV == 1
                  ? "orange"
                  : "grey",
              // ...stylesStatus,
            }}
          >
            {params.row.XacNhanBDT == 1
              ? "Hoàn thành"
              : params.row.XacNhanGV == 1
              ? "Chờ xác nhận"
              : "Đang chỉnh sửa"}
          </span>
        );
      },
    },
    {
      field: "action",
      headerName: `${t("Action")}`,
      description: "",
      minWidth: 40,
      headerAlign: "center",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        // check if role user is sinhvien and idUser is equal to MaSinhVien

        const canEdit =
          (roleUser === "sinhvien" && idUser == params.row.MaSinhVien) ||
          (roleUser === "giangvien" && idUser == params.row.MaGiangVien) ||
          roleUser === "bandaotao";

        return [
          // show View button for all roles
          (roleUser !== "sinhvien" ||
            (roleUser === "sinhvien" && idUser == params.row.MaSinhVien)) && (
            <GridActionsCellItem
              icon={
                <Tooltip title="View">
                  <RemoveRedEye />
                </Tooltip>
              }
              onClick={() => handleViewClick(params.row.id)}
              color="inherit"
            />
          ),
          // show Edit button if canEdit: role user is sinhvien and idUser is MaSinhVien
          canEdit && (
            <GridActionsCellItem
              icon={
                <Tooltip title="Edit">
                  <Edit onClick={() => handleClickEdit(params.row.id)} />
                </Tooltip>
              }
              color="inherit"
            />
          ),
          // show Delete button for bandaotao role only
          roleUser === "bandaotao" && (
            <GridActionsCellItem
              icon={
                <Tooltip title="Delete">
                  <Delete onClick={() => handleClickDelete(params.row.id)} />
                </Tooltip>
              }
              color="inherit"
            />
          ),
        ];
      },

      // renderCell: (params) => {
      //   if (roleUser === "sinhvien" && params.row.MaSinhVien !== idUser) {
      //     return null;
      //   }

      //   return [
      //     (roleUser === "sinhvien" ||
      //       roleUser === "giangvien" ||
      //       roleUser === "bandaotao") && (
      //       <GridActionsCellItem
      //         icon={
      //           <Tooltip title="View">
      //             <RemoveRedEye />
      //           </Tooltip>
      //         }
      //         onClick={() => handleViewClick(params.row.id)}
      //         color="inherit"
      //       />
      //     ),
      //     (roleUser === "bandaotao" ||
      //       roleUser === "giangvien" ||
      //       roleUser === "sinhvien") && (
      //       <GridActionsCellItem
      //         icon={
      //           <Tooltip title="Edit">
      //             <Edit
      //               onClick={() => {
      //                 handleClickEdit(params.row.id);
      //               }}
      //             />
      //           </Tooltip>
      //         }
      //         color="inherit"
      //       />
      //     ),
      //     roleUser === "bandaotao" && (
      //       <GridActionsCellItem
      //         icon={
      //           <Tooltip title="Delete">
      //             <Delete onClick={() => handleClickDelete(params.row.id)} />
      //           </Tooltip>
      //         }
      //         color="inherit"
      //       />
      //     ),
      //   ];
      // },
    },
  ];
  const handleClickAdd = () => {
    localStorage.setItem("status", "");
    localStorage.setItem("idProjectManagement", "");
    localStorage.setItem("projectManagementEdit", "");
    navigate(`../${routes.admin.addProjectManagement}`);
  };
  const handleClickEdit = async (id) => {
    const action = await rows.filter((row) => row.id == id);
    // console.log(id, action);
    localStorage.setItem("status", "edit");
    localStorage.setItem("idProjectManagement", id);
    localStorage.setItem("projectManagementEdit", JSON.stringify(action[0]));
    navigate(`../${routes.admin.addProjectManagement}`);
  };
  const handleClickDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await projectManagementApi.delete({ id }).then(() => {
        toast.success(`${t("Delete")} ${t("Success")}`);
        setTimeout(() => {
          navigate(0);
        }, 500);
      });
    }
  };
  useEffect(() => {
    const getProjectManagement = async () => {
      const responseProjectManagement = await projectManagementApi.getAll();
      // console.log("responseProjectManagement", responseProjectManagement);
      const dataTable = await responseProjectManagement.data.map((res) => {
        return {
          id: res.MaDeTai,
          TenDeTai: res.TenDeTai,
          MaChuDe: res.MaChuDe,
          TenChuDe: res.TenChuDe,
          MaSinhVien: res.MaSinhVien,
          TenSinhVien: res.TenSinhVien,
          MaGiangVien: res.MaGiangVien,
          TenGiangVien: res.TenGiangVien,
          BanMemDA: res.BanMemDA,
          nameBanMem: res.nameBanMem,
          pathBanMem: res.pathBanMem,
          BienBan: res.BienBan,
          nameBienBan: res.nameBienBan,
          pathBienBan: res.pathBienBan,
          DiemDA: res.DiemDA,
          XacNhanBDT: res.XacNhanBDT,
          XacNhanGV: res.XacNhanGV,
          NhanXet: res.NhanXet,
        };
      });
      setRows(dataTable);
    };
    getProjectManagement();
  }, []);
  // useEffect(() => {
  //   const getProjectManagement = async () => {
  //     const responseProjectManagement = await projectManagementApi.getAll();
  //     // console.log(responseProjectManagement);
  //     // const res = responseProjectManagement.json();
  //     const dataTable = responseProjectManagement.map((res) => {
  //       return {
  //         id: res.MaGiangVien,
  //         TenGiangVien: res.TenGiangVien,
  //         GioiTinh: res.GioiTinh,
  //         Email: res.Email,
  //         SoDT: res.SoDT,
  //         MaNganh: res.MaNganh,
  //         MaBDT: res.MaBDT,
  //       };
  //     });
  //     // console.log(dataTable);
  //     setRows(dataTable);
  //     // // console.log(responseProjectManagement);
  //   };
  //   getProjectManagement();
  // }, []);
  const handleDownload = (event) => {
    event.preventDefault();
    window.open(
      `http://phuongnamdts:5000/${rowDetail.pathSoftCopy}`,
      "_blank"
    );
  };
  return (
    <div>
      <Popup
        open={open}
        onClose={handleViewClick}
        title={"See details"}
        content={
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography>Tên đề tài:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{rowDetail.TenDeTai}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Chủ đề:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{rowDetail.TenChuDe}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Sinh viên:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{rowDetail.TenSinhVien}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Giảng Viên:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{rowDetail.TenGiangVien}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Trạng thái:</Typography>
            </Grid>
            <Grid item xs={8}>
              {rowDetail.BanMemDA && (
                <Stepper
                  activeStep={activeStep}
                  alternativeLabel
                  sx={{
                    "& .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.MuiStepIcon-root.Mui-completed":
                      {
                        color: "green",
                      },
                  }}
                >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              )}
            </Grid>
            <Grid item xs={4}>
              <Typography>{t("Project soft copy")}:</Typography>
            </Grid>
            <Grid item xs={8} sx={{ overflow: "hidden" }}>
              {rowDetail.nameBanMem && (
                <Button3D sx={{ maxWidth: "100%" }}>
                  <Link
                    href={`http://phuongnamdts:5000/${rowDetail.pathBanMem}`}
                    target="_blank"
                    download
                    underline="none"
                    sx={{ ml: 1, maxWidth: "100%" }}
                  >
                    {t("Project minutes")}: {rowDetail.nameBanMem}
                  </Link>
                </Button3D>
              )}
            </Grid>
            <Grid item xs={4}>
              <Typography>Nhận xét:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{rowDetail.NhanXet}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Project minutes:</Typography>
            </Grid>
            <Grid item xs={8} sx={{ overflow: "hidden" }}>
              {rowDetail.nameBienBan && (
                <Button3D sx={{ maxWidth: "100%" }}>
                  <Link
                    href={`http://phuongnamdts:5000/${rowDetail.pathBienBan}`}
                    target="_blank"
                    download
                    underline="none"
                    sx={{ ml: 1, maxWidth: "100%" }}
                  >
                    {t("Project minutes")}: {rowDetail.nameBienBan}
                  </Link>
                </Button3D>
              )}
            </Grid>
            {/* <iframe
                  src={`http://phuongnamdts:5000/${rowDetail.pathMinutes}`}
                  width="100%"
                  height="500px"
                  /> */}
            <Grid item xs={4}>
              <Typography>Điểm:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{rowDetail.DiemDA}</Typography>
            </Grid>
          </Grid>
        }
      ></Popup>
      <Grid container spacing={2} xs={12}>
        {roleUser == "bandaotao" && (
          <Grid item xs={12} sx={{ display: "flex" }}>
            <Grid container columnSpacing={1} xs={8} sx={{ display: "flex" }}>
              <Grid item>{/* <Button3D>Search</Button3D> */}</Grid>
            </Grid>
            <Grid
              container
              columnSpacing={1}
              xs={4}
              sx={{ ml: 6, display: "flex", justifyContent: "end" }}
            >
              <Grid item>{/* <ButtonExport></ButtonExport> */}</Grid>
              <Grid item>{/* <ButtonImport></ButtonImport> */}</Grid>
              <Grid item>
                <ButtonAdd onClick={handleClickAdd}></ButtonAdd>
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid item xs={12} sx={{ display: "flex" }}>
          <DataGridTable columns={columns} rows={rows}></DataGridTable>
        </Grid>
      </Grid>
    </div>
  );
};
export default ProjectManagement;
