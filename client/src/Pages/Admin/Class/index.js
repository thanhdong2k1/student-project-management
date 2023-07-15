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
import classApi from "../../../Service/Api/classApi";
import Notification from "awesome-notifications";
import AWN from "awesome-notifications";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Class = () => {
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
  const columns = [
    {
      field: "id",
      headerName: "Mã lớp",

      minWidth: 50,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "TenLop",
      headerName: "Tên lớp",
      minWidth: 200,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "SoSV",
      headerName: "Số sinh viên",
      minWidth: 50,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "TenNganh",
      headerName: "Tên ngành",
      minWidth: 200,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "NienKhoa",
      headerName: "Tên khóa đào tạo",
      type: "number",
      minWidth: 50,
      headerAlign: "center",
      flex: 1,
    },
  ];
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
    localStorage.setItem("idClass", "");
    localStorage.setItem("classEdit", "");
    navigate(`../${routes.admin.addClass}`);
  };
  const handleClickEdit = async (id) => {
    const action = await rows.filter((row) => row.id == id);
    // console.log(id, action);
    localStorage.setItem("status", "edit");
    localStorage.setItem("idClass", id);
    localStorage.setItem("classEdit", JSON.stringify(action[0]));
    navigate(`../${routes.admin.addClass}`);
  };
  const handleClickDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await classApi.delete({ id }).then(() => {
        toast.success(`${t("Delete")} ${t("Success")}`);
        setTimeout(() => {
          navigate(0);
        }, 500);
      });
    }
  };
  useEffect(() => {
    const getClass = async () => {
      const responseClass = await classApi.getAll();
      // console.log("responseClass", responseClass);
      const dataTable = await responseClass.data.map((res) => {
        return {
          id: res.MaLop,
          TenLop: res.TenLop,
          SoSV: res.SoSV,
          MaNganh: res.MaNganh,
          TenNganh: res.TenNganh,
          MaKhoaDaoTao: res.MaKhoaDaoTao,
          NienKhoa: res.NienKhoa,
        };
      });
      setRows(dataTable);
    };
    getClass();
  }, []);
  // useEffect(() => {
  //   const getClass = async () => {
  //     const responseClass = await classApi.getAll();
  //     // console.log(responseClass);
  //     // const res = responseClass.json();
  //     const dataTable = responseClass.map((res) => {
  //       return {
  //         id: res.MaLop,
  //         TenLop: res.TenLop,
  //         SoSV: res.SoSV,
  //         MaNganh: res.MaNganh,
  //         SoDT: res.SoDT,
  //         MaNganh: res.MaNganh,
  //         MaBDT: res.MaBDT,
  //       };
  //     });
  //     // console.log(dataTable);
  //     setRows(dataTable);
  //     // // console.log(responseClass);
  //   };
  //   getClass();
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
export default Class;
