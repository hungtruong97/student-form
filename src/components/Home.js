import React, { Component } from "react";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import axios from "axios";
import { connect } from "react-redux";

export class Home extends Component {
  fetchStudents = async () => {
    try {
      this.props.dispatch({
        type: "student/showLoading",
      });
      const res = await axios({
        method: "GET",
        url: "https://6340d40ad1fcddf69cbe2698.mockapi.io/student",
      });
      this.props.dispatch({
        type: "student/setStudentList",
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    } finally {
      this.props.dispatch({
        type: "student/hideLoading",
      });
    }
  };

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Student Form</h1>
        <StudentForm fetchStudents={this.fetchStudents} />
        <StudentList fetchStudents={this.fetchStudents} />
      </div>
    );
  }

  componentDidMount() {
    this.fetchStudents();
  }
}

export default connect()(Home);
