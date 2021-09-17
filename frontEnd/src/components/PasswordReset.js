import React from "react";
import { Formik, Form } from "formik";
import { withRouter } from "react-router-dom";
import form from "./form.jpg";
import axios from "axios";

// const API_URL = "http://localhost:8080/api/users";
const API_URL = "https://password-rst.herokuapp.com/api/password-reset";

class PasswordReset extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      id: null,
    };
  }

  getUsers = async () => {
    try {
      const { data } = await axios.get(API_URL);
      this.setState({ users: data });
    } catch (err) {
      console.error(err);
    }
  };

  getMail = async () => {
    const { name, email, password } = this.state;
    let flag = true;
    if (flag) {
      var config = {
        method: "post",
        url: API_URL,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          email,
        }),
      };

      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.props.history.push("/changePassword");
        })
        .catch(function (error) {
          console.log(error);
          alert("Email does not exist");
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
                this.getMail();
              }}
            >
              {(formik) => (
                <div>
                  <h1 className="my-4 font-weight-bold .display-4">
                    Enter email (with access to less secure apps)
                  </h1>
                  <p>
                    For testing, email: stackfull02@gmail.com password:
                    fullstack8
                  </p>
                  <Form>
                    <br />
                    <br />
                    <label> Email : </label>
                    <br />
                    <br />
                    <input
                      required
                      type="email"
                      name="email"
                      value={this.state.email}
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

export default withRouter(PasswordReset);
