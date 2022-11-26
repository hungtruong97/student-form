import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

const initialFormData = {
  id: "",
  fullName: "",
  phone: "",
  email: "",
};

export class StudentForm extends Component {
  state = {
    formData: initialFormData,
    type: "add",
  };

  static getDerivedStateFromProps(nextProps, currentState) {
    if (!nextProps.selectedStudent) {
      return { formData: initialFormData };
    }
    if (currentState.formData.id === nextProps.selectedStudent.id) {
      return currentState;
    }
    return {
      formData: nextProps.selectedStudent,
      type: "update",
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      formData: { ...this.state.formData, [e.target.name]: e.target.value },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "POST",
        url: process.env.REACT_APP_API_URL + "/student",
        data: this.state.formData,
      });

      this.props.fetchStudents();
    } catch (err) {
      console.log(err);
    }
  };

  handleCancel = () => {
    this.props.dispatch({
      type: "student/cancelSelectedStudent",
    });
    this.setState({
      type: "submit",
    });
  };

  handleUpdate = async (id) => {
    try {
      await axios({
        method: "PUT",
        url: "https://6340d40ad1fcddf69cbe2698.mockapi.io/student/" + id,
        data: this.state.formData,
      });
      this.props.fetchStudents();
      this.handleCancel();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="card">
        <div className="card-header">
          <h4>Sign Up Form</h4>
        </div>
        <div className="card-body">
          <form className="row g-3" onSubmit={this.handleSubmit}>
            <div className="col-6">
              <label htmlFor="id">Student ID</label>
              <input
                type="text"
                className="form-control"
                value={this.state.formData.id}
                id="id"
                onChange={this.handleChange}
                name="id"
                disabled={this.state.type === "update" && true}
              />
            </div>
            <div className="col-6">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={this.state.formData.fullName}
                id="fullName"
                onChange={this.handleChange}
                name="fullName"
              />
            </div>
            <div className="col-6">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                className="form-control"
                value={this.state.formData.phone}
                id="phone"
                onChange={this.handleChange}
                name="phone"
              />
            </div>
            <div className="col-6">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                value={this.state.formData.email}
                id="email"
                onChange={this.handleChange}
                name="email"
              />
            </div>
            {this.state.type === "submit" ? (
              <button className="btn btn-success col-1 me-3" type="submit">
                Submit
              </button>
            ) : (
              <button
                className="btn btn-primary col-1 me-3"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  this.handleUpdate(this.props.selectedStudent.id);
                }}
              >
                Update
              </button>
            )}
            <button
              className="btn btn-danger col-1"
              onClick={(e) => {
                e.preventDefault();
                this.handleCancel();
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedStudent: state.students.selectedStudent,
  };
};

export default connect(mapStateToProps)(StudentForm);
