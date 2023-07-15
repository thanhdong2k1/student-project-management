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
import accountApi from "../../../Service/Api/accountApi";
import Notification from "awesome-notifications";
import AWN from "awesome-notifications";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Account = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [accountType, setAccountType] = useState(null);
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
      headerName: "Mã tài khoản",

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
      field: "MatKhau",
      headerName: "Mật khẩu",
      minWidth: 50,
      headerAlign: "center",
      flex: 1,
    },
    accountType == "giangvien"
      ? {
          field: "TenGiangVien",
          headerName: "Tên giảng viên",
          minWidth: 200,
          headerAlign: "center",
          flex: 1,
        }
      : {
          field: "TenSinhVien",
          headerName: "Tên sinh viên",
          minWidth: 50,
          headerAlign: "center",
          flex: 1,
        },

    {
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
          //     // accountName="textPrimary"
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
              // accountName="textPrimary"
              // onClick={() => handleEditClick(params.row.assetId)}
              color="inherit"
            />
          ),
          // roleUser == "bandaotao" && (
          //   <GridActionsCellItem
          //     icon={
          //       <Tooltip title="Delete">
          //         <Delete onClick={() => handleClickDelete(params.row.id)} />
          //       </Tooltip>
          //     }
          //     // onClick={() => handleDeleteClick(params.row.assetId)}
          //     color="inherit"
          //   />
          // ),
        ];
      },
    },
  ];
  const handleClickAdd = () => {
    localStorage.setItem("status", "");
    localStorage.setItem("idAccount", "");
    localStorage.setItem("accountEdit", "");
    navigate(`../${routes.admin.addAccount}`);
  };
  const handleClickLecturer = () => {
    setAccountType("giangvien");
  };
  const handleClickStudent = () => {
    setAccountType("sinhvien");
  };
  const handleClickEdit = async (id) => {
    const action = await rows.filter((row) => row.id == id);
    // console.log(id, action);
    localStorage.setItem("status", "edit");
    localStorage.setItem("idAccount", id);
    localStorage.setItem("accountEdit", JSON.stringify(action[0]));
    navigate(`../${routes.admin.addAccount}`);
  };
  const handleClickDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await accountApi.delete({ id }).then(() => {
        toast.success(`${t("Delete")} ${t("Success")}`);
        setTimeout(() => {
          navigate(0);
        }, 500);
      });
    }
  };
  useEffect(() => {
    const getAccount = async () => {
      const responseAccount = await accountApi.getAll();
      console.log("responseAccount", responseAccount);
      const dataTableFilter = await responseAccount.data.filter((res) => {
        if (
          (accountType == "giangvien" && res.MaGiangVien) ||
          (accountType == "sinhvien" && res.MaSinhVien)
        ) {
          return {
            id: res.MaDN,
            Email: res.Email,
            MatKhau: res.MatKhau,
            MaGiangVien: res.MaGiangVien,
            TenGiangVien: res.TenGiangVien,
            MaSinhVien: res.MaSinhVien,
            TenSinhVien: res.TenSinhVien,
          };
        }
      });
      const dataTable = await dataTableFilter.map((res) => {
        return {
          id: res.MaDN,
          Email: res.Email,
          MatKhau: "***",
          MaGiangVien: res.MaGiangVien,
          TenGiangVien: res.TenGiangVien,
          MaSinhVien: res.MaSinhVien,
          TenSinhVien: res.TenSinhVien,
        };
      });
      console.log(dataTable);
      setRows(dataTable);
    };
    getAccount();
  }, [accountType]);
  // useEffect(() => {
  //   const getAccount = async () => {
  //     const responseAccount = await accountApi.getAll();
  //     // console.log(responseAccount);
  //     // const res = responseAccount.json();
  //     const dataTable = responseAccount.map((res) => {
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
  //     // // console.log(responseAccount);
  //   };
  //   getAccount();
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
        {/* {roleUser == "bandaotao" && (
          <Grid item xs={12} sx={{ display: "flex" }}>
            <Grid container columnSpacing={1} xs={8} sx={{ display: "flex" }}>
              <Grid item>
                <Button3D>Search</Button3D>
              </Grid>
            </Grid>
            <Grid
              container
              columnSpacing={1}
              xs={4}
              sx={{ ml: 6, display: "flex", justifyContent: "end" }}
            >
              <Grid item>
                <ButtonExport></ButtonExport>
              </Grid>
              <Grid item>
                <ButtonImport></ButtonImport>
              </Grid>
              <Grid item>
                <ButtonAdd onClick={handleClickAdd}></ButtonAdd>
              </Grid>
            </Grid>
          </Grid>
        )} */}
        <Grid item xs={12} sx={{ display: "flex" }}>
          <Grid
            container
            columnSpacing={1}
            sx={{ display: "flex", justifyContent: "start" }}
          >
            <Grid item>
              <Button3D onClick={handleClickLecturer}>
                Tài khoản giảng viên
              </Button3D>
            </Grid>
            <Grid item>
              <Button3D onClick={handleClickStudent}>
                Tài khoản sinh viên
              </Button3D>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex" }}>
          {accountType && (
            <DataGridTable columns={columns} rows={rows}></DataGridTable>
          )}
        </Grid>
      </Grid>
    </div>
  );
};
export default Account;
