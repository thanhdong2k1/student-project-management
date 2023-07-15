import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const locales = {
  en: "English",
  vi: "Tiếng việt",
};

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      Lecturer: "Lecturer",
      Student: "Student",
      Class: "Class",
      Course: "Course",
      Department: "Department",
      Faculty: "Faculty",
      "Project Management": "Project Management",
      Project: "Project",
      Topic: "Topic",
      Notify: "Notify",
      Branch: "Branch",
      Add: "Add",
      Action: "Action",
      Account: "Account",
      Save: "Save",
      Cancel: "Cancel",
      Expired: "Expired",
      "Deadline Management": "Deadline Management",
      Create: "Create",
      Update: "Update",
      Delete: "Delete",
      Success: "Success",
      Name: "Name",
      Gender: "Gender",
      Phone: "Phone",
      "Home town": "Home town",
      "Year of birth": "Year of birth",
      Quantity: "Quantity",
      Note: "Note",
      Dean: "Dean",
      Logout: "Logout",
      "Project soft copy": "Project soft copy",
      "Project minutes": "Project minutes",
      "Start day": "Start day",
      "End day": "End day",
    },
  },
  vi: {
    translation: {
      Lecturer: "Giảng viên",
      Student: "Sinh viên",
      Class: "Lớp",
      Course: "Khóa học",
      Department: "Bộ môn",
      Faculty: "Khoa",
      Branch: "Ngành",
      "Project Management": "Quản lí đồ án",
      Project: "Đồ án",
      Topic: "Chủ đề",
      Notify: "Thông báo",
      Account: "Tài khoản",
      Add: "Thêm",
      Action: "Hành động",
      Save: "Lưu",
      Cancel: "Hủy",
      Logout: "Đăng xuất",
      Expired: "Hết hạn",
      "Deadline Management": "Quản lí thời hạn",
      Create: "Tạo",
      Update: "Cập nhật",
      Delete: "Xóa",
      Success: "Thành công",
      Name: "Tên",
      Gender: "Giới tính",
      Phone: "Điện thoại",
      "Home town": "Quê quán",
      "Year of birth": "Năm sinh",
      Quantity: "Số lượng",
      Note: "Ghi chú",
      Dean: "Trưởng khoa",
      "Project soft copy": "Bản mềm đồ án",
      "Project minutes": "Biên bản",
      "Start day": "Ngày bắt đầu",
      "End day": "Ngày kết thúc",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "vi", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    fallbackLng: "vi",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export { locales, i18n };
