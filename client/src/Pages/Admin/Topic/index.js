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
import Notification from "awesome-notifications";
import { toast } from "react-toastify";
import topicApi from "../../../Service/Api/topicApi";
import { useTranslation } from "react-i18next";

const Topic = () => {
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
      headerName: "Mã chủ đề",

      minWidth: 50,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "TenChuDe",
      headerName: "Tên chủ đề",
      minWidth: 200,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "GhiChu",
      headerName: "Ghi chú",
      minWidth: 200,
      headerAlign: "center",
      flex: 1,
    },
  ];
  if (roleUser == "bandaotao" || roleUser == "giangvien") {
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
          (roleUser == "bandaotao" || roleUser == "giangvien") && (
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
          (roleUser == "bandaotao" || roleUser == "giangvien") && (
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
    localStorage.setItem("idTopic", "");
    localStorage.setItem("topicEdit", "");
    navigate(`../${routes.admin.addTopic}`);
  };
  const handleClickEdit = async (id) => {
    const action = await rows.filter((row) => row.id == id);
    // console.log(id, action);
    localStorage.setItem("status", "edit");
    localStorage.setItem("idTopic", id);
    localStorage.setItem("topicEdit", JSON.stringify(action[0]));
    navigate(`../${routes.admin.addTopic}`);
  };
  const handleClickDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await topicApi.delete({ id }).then(() => {
        toast.success(`${t("Delete")} ${t("Success")}`);
        setTimeout(() => {
          navigate(0);
        }, 500);
      });
    }
  };
  useEffect(() => {
    const getTopic = async () => {
      const responseTopic = await topicApi.getAll();
      // console.log("responseTopic", responseTopic);
      const dataTable = await responseTopic.data.map((res) => {
        return {
          id: res.MaChuDe,
          TenChuDe: res.TenChuDe,
          GhiChu: res.GhiChu,
        };
      });
      setRows(dataTable);
    };
    getTopic();
  }, []);
  // useEffect(() => {
  //   const getTopic = async () => {
  //     const responseTopic = await topicApi.getAll();
  //     // console.log(responseTopic);
  //     // const res = responseTopic.json();
  //     const dataTable = responseTopic.map((res) => {
  //       return {
  //         id: res.MaChuDe,
  //         TenChuDe: res.TenChuDe,
  //         GioiTinh: res.GioiTinh,
  //         Email: res.Email,
  //         SoDT: res.SoDT,
  //         MaChuDe: res.MaChuDe,
  //         MaBDT: res.MaBDT,
  //       };
  //     });
  //     // console.log(dataTable);
  //     setRows(dataTable);
  //     // // console.log(responseTopic);
  //   };
  //   getTopic();
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
        {roleUser != "sinhvien" && (
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
export default Topic;
