import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import DataGridTable from "../../../../Components/DataGridTable";
import statisticalApi from "../../../../Service/Api/statisticalApi";

const Statistical = ({ handleClick, openList, id }) => {
  const [rows, setRows] = useState([]);
  const [rowsGVDA, setRowsGVDA] = useState([]);
  const columns = [
    {
      field: "id",
      headerName: "Mã giảng viên",

      minWidth: 100,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "TenGiangVien",
      headerName: "Tên giảng viên",
      minWidth: 170,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "SoDoAn",
      headerName: "Số đồ án",
      minWidth: 100,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "DaNopDA",
      headerName: "Đã nộp đồ án",
      minWidth: 100,
      headerAlign: "center",
      flex: 1,
    },
    // DaXacNhanBDT: res.DaXacNhanBDT,
    //       DaXacNhanGV: res.DaXacNhanGV,
    //       DaNopDA: res.DaNopDA,
    //       DaCoBienBan: res.DaCoBienBan,
    //       DaCoDiem: res.DaCoDiem,
    {
      field: "DaXacNhanGV",
      headerName: "GV xác nhận",
      minWidth: 100,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "DaXacNhanBDT",
      headerName: "BĐT xác nhận",
      minWidth: 100,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "DaCoBienBan",
      headerName: "Đã có biên bản",
      minWidth: 100,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "DaCoDiem",
      headerName: "Đã có điểm",
      minWidth: 100,
      headerAlign: "center",
      flex: 1,
    },
  ];
  const columnsGVDA = [
    // {
    //   field: "MaGiangVien",
    //   headerName: "Mã giảng viên",

    //   minWidth: 100,
    //   headerAlign: "center",
    //   flex: 1,
    // },
    {
      field: "TenGiangVien",
      headerName: "Tên giảng viên",
      minWidth: 170,
      headerAlign: "center",
      flex: 1,
    },
    {
        field: "TenSinhVien",
        headerName: "Tên sinh viên",
        minWidth: 170,
        headerAlign: "center",
        flex: 1,
      },
    {
      field: "TenDeTai",
      headerName: "Tên đề tài",
      minWidth: 250,
      headerAlign: "center",
      flex: 1,
    },
    // TenDeTai: res.TenDeTai,
    // XacNhanBDT: res.XacNhanBDT,
    // XacNhanGV: res.XacNhanGV,
    // BanMemDA: res.BanMemDA,
    // BienBan: res.BienBan,
    // DiemDA: res.DiemDA,
    {
      field: "BanMemDA",
      headerName: "Bản mềm",
      minWidth: 100,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "XacNhanGV",
      headerName: "GV xác nhận",
      minWidth: 100,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "XacNhanBDT",
      headerName: "BĐT xác nhận",
      minWidth: 100,
      headerAlign: "center",
      flex: 1,
    },
    
    {
      field: "BienBan",
      headerName: "Biên bản",
      minWidth: 100,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "DiemDA",
      headerName: "Điểm",
      minWidth: 100,
      headerAlign: "center",
      flex: 1,
    },
  ];

  useEffect(() => {
    const getLecturer = async () => {
      const responseLecturer = await statisticalApi.getGiangVien({ id });
      // console.log(id);
      // console.log("responseLecturer", responseLecturer);
      const dataTable = await responseLecturer.data.map((res) => {
        return {
          id: res.MaGiangVien,
          TenGiangVien: res.TenGiangVien,
          SoDoAn: res.SoDoAn,
          DaXacNhanBDT: res.DaXacNhanBDT,
          DaXacNhanGV: res.DaXacNhanGV,
          DaNopDA: res.DaNopDA,
          DaCoBienBan: res.DaCoBienBan,
          DaCoDiem: res.DaCoDiem,
          ChuaNopDA: res.ChuaNopDA,
          ChuaXacNhanBDT: res.ChuaXacNhanBDT,
          ChuaXacNhanGV: res.ChuaXacNhanGV,
        };
      });
      setRows(dataTable);
    };
    getLecturer();
  }, []);
  useEffect(() => {
    const getLecturerProject = async () => {
      const responseLecturerProject = await statisticalApi.getGiangVienDoAn({
        id,
      });
      // console.log(id);
      // console.log("responseLecturerProject", responseLecturerProject);
      const dataTable = await responseLecturerProject.data.map((res) => {
        // console.log(res);
        return {
          MaGiangVien: res.MaGiangVien,
          TenGiangVien: res.TenGiangVien,
          TenSinhVien: res.TenSinhVien,
          id: res.MaDeTai,
          TenDeTai: res.TenDeTai,
          XacNhanBDT: res.XacNhanBDT,
          XacNhanGV: res.XacNhanGV,
          BanMemDA: res.BanMemDA,
          BienBan: res.BienBan,
          DiemDA: res.DiemDA,
        };
      });
      setRowsGVDA(dataTable);
    };
    getLecturerProject();
  }, [openList]);
  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper", m: 0, p: 0 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      // subheader={
      //   <ListSubheader component="div" id="nested-list-subheader">
      //     Nested List Items
      //   </ListSubheader>
      // }
    >
      <ListItemButton onClick={handleClick} sx={{ p: 0, m: 0 }}>
        <ListItemText
          primary={
            <DataGridTable
              columns={columns}
              rows={rows}
              autoHeight={true}
              height="100%"
              sx={{ "& .MuiDataGrid-footerContainer": { display: "none" } }}
            ></DataGridTable>
          }
          sx={{ p: 0, m: 0 }}
        />
        {openList ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText
              primary={
                <DataGridTable
                  columns={columnsGVDA}
                  rows={rowsGVDA}
                  autoHeight={true}
                  height="100%"
                ></DataGridTable>
              }
              sx={{ p: 0, m: 0 }}
            />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
};
export default Statistical;
