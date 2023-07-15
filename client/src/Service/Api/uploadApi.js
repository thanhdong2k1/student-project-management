import axios from "axios";

const uploadApi = {
  post: (formData) => {
    try {
      const response = axios.post("http://phuongnamdts:5000/upload", formData);
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  // delete: async ({ id }) => {
  //   try {
  //     const response = await axios.delete(
  //       `http://phuongnamdts:5000/api/sinhvien/${id}`
  //     );
  //     return response;
  //   } catch (error) {
  //     throw new Error("Lỗi khi tải dữ liệu user");
  //   }
  // },
  // get: ({ id }) => {
  //   try {
  //     const response = axios.get(`http://phuongnamdts:5000/api/sinhvien/${id}`);
  //     return response;
  //   } catch (error) {
  //     throw new Error("Lỗi khi tải dữ liệu user");
  //   }
  // },
  // put: ({
  //   name,
  //   gender,
  //   yearOfBirth,
  //   homeTown,
  //   email,
  //   phone,
  //   classroom,
  //   id,
  // }) => {
  //   try {
  //     const response = axios.put(`http://phuongnamdts:5000/api/sinhvien/${id}`, {
  //       name: name,
  //       gender: gender,
  //       yearOfBirth: yearOfBirth,
  //       homeTown: homeTown,
  //       email: email,
  //       phone: phone,
  //       classroom: classroom,
  //     });
  //     return response;
  //   } catch (error) {
  //     throw new Error("Lỗi khi tải dữ liệu user");
  //   }
  // },
};
export default uploadApi;
