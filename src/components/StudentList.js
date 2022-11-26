import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { fetchStudentsDetailAction } from "../reducers/action";

export class StudentList extends Component {
  handleDelete = async (id) => {
    try {
      await axios({
        method: "DELETE",
        url: `https://6340d40ad1fcddf69cbe2698.mockapi.io/student/${id}`,
      });
      this.props.fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  handleEdit = async (id) => {
    this.props.dispatch(fetchStudentsDetailAction(id));
  };

  handleSearch = async (e) => {
    try {
      const keyword = e.target.value;
      const res = await axios({
        method: "GET",
        url: "https://6340d40ad1fcddf69cbe2698.mockapi.io/student",
      });

      const filteredStudentList = res.data.filter(
        (item) =>
          item.fullName.includes(keyword) ||
          item.id.includes(keyword) ||
          item.phone.includes(keyword) ||
          item.email.includes(keyword)
      );

      console.log(filteredStudentList);

      this.props.dispatch({
        type: "student/searchStudent",
        payload: filteredStudentList,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <div className="input-group mt-5 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter your keyword"
            aria-describedby="search"
            onChange={this.handleSearch}
          />
          <span className="input-group-text" id="search">
            Search
          </span>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Full Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!this.props.isLoading &&
              this.props.students.map((student) => {
                const { id, fullName, phone, email } = student;
                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{fullName}</td>
                    <td>{phone}</td>
                    <td>{email}</td>
                    <td>
                      <button
                        className="btn btn-danger me-3"
                        onClick={(e) => {
                          e.preventDefault();
                          this.handleDelete(id);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          this.handleEdit(id);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {this.props.isLoading && (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students.studentList,
    isLoading: state.students.isLoading,
  };
};

export default connect(mapStateToProps)(StudentList);
