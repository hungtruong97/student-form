import React, { Component } from "react";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import { connect } from "react-redux";
import { fetchStudentsAction } from "../reducers/action";

export class Home extends Component {
  fetchStudents = async () => {
    this.props.dispatch(fetchStudentsAction);
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
