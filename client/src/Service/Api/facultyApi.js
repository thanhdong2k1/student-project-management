import axios from "axios";

const facultyApi = {
  getAll: () => {
    try {
      const response = axios.get("http://localhost:5000/api/khoa");
      return response;
    } catch (error) {
      //   // console.log(error);
    }
  },
  post: ({ name, dean }) => {
    try {
      const response = axios.post("http://localhost:5000/api/khoa", {
        name: name,
        dean: dean,
      });
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  delete: async ({ id }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/khoa/${id}`
      );
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  get: ({ id }) => {
    try {
      const response = axios.get(`http://localhost:5000/api/khoa/${id}`);
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  put: ({ name, dean, id }) => {
    try {
      const response = axios.put(`http://localhost:5000/api/khoa/${id}`, {
        name: name,
        dean: dean,
      });
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
};
export default facultyApi;
