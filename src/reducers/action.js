import axios from "axios";
//async action

export const fetchStudentsAction = async (next) => {
  try {
    next({
      type: "student/showLoading",
    });
    const res = await axios({
      method: "GET",
      url: process.env.REACT_APP_API_URL + "student",
    });
    next({
      type: "student/setStudentList",
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  } finally {
    next({
      type: "student/hideLoading",
    });
  }
};

export const fetchStudentsDetailAction = (id) => {
  return async (next) => {
    try {
      const res = await axios({
        method: "GET",
        url: `https://6340d40ad1fcddf69cbe2698.mockapi.io/student/${id}`,
      });
      next({
        type: "student/setSelectedStudent",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
