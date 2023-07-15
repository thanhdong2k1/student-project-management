import axios from "axios";

const notifyApi = {
  getAll: () => {
    try {
      const response = axios.get("http://localhost:5000/api/thongbao");
      return response;
    } catch (error) {
      //   // console.log(error);
    }
  },
  post: ({ name, startDay, endDay }) => {
    try {
      const response = axios.post("http://localhost:5000/api/thongbao", {
        name: name,
        startDay: startDay,
        endDay: endDay,
      });
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  delete: async ({ id }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/thongbao/${id}`
      );
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  get: ({ id }) => {
    try {
      const response = axios.get(`http://localhost:5000/api/thongbao/${id}`);
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  put: ({ name, startDay, endDay, id }) => {
    try {
      const response = axios.put(`http://localhost:5000/api/thongbao/${id}`, {
        name: name,
        startDay: startDay,
        endDay: endDay,
      });
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
};
export default notifyApi;
