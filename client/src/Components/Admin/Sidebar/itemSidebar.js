import routes from "../../../Routes";
import dashboard from "../../../Assets/Images/dashboard.svg";
import lecturer from "../../../Assets/Images/lecture.svg";
import account from "../../../Assets/Images/account.svg";
import branch from "../../../Assets/Images/branch.svg";
import classIcon from "../../../Assets/Images/class.svg";
import course from "../../../Assets/Images/course.svg";
import deadlineManagement from "../../../Assets/Images/deadline-management.svg";
import faculty from "../../../Assets/Images/faculty.svg";
import notify from "../../../Assets/Images/notify.svg";
import projectManagement from "../../../Assets/Images/project-management.svg";
import student from "../../../Assets/Images/student.svg";
import topic from "../../../Assets/Images/topic.svg";

const itemSidebar = [
  {
    icon: (
      <img
        style={{ marginLeft: "2px" }}
        height="24pt"
        width="24pt"
        src={dashboard}
      />
    ),
    link: `${routes.admin.dashboard}`,
    name: "Dashboard",
    role: ["giangvien", "bandaotao", "sinhvien"],
  },
  {
    icon: (
      <img
        style={{ marginLeft: "2px" }}
        height="24pt"
        width="24pt"
        src={lecturer}
      />
    ),
    link: `${routes.admin.lecturer}`,
    name: "Lecturer",
    role: ["bandaotao"],
  },
  {
    icon: (
      <img
        style={{ marginLeft: "2px" }}
        height="24pt"
        width="24pt"
        src={student}
      />
    ),
    link: `${routes.admin.student}`,
    name: "Student",
    role: ["giangvien", "bandaotao"],
  },
  {
    icon: (
      <img
        style={{ marginLeft: "2px" }}
        height="24pt"
        width="24pt"
        src={classIcon}
      />
    ),
    link: `${routes.admin.class}`,
    name: "Class",
    role: ["giangvien", "bandaotao"],
  },
  {
    icon: (
      <img
        style={{ marginLeft: "2px" }}
        height="24pt"
        width="24pt"
        src={course}
      />
    ),
    link: `${routes.admin.course}`,
    name: "Course",
    role: ["giangvien", "bandaotao"],
  },
  {
    icon: (
      <img
        style={{ marginLeft: "2px" }}
        height="24pt"
        width="24pt"
        src={faculty}
      />
    ),
    link: `${routes.admin.faculty}`,
    name: "Faculty",
    role: ["bandaotao"],
  },
  {
    icon: (
      <img
        style={{ marginLeft: "2px" }}
        height="24pt"
        width="24pt"
        src={branch}
      />
    ),
    link: `${routes.admin.branch}`,
    name: "Branch",
    role: ["bandaotao"],
  },
  {
    icon: (
      <img
        style={{ marginLeft: "2px" }}
        height="24pt"
        width="24pt"
        src={topic}
      />
    ),
    link: `${routes.admin.topic}`,
    name: "Topic",
    role: ["giangvien", "bandaotao", "sinhvien"],
  },
  {
    icon: (
      <img
        style={{ marginLeft: "2px" }}
        height="24pt"
        width="24pt"
        src={projectManagement}
      />
    ),
    link: `${routes.admin.projectManagement}`,
    name: "Project Management",
    role: ["giangvien", "bandaotao", "sinhvien"],
  },
  {
    icon: (
      <img
        style={{ marginLeft: "2px" }}
        height="24pt"
        width="24pt"
        src={account}
      />
    ),
    link: `${routes.admin.account}`,
    name: "Account",
    role: ["bandaotao"],
  },
  {
    icon: (
      <img
        style={{ marginLeft: "2px" }}
        height="24pt"
        width="24pt"
        src={notify}
      />
    ),
    link: `${routes.admin.notify}`,
    name: "Notify",
    role: ["bandaotao"],
  },
  {
    icon: (
      <img
        style={{ marginLeft: "2px" }}
        height="24pt"
        width="24pt"
        src={deadlineManagement}
      />
    ),
    link: `${routes.admin.deadlineManagement}`,
    name: "Deadline Management",
    role: ["bandaotao"],
  },
];
export default itemSidebar;
