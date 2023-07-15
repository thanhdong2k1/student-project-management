import axios from "axios";

const lecturerApi = {
  getAll: () => {
    try {
      const response = axios.get("http://phuongnamdts:5000/api/giangvien");
      return response;
    } catch (error) {
      //   // console.log(error);
    }
  },
  post: ({ name, gender, email, phone, industry }) => {
    try {
      const response = axios.post("http://phuongnamdts:5000/api/giangvien", {
        name: name,
        gender: gender,
        email: email,
        phone: phone,
        industry: industry,
      });
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  delete: async ({ id }) => {
    try {
      const response = await axios.delete(
        `http://phuongnamdts:5000/api/giangvien/${id}`
      );
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  get: ({ id }) => {
    try {
      const response = axios.get(`http://phuongnamdts:5000/api/giangvien/${id}`);
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  put: ({ name, gender, email, phone, industry, id }) => {
    try {
      const response = axios.put(`http://phuongnamdts:5000/api/giangvien/${id}`, {
        name: name,
        gender: gender,
        email: email,
        phone: phone,
        industry: industry,
      });
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
};
export default lecturerApi;
