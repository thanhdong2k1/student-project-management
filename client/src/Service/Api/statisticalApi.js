import axios from "axios";

const statisticalApi = {
  getGiangVienDoAn: ({ id }) => {
    try {
      const response = axios.get(`http://localhost:5000/api/thongkegiangviendoan/${id}`);
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  getGiangVien: ({ id }) => {
    try {
      const response = axios.get(`http://localhost:5000/api/thongkegiangvien/${id}`);
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  put: ({ email, password, id }) => {
    try {
      const response = axios.put(`http://localhost:5000/api/thongkegiangvien/${id}`, {
        email: email,
        password: password,
      });
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
};
export default statisticalApi;
