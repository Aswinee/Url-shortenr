import React from "react";
import { Formik, Form } from "formik";
import { withRouter } from "react-router-dom";
import form from "./form.jpg";
import axios from "axios";

const API_URL = "https://password-rst.herokuapp.com/api/users";

class Signupp extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      name: "",
      email: "",
      password: "",
      id: null,
    };
  }

  // componentDidMount = () => this.getUsers();

  getUsers = async () => {
    try {
      const { data } = await axios.get(API_URL);
      this.setState({ users: data });
    } catch (err) {
      console.error(err);
    }
  };

  createUser = async () => {
    const { name, email, password, users } = this.state;
    let flag = true;
    //Checking if mentor already exists
    for (let i in users) {
      if (users[i].email == email) {
        flag = false;
      }
    }
    if (flag) {
      var config = {
        method: "post",
        url: API_URL,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          name,
          email,
          password,
        }),
      };

      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.props.history.push("/welcome");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else alert("Already email exists");
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
                this.createUser();
              }}
            >
              {(formik) => (
                <div>
                  <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
                  <Form>
                    <label> Name : </label>
                    <br />
                    <br />
                    <input
                      required
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
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
                    <br /> <br />
                    <label> Password : </label>
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
                      Register
                    </button>
                    <button className="btn btn-danger mt-3 ml-3" type="reset">
                      Reset
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

export default withRouter(Signupp);
