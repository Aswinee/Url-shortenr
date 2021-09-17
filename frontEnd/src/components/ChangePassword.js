import React from "react";
import { Formik, Form } from "formik";
import { withRouter } from "react-router-dom";
import form from "./form.jpg";
import axios from "axios";

const API_URL = "https://password-rst.herokuapp.com/api/password-reset";

class ChangePassword extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      string: "",
      email: "",
      password: "",
      id: null,
    };
  }

  changePassword = async () => {
    const { string, email, password, users } = this.state;
    let flag = true;
    for (let i in users) {
      if (users[i].email == email) {
        flag = false;
      }
    }
    if (flag) {
      var config = {
        method: "post",
        url: `${API_URL}/${string}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          password,
        }),
      };

      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          alert(
            `Password reset! ${response.data.email}${response.data.password}`
          );
          this.props.history.push("/welcome");
        })
        .catch(function (error) {
          console.log(error);
          alert("error");
        });
    }
  };
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-5">
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
              }}
              onSubmit={(values) => {
                this.changePassword();
              }}
            >
              {(formik) => (
                <div>
                  <h1 className="my-4 font-weight-bold .display-4">
                    Reset Password
                  </h1>
                  <p>
                    For testing, email: stackfull02@gmail.com password:
                    fullstack8
                  </p>
                  <Form>
                    <label> Enter the string: </label>
                    <br />
                    <br />
                    <input
                      required
                      type="text"
                      name="string"
                      value={this.state.string}
                      onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    <label> Enter new Password: </label>
                    <br />
                    <br />
                    <input
                      required
                      type="text"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />

                    <br />
                    <button className="btn btn-primary mt-3" type="submit">
                      Change Password
                    </button>
                  </Form>
                </div>
              )}
            </Formik>
          </div>
          <div className="col-md-7 my-auto">
            <img className="img-fluid w-100" src={form} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ChangePassword);
