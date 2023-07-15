import axios from "axios";

const projectManagementApi = {
  getAll: () => {
    try {
      const response = axios.get("http://localhost:5000/api/doan");
      return response;
    } catch (error) {
      //   // console.log(error);
    }
  },
  post: ({ name, topic, student, lecturer, softCopy, point, minutes }) => {
    try {
      const response = axios.post("http://localhost:5000/api/doan", {
        name: name,
        topic: topic,
        student: student,
        lecturer: lecturer,
        softCopy: softCopy,
        point: point,
        minutes: minutes,
      });
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  delete: async ({ id }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/doan/${id}`
      );
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  get: ({ id }) => {
    try {
      const response = axios.get(`http://localhost:5000/api/doan/${id}`);
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  put: ({ name, topic, student, lecturer, softCopy, point, minutes, id }) => {
    try {
      const response = axios.put(`http://localhost:5000/api/doan/${id}`, {
        name: name,
        topic: topic,
        student: student,
        lecturer: lecturer,
        softCopy: softCopy,
        point: point,
        minutes: minutes,
      });
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
};
export default projectManagementApi;
