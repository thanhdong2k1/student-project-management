import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Admin";
import Class from "./Pages/Admin/Class";
import Course from "./Pages/Admin/Course";
import Faculty from "./Pages/Admin/Faculty";
import Lecturer from "./Pages/Admin/Lecturer";
import AddLecturer from "./Pages/Admin/Lecturer/AddLecturer";
import Topic from "./Pages/Admin/Topic";
import ProjectManagement from "./Pages/Admin/ProjectManagement";
import Student from "./Pages/Admin/Student";
import routes from "./Routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Branch from "./Pages/Admin/Branch";
import AddFaculty from "./Pages/Admin/Faculty/AddFaculty";
import AddBranch from "./Pages/Admin/Branch/AddBranch";
import AddCourse from "./Pages/Admin/Course/AddCourse";
import AddClass from "./Pages/Admin/Class/AddClass";
import AddStudent from "./Pages/Admin/Student/AddStudent";
import AddProjectManagement from "./Pages/Admin/ProjectManagement/AddProjectManagement";
import AddTopic from "./Pages/Admin/Topic/AddTopic";
import Login from "./Pages/Login";
import { useEffect } from "react";
import Notify from "./Pages/Admin/Notify";
import AddNotify from "./Pages/Admin/Notify/AddNotify";
import General from "./Pages/General";
import Account from "./Pages/Admin/Account";
import AddAccount from "./Pages/Admin/Account/AddAccount";
import notifyApi from "./Service/Api/notifyApi";
import moment from "moment";
import DeadlineManagement from "./Pages/Admin/DeadlineManagement";
import AddDeadlineManagement from "./Pages/Admin/DeadlineManagement/AddDeadlineManagement";
const defaultTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});
function App() {
  // localStorage.setItem("roleUser", "");
  const roleUser = localStorage.getItem("roleUser");
  // console.log(localStorage);
  // useEffect(() => {
  //   const getNotify = async () => {
  //     const responseNotify = await notifyApi.getAll();
  //     // console.log("responseNotify", responseNotify);
  //     const dataTable = await responseNotify.data.map((res) => {
  //       return {
  //         id: res.MaTB,
  //         title: res.TenTB,
  //         startDate: moment(res.NgayBatDau).format("DD/MM/YYYY"),
  //         endDate: moment(res.NgayKetThuc).format("DD/MM/YYYY"),
  //         MaBanDaoTao: res.MaBanDaoTao,
  //       };
  //     });
  //     dataTable.forEach((res) => {
  //       if (
  //         moment().isBetween(
  //           moment(res.startDate, "DD/MM/YYYY"),
  //           moment(res.endDate, "DD/MM/YYYY"),
  //           "day"
  //         )
  //       ) {
  //         // console.log(1);
  //         toast.info(res.title); // current date is between startTime and endTime
  //       } else if (moment(res.endDate, "DD/MM/YYYY").isSame(moment(), "day")) {
  //         // console.log(2);
  //         toast.warn(res.title); // current day is same as the end day
  //       }
  //     });
  //   };
  //   getNotify();
  // }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer
        position="top-right"
        newestOnTop
        autoClose={3000}
      ></ToastContainer>
      <Routes>
        <Route
          path="/"
          element={roleUser ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="admin" element={<Dashboard />}>
          <Route path={routes.admin.dashboard} element={<General />} />
          <Route path={routes.admin.lecturer} element={<Lecturer />} />
          <Route path={routes.admin.addLecturer} element={<AddLecturer />} />
          <Route path={routes.admin.student} element={<Student />} />
          <Route path={routes.admin.addStudent} element={<AddStudent />} />
          <Route path={routes.admin.class} element={<Class />} />
          <Route path={routes.admin.addClass} element={<AddClass />} />
          <Route path={routes.admin.course} element={<Course />} />
          <Route path={routes.admin.addCourse} element={<AddCourse />} />
          <Route path={routes.admin.faculty} element={<Faculty />} />
          <Route path={routes.admin.addFaculty} element={<AddFaculty />} />

          <Route path={routes.admin.branch} element={<Branch />} />
          <Route path={routes.admin.addBranch} element={<AddBranch />} />
          <Route
            path={routes.admin.projectManagement}
            element={<ProjectManagement />}
          />
          <Route
            path={routes.admin.addProjectManagement}
            element={<AddProjectManagement />}
          />

          <Route path={routes.admin.topic} element={<Topic />} />
          <Route path={routes.admin.addTopic} element={<AddTopic />} />
          <Route path={routes.admin.notify} element={<Notify />} />
          <Route path={routes.admin.addNotify} element={<AddNotify />} />
          <Route path={routes.admin.account} element={<Account />} />
          <Route path={routes.admin.addAccount} element={<AddAccount />} />
          <Route path={routes.admin.deadlineManagement} element={<DeadlineManagement />} />
          <Route path={routes.admin.addDeadlineManagement} element={<AddDeadlineManagement />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
