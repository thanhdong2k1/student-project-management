import axios from "axios";

const filesApi = {
  get: ({ id }) => {
    try {
      const response = axios.get(`http://phuongnamdts.com:5000/files/${id}`);
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  post: (file) => {
    try {
      const response = axios.post("http://phuongnamdts.com:5000/files", file);
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  put: (file, idFile) => {
    try {
      const response = axios.put(`http://phuongnamdts.com:5000/files/${idFile}`, file);
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
};
export default filesApi;
