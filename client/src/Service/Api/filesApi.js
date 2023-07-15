import axios from "axios";

const filesApi = {
  get: ({ id }) => {
    try {
      const response = axios.get(`http://localhost:5000/files/${id}`);
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  post: (file) => {
    try {
      const response = axios.post("http://localhost:5000/files", file);
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  put: (file, idFile) => {
    try {
      const response = axios.put(`http://localhost:5000/files/${idFile}`, file);
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
};
export default filesApi;
