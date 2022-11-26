const sliceName = "student";

const actionType = {
  SHOW_LOADING: "showLoading",
  HIDE_LOADING: "hideLoading",
  SET_STUDENT_LIST: "setStudentList",
};

Object.keys(actionType).forEach((key) => {
  actionType[key] = sliceName + "/" + actionType[key];
});

export default actionType;
