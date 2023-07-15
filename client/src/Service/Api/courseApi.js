import axios from "axios";

const courseApi = {
  getAll: () => {
    try {
      const response = axios.get("http://phuongnamdts:5000/api/khoadaotao");
      return response;
    } catch (error) {
      //   // console.log(error);
    }
  },
  post: ({ name, note }) => {
    try {
      const response = axios.post("http://phuongnamdts:5000/api/khoadaotao", {
        name: name,
        note: note,
      });
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  delete: async ({ id }) => {
    try {
      const response = await axios.delete(
        `http://phuongnamdts:5000/api/khoadaotao/${id}`
      );
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  get: ({ id }) => {
    try {
      const response = axios.get(`http://phuongnamdts:5000/api/khoadaotao/${id}`);
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  put: ({ name, note, id }) => {
    try {
      const response = axios.put(`http://phuongnamdts:5000/api/khoadaotao/${id}`, {
        name: name,
        note: note,
      });
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
};
export default courseApi;
