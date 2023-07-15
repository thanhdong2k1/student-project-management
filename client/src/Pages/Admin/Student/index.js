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
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import routes from "../../../Routes";
import studentApi from "../../../Service/Api/studentApi";
import Notification from "awesome-notifications";
import AWN from "awesome-notifications";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Student = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);  
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const roleUser = localStorage.getItem("roleUser");
  const notifier = new Notification({
    position: "top-left",
    // durations: { success: 0 }
  });
  const handleViewClick = () => {
    setOpen(!open);
  };
  let columns = [
    {
      field: "id",
      headerName: "Mã sinh viên",

      minWidth: 50,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "TenSinhVien",
      headerName: "Tên sinh viên",
      minWidth: 200,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "GioiTinh",
      headerName: "Giới tính",
      minWidth: 50,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "NamSinh",
      headerName: "Năm sinh",
      minWidth: 50,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "QueQuan",
      headerName: "Quê quán",
      minWidth: 50,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "Email",
      headerName: "Email",
      minWidth: 200,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "SDT",
      headerName: "Số điện thoại",
      type: "number",
      minWidth: 50,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "TenLop",
      headerName: "Tên lớp",
      description: "This column has a value getter and is not sortable.",
      minWidth: 50,
      headerAlign: "center",
      flex: 1,
    },
  ];
  if (roleUser === "sinhvien") {
    columns = columns.filter((col) =>
      [
        "id",
        "TenSinhVien",
        "GioiTinh",
        "NamSinh",
        "QueQuan",
        "Email",
        "SDT",
        "TenLop",
      ].includes(col.field)
    );
  }
  if (roleUser == "bandaotao") {
    columns.push({
      field: "action",
      headerName: `${t("Action")}`,
      description: "",
      minWidth: 50,
      headerAlign: "center",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return [
          // (roleUser == "sinhvien" ||
          //   roleUser == "giangvien" ||
          //   roleUser == "bandaotao") && (
          //   <GridActionsCellItem
          //     icon={
          //       <Tooltip title="View">
          //         <RemoveRedEye />
          //       </Tooltip>
          //     }
          //     // className="textPrimary"
          //     onClick={() => handleViewClick(params.row.id)}
          //     color="inherit"
          //   />
          // ),
          roleUser == "bandaotao" && (
            <GridActionsCellItem
              icon={
                <Tooltip title="Edit">
                  <Edit
                    onClick={() => {
                      handleClickEdit(params.row.id);
                    }}
                  />
                </Tooltip>
              }
              // className="textPrimary"
              // onClick={() => handleEditClick(params.row.assetId)}
              color="inherit"
            />
          ),
          roleUser == "bandaotao" && (
            <GridActionsCellItem
              icon={
                <Tooltip title="Delete">
                  <Delete onClick={() => handleClickDelete(params.row.id)} />
                </Tooltip>
              }
              // onClick={() => handleDeleteClick(params.row.assetId)}
              color="inherit"
            />
          ),
        ];
      },
    });
  }

  const handleClickAdd = () => {
    localStorage.setItem("status", "");
    localStorage.setItem("idStudent", "");
    localStorage.setItem("studentEdit", "");
    navigate(`../${routes.admin.addStudent}`);
  };
  const handleClickEdit = async (id) => {
    const action = await rows.filter((row) => row.id == id);
    // console.log(id, action);
    localStorage.setItem("status", "edit");
    localStorage.setItem("idStudent", id);
    localStorage.setItem("studentEdit", JSON.stringify(action[0]));
    navigate(`../${routes.admin.addStudent}`);
  };
  const handleClickDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await studentApi.delete({ id }).then(() => {
        toast.success(`${t("Delete")} ${t("Success")}`);
        setTimeout(() => {
          navigate(0);
        }, 500);
      });
    }
  };
  useEffect(() => {
    const getStudent = async () => {
      const responseStudent = await studentApi.getAll();
      // console.log("responseStudent", responseStudent);
      const dataTable = await responseStudent.data.map((res) => {
        return {
          id: res.MaSinhVien,
          TenSinhVien: res.TenSinhVien,
          GioiTinh: res.GioiTinh,
          NamSinh: res.NamSinh,
          QueQuan: res.QueQuan,
          Email: res.Email,
          SDT: res.SDT,
          MaLop: res.MaLop,
          TenLop: res.TenLop,
        };
      });
      setRows(dataTable);
    };
    getStudent();
  }, []);
  // useEffect(() => {
  //   const getStudent = async () => {
  //     const responseStudent = await studentApi.getAll();
  //     // console.log(responseStudent);
  //     // const res = responseStudent.json();
  //     const dataTable = responseStudent.map((res) => {
  //       return {
  //         id: res.MaSinhVien,
  //         TenSinhVien: res.TenSinhVien,
  //         GioiTinh: res.GioiTinh,
  //         Email: res.Email,
  //         SDT: res.SDT,
  //         MaLop: res.MaLop,
  //         MaBDT: res.MaBDT,
  //       };
  //     });
  //     // console.log(dataTable);
  //     setRows(dataTable);
  //     // // console.log(responseStudent);
  //   };
  //   getStudent();
  // }, []);
  return (
    <div>
      <Popup
        open={open}
        onClose={handleViewClick}
        title={"Hello"}
        content={"Feature under development"}
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
export default Student;
