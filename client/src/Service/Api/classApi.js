import axios from "axios";

const classApi = {
  getAll: () => {
    try {
      const response = axios.get("http://phuongnamdts.com:5000/api/lop");
      return response;
    } catch (error) {
      //   // console.log(error);
    }
  },
  post: ({ name, quantity, branch, course }) => {
    try {
      const response = axios.post("http://phuongnamdts.com:5000/api/lop", {
        name: name,
        quantity: quantity,
        branch: branch,
        course: course,
      });
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  delete: async ({ id }) => {
    try {
      const response = await axios.delete(
        `http://phuongnamdts.com:5000/api/lop/${id}`
      );
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  get: ({ id }) => {
    try {
      const response = axios.get(`http://phuongnamdts.com:5000/api/lop/${id}`);
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  put: ({ name, quantity, branch, course, id }) => {
    try {
      const response = axios.put(`http://phuongnamdts.com:5000/api/lop/${id}`, {
        name: name,
        quantity: quantity,
        branch: branch,
        course: course,
      });
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
};
export default classApi;
