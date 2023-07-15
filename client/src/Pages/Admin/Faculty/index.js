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
import facultyApi from "../../../Service/Api/facultyApi";
import { useTranslation } from "react-i18next";

const Faculty = () => {
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
      headerName: "Mã khoa",

      minWidth: 50,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "TenKhoa",
      headerName: "Tên khoa",
      minWidth: 200,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "TruongKhoa",
      headerName: "Trưởng khoa",
      minWidth: 200,
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
    localStorage.setItem("idFaculty", "");
    localStorage.setItem("facultyEdit", "");
    navigate(`../${routes.admin.addFaculty}`);
  };
  const handleClickEdit = async (id) => {
    const action = await rows.filter((row) => row.id == id);
    // console.log(id, action);
    localStorage.setItem("status", "edit");
    localStorage.setItem("idFaculty", id);
    localStorage.setItem("facultyEdit", JSON.stringify(action[0]));
    navigate(`../${routes.admin.addFaculty}`);
  };
  const handleClickDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await facultyApi.delete({ id }).then(() => {
        toast.success(`${t("Delete")} ${t("Success")}`);
        setTimeout(() => {
          navigate(0);
        }, 500);
      });
    }
  };
  useEffect(() => {
    const getFaculty = async () => {
      const responseFaculty = await facultyApi.getAll();
      // console.log("responseFaculty", responseFaculty);
      const dataTable = await responseFaculty.data.map((res) => {
        return {
          id: res.MaKhoa,
          TenKhoa: res.TenKhoa,
          TruongKhoa: res.TruongKhoa,
        };
      });
      setRows(dataTable);
    };
    getFaculty();
  }, []);
  // useEffect(() => {
  //   const getFaculty = async () => {
  //     const responseFaculty = await facultyApi.getAll();
  //     // console.log(responseFaculty);
  //     // const res = responseFaculty.json();
  //     const dataTable = responseFaculty.map((res) => {
  //       return {
  //         id: res.MaKhoa,
  //         TenKhoa: res.TenKhoa,
  //         GioiTinh: res.GioiTinh,
  //         Email: res.Email,
  //         SoDT: res.SoDT,
  //         MaNganh: res.MaNganh,
  //         MaBDT: res.MaBDT,
  //       };
  //     });
  //     // console.log(dataTable);
  //     setRows(dataTable);
  //     // // console.log(responseFaculty);
  //   };
  //   getFaculty();
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
export default Faculty;
