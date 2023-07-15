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
import notifyApi from "../../../Service/Api/notifyApi";
import Notification from "awesome-notifications";
import AWN from "awesome-notifications";
import { toast } from "react-toastify";
import moment from "moment";
import { useTranslation } from "react-i18next";

const Notify = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
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
      headerName: "Mã thông báo",

      minWidth: 30,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "TenTB",
      headerName: "Tên thông báo",
      minWidth: 400,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "NgayBatDau",
      headerName: "Ngày bắt đầu",
      minWidth: 50,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "NgayKetThuc",
      headerName: "Ngày kết thúc",
      minWidth: 200,
      headerAlign: "center",
      flex: 1,
    },
    // {
    //   field: "MaBanDaoTao",
    //   headerName: "Mã ban đào tạo",
    //   description: "This column has a value getter and is not sortable.",
    //   minWidth: 30,
    //   headerAlign: "center",
    //   flex: 1,
    // },
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
          // <GridActionsCellItem
          //   icon={
          //     <Tooltip title="View">
          //       <RemoveRedEye />
          //     </Tooltip>
          //   }
          //   // className="textPrimary"
          //   onClick={() => handleViewClick(params.row.assetId)}
          //   color="inherit"
          // />,
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
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Delete">
                <Delete onClick={() => handleClickDelete(params.row.id)} />
              </Tooltip>
            }
            // onClick={() => handleDeleteClick(params.row.assetId)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  const handleClickAdd = () => {
    localStorage.setItem("status", "");
    localStorage.setItem("idNotify", "");
    localStorage.setItem("notifyEdit", "");
    navigate(`../${routes.admin.addNotify}`);
  };
  const handleClickEdit = async (id) => {
    const action = await rows.filter((row) => row.id == id);
    // console.log(id, action);
    localStorage.setItem("status", "edit");
    localStorage.setItem("idNotify", id);
    localStorage.setItem("notifyEdit", JSON.stringify(action[0]));
    navigate(`../${routes.admin.addNotify}`);
  };
  const handleClickDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await notifyApi.delete({ id }).then(() => {
        toast.success(`${t("Delete")} ${t("Success")}`);
        setTimeout(() => {
          navigate(0);
        }, 500);
      });
    }
  };
  useEffect(() => {
    const getNotify = async () => {
      const responseNotify = await notifyApi.getAll();
      // console.log("responseNotify", responseNotify);
      const dataTable = await responseNotify.data.map((res) => {
        return {
          id: res.MaTB,
          TenTB: res.TenTB,
          NgayBatDau: moment(res.NgayBatDau).format("DD/MM/YYYY"),
          NgayKetThuc: moment(res.NgayKetThuc).format("DD/MM/YYYY"),
          MaBanDaoTao: res.MaBanDaoTao,
        };
      });
      setRows(dataTable);
    };
    getNotify();
  }, []);
  // useEffect(() => {
  //   const getNotify = async () => {
  //     const responseNotify = await notifyApi.getAll();
  //     // console.log(responseNotify);
  //     // const res = responseNotify.json();
  //     const dataTable = responseNotify.map((res) => {
  //       return {
  //         id: res.MaGiangVien,
  //         TenGiangVien: res.TenGiangVien,
  //         GioiTinh: res.GioiTinh,
  //         Email: res.Email,
  //         SoDT: res.SoDT,
  //         MaNganh: res.MaNganh,
  //         MaBanDaoTao: res.MaBanDaoTao,
  //       };
  //     });
  //     // console.log(dataTable);
  //     setRows(dataTable);
  //     // // console.log(responseNotify);
  //   };
  //   getNotify();
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
        <Grid item xs={12} sx={{ display: "flex" }}>
          <Grid container columnSpacing={1} xs={8} sx={{ display: "flex" }}>
            <Grid item>
              {/* <Button3D>Search</Button3D> */}
            </Grid>
          </Grid>
          <Grid
            container
            columnSpacing={1}
            xs={4}
            sx={{ ml: 6, display: "flex", justifyContent: "end" }}
          >
            <Grid item>
              {/* <ButtonExport></ButtonExport> */}
            </Grid>
            <Grid item>
              {/* <ButtonImport></ButtonImport> */}
            </Grid>
            <Grid item>
              <ButtonAdd onClick={handleClickAdd}></ButtonAdd>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex" }}>
          <DataGridTable columns={columns} rows={rows}></DataGridTable>
        </Grid>
      </Grid>
    </div>
  );
};
export default Notify;
