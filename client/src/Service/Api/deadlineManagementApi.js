import axios from "axios";

const notifyApi = {
  getAll: () => {
    try {
      const response = axios.get("http://phuongnamdts:5000/api/kiemtra_thongbao");
      return response;
    } catch (error) {
      //   // console.log(error);
    }
  },
  post: ({ name, startDay, endDay }) => {
    try {
      const response = axios.post(
        "http://phuongnamdts:5000/api/kiemtra_thongbao",
        {
          name: name,
          startDay: startDay,
          endDay: endDay,
        }
      );
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  delete: async ({ id }) => {
    try {
      const response = await axios.delete(
        `http://phuongnamdts:5000/api/kiemtra_thongbao/${id}`
      );
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  get: ({ id }) => {
    try {
      const response = axios.get(
        `http://phuongnamdts:5000/api/kiemtra_thongbao/${id}`
      );
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  put: ({ name, notify}) => {
    try {
      const response = axios.put(
        `http://phuongnamdts:5000/api/kiemtra_thongbao/${name}`,
        {
          notify: notify,
        }
      );
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
};
export default notifyApi;
