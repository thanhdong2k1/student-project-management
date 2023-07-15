import axios from "axios";

const branchApi = {
  getAll: () => {
    try {
      const response = axios.get("http://phuongnamdts.com:5000/api/nganh");
      return response;
    } catch (error) {
      //   // console.log(error);
    }
  },
  post: ({ name, faculty }) => {
    try {
      const response = axios.post("http://phuongnamdts.com:5000/api/nganh", {
        name: name,
        faculty: faculty,
      });
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  delete: async ({ id }) => {
    try {
      const response = await axios.delete(
        `http://phuongnamdts.com:5000/api/nganh/${id}`
      );
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  get: ({ id }) => {
    try {
      const response = axios.get(`http://phuongnamdts.com:5000/api/nganh/${id}`);
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  put: ({ name, faculty, id }) => {
    try {
      const response = axios.put(`http://phuongnamdts.com:5000/api/nganh/${id}`, {
        name: name,
        faculty: faculty,
      });
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
};
export default branchApi;
