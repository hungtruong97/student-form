const initialState = {
  studentList: [],
  isLoading: false,
  selectedStudent: null,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "student/setStudentList": {
      state.studentList = action.payload;
      return { ...state };
    }
    case "student/showLoading": {
      state.isLoading = true;
      return { ...state };
    }
    case "student/hideLoading": {
      state.isLoading = false;
      return { ...state, isLoading: false };
    }
    case "student/setSelectedStudent": {
      state.selectedStudent = action.payload;
      return { ...state };
    }
    case "student/cancelSelectedStudent": {
      state.selectedStudent = null;
      return { ...state };
    }
    case "student/searchStudent": {
      state.studentList = action.payload;
      return { ...state };
    }
    default:
      return state;
  }
};

export default studentReducer;
