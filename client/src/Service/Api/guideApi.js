import axios from "axios";

const guideApi = {
  getAll: () => {
    try {
      const response = axios.get("http://phuongnamdts:5000/api/huongdan");
      return response;
    } catch (error) {
      //   // console.log(error);
    }
  },
  get: ({ id }) => {
    try {
      const response = axios.get(`http://phuongnamdts:5000/api/huongdan/${id}`);
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
  put: ({ note, lecturerConfirm, trainingConfirm, id }) => {
    try {
      const response = axios.put(`http://phuongnamdts:5000/api/huongdan/${id}`, {
        note: note,
        lecturerConfirm: lecturerConfirm,
        trainingConfirm: trainingConfirm,
      });
      return response;
    } catch (error) {
      throw new Error("Lỗi khi tải dữ liệu user");
    }
  },
};
export default guideApi;
