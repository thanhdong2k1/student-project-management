import Button3D from "../../../Components/Button3D";
import ButtonAdd from "../../../Components/ButtonAdd";
import ButtonExport from "../../../Components/ButtonExport";
import ButtonImport from "../../../Components/ButtonImport";
import DataGridTable from "../../../Components/DataGridTable";
import Tooltip from "@mui/material/Tooltip";
import { GridActionsCellItem } from "@mui/x-data-grid";
import {
  Delete,
  Edit,
  ExpandLess,
  ExpandMore,
  Inbox,
  RemoveRedEye,
  StarBorder,
} from "@mui/icons-material";
import Popup from "../../../Components/Popup";
import { useEffect, useState } from "react";
import {
  Collapse,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import routes from "../../../Routes";
import lecturerApi from "../../../Service/Api/lecturerApi";
import Notification from "awesome-notifications";
import AWN from "awesome-notifications";
import { toast } from "react-toastify";
import Statistical from "./Statistical";
import { useTranslation } from "react-i18next";

const Lecturer = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [idStatistical, setIdStatistical] = useState(false);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const notifier = new Notification({
    position: "top-left",
    // durations: { success: 0 }
  });
  const handleViewClick = (id) => {
    setOpenList(false);
    setOpen(!open);
    setIdStatistical(id);
  };
  const columns = [
    {
      field: "id",
      headerName: "Mã giảng viên",

      minWidth: 50,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "TenGiangVien",
      headerName: "Tên giảng viên",
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
      field: "Email",
      headerName: "Email",
      minWidth: 200,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "SoDT",
      headerName: "Số điện thoại",
      type: "number",
      minWidth: 50,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "TenNganh",
      headerName: "Tên ngành",
      description: "This column has a value getter and is not sortable.",
      minWidth: 50,
      headerAlign: "center",
      flex: 1,
    },
    // {
    //   field: "MaBDT",
    //   headerName: "Mã ban đào tạo",
    //   description: "This column has a value getter and is not sortable.",
    //   minWidth: 50,
    //   headerAlign: "center",
    //   flex: 1,
    // },
    {
      field: "action",
      headerName: `${t("Action")}`,
      description: "",
      minWidth: 100,
      headerAlign: "center",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return [
          <GridActionsCellItem
            icon={
              <Tooltip title="View">
                <RemoveRedEye />
              </Tooltip>
            }
            // className="textPrimary"
            onClick={() => handleViewClick(params.row.id)}
            color="inherit"
          />,
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
    localStorage.setItem("idLecturer", "");
    localStorage.setItem("lecturerEdit", "");
    navigate(`../${routes.admin.addLecturer}`);
  };
  const handleClickEdit = async (id) => {
    const action = await rows.filter((row) => row.id == id);
    // console.log(id, action);
    localStorage.setItem("status", "edit");
    localStorage.setItem("idLecturer", id);
    localStorage.setItem("lecturerEdit", JSON.stringify(action[0]));
    navigate(`../${routes.admin.addLecturer}`);
  };
  const handleClickDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await lecturerApi.delete({ id }).then(() => {
        toast.success(`${t("Delete")} ${t("Success")}`);
        setTimeout(() => {
          navigate(0);
        }, 500);
      });
    }
  };
  useEffect(() => {
    const getLecturer = async () => {
      const responseLecturer = await lecturerApi.getAll();
      // console.log("responseLecturer", responseLecturer);
      const dataTable = await responseLecturer.data.map((res) => {
        return {
          id: res.MaGiangVien,
          TenGiangVien: res.TenGiangVien,
          GioiTinh: res.GioiTinh,
          Email: res.Email,
          SoDT: res.SoDT,
          MaNganh: res.MaNganh,
          TenNganh: res.TenNganh,
          MaBDT: res.MaBDT,
        };
      });
      setRows(dataTable);
    };
    getLecturer();
  }, []);
  // useEffect(() => {
  //   const getLecturer = async () => {
  //     const responseLecturer = await lecturerApi.getAll();
  //     // console.log(responseLecturer);
  //     // const res = responseLecturer.json();
  //     const dataTable = responseLecturer.map((res) => {
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
  //     // // console.log(responseLecturer);
  //   };
  //   getLecturer();
  // }, []);
  const [openList, setOpenList] = useState(false);

  const handleClick = () => {
    setOpenList(!openList);
  };
  return (
    <div>
      <Popup
        open={open}
        onClose={handleViewClick}
        title={"Thống kê"}
        sx={{
          "& .MuiPaper-root": {
            minWidth: "fit-content",
          },
        }}
        content={
          <Statistical
            handleClick={handleClick}
            openList={openList}
            id={idStatistical}
          />
        }
      ></Popup>
      <Grid container spacing={2} xs={12}>
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
        <Grid item xs={12} sx={{ display: "flex" }}>
          <DataGridTable columns={columns} rows={rows}></DataGridTable>
        </Grid>
      </Grid>
    </div>
  );
};
export default Lecturer;
