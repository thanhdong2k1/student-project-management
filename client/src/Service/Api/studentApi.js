import axios from "axios";

const studentApi = {
  getAll: () => {
    try {
      const response = axios.get("http://phuongnamdts.com:5000/api/sinhvien");
      return response;
    } catch (error) {
      //   // console.log(error);
    }
  },
  post: ({ name, gender, yearOfBirth, homeTown, email, phone, classroom }) => {
    try {
      const response = axios.post("http://phuongnamdts.com:5000/api/sinhvien", {
        name: name,
        gender: gender,
        yearOfBirth:yearOfBirth,
        homeTown:homeTown,
        email: email,
        phone: phone,
        classroom: classroom,
      });
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  delete: async ({ id }) => {
    try {
      const response = await axios.delete(
        `http://phuongnamdts.com:5000/api/sinhvien/${id}`
      );
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  get: ({ id }) => {
    try {
      const response = axios.get(`http://phuongnamdts.com:5000/api/sinhvien/${id}`);
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  put: ({ name, gender, yearOfBirth, homeTown, email, phone, classroom, id }) => {
    try {
      const response = axios.put(`http://phuongnamdts.com:5000/api/sinhvien/${id}`, {
        name: name,
        gender: gender,
        yearOfBirth:yearOfBirth,
        homeTown:homeTown,
        email: email,
        phone: phone,
        classroom: classroom,
      });
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
};
export default studentApi;
