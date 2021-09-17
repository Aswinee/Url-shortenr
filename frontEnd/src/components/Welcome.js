import React from "react";
import welc from "./welcome.jpg";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Table, Form } from "react-bootstrap";

const API_URL = "https://urlshrtenr.herokuapp.com/api/url";

class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      longUrl: "",
      urls: [],
      count: null,
    };
  }

  getUrls = async () => {
    try {
      const { data } = await axios.get(API_URL);
      const count = data.length;
      this.setState({ urls: data, count });
    } catch (err) {
      console.error(err);
    }
  };
  pwdreset = () => {
    console.log("pwd reset");
    this.props.history.push("/passwordReset");
  };

  shortenUrl = async () => {
    const { longUrl, urls } = this.state;
    let flag = true;
    //Checking if url already exists
    for (let i in urls) {
      if (urls[i].longUrl == longUrl) {
        flag = false;
      }
    }
    if (flag) {
      var config = {
        method: "post",
        url: `${API_URL}/shorten`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          longUrl,
        }),
      };

      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.getUrls();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else alert("Already url shortened");
  };

  componentDidMount = () => this.getUrls();

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.shortenUrl();
  };
  render() {
    return (
      <>
        <h1 style={{ textAlign: "center", margin: "30px" }}>
          Welcome to url shortener!
        </h1>

        <div
          className="container d-lg-inline-flex justify-content-center"
          style={{ display: "inline-flex" }}
        >
          <img
            className="img-fluid w-50"
            height="20px"
            src={welc}
            alt="Welcome picture"
          />
          <div className="align-self-center">
            <br />
            <h3>Enter the long Url here</h3>
            <Form onSubmit={this.handleSubmit}>
              <input
                required
                type="url"
                name="longUrl"
                value={this.state.longUrl}
                onChange={this.handleChange}
              />{" "}
              <br />
              <br />
              <input type="Submit" />
            </Form>
            <br />
          </div>
        </div>

        <br />
        <br />
        <h3 style={{ textAlign: "center", margin: "30px" }}>
          List of Shortened urls
        </h3>
        <p style={{ textAlign: "center", margin: "30px" }}>
          Total count: {this.state.count}
        </p>
        <br />

        <Table striped bordered hover className="table " responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Short URL</th>
              <th>Long URL</th>
            </tr>
          </thead>
          <tbody>
            {this.state.urls.map((u) => {
              return (
                <tr key={u._id}>
                  <td>{u.id}</td>
                  <td>{u.date}</td>
                  <td>
                    <a href={u.shortUrl} target="_blank">
                      {u.shortUrl}
                    </a>
                  </td>
                  <td>
                    <a href={u.longUrl} target="_blank">
                      {u.longUrl}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <h3 style={{ textAlign: "center", margin: "30px" }}>Password reset</h3>

        <div style={{ height: "200px", position: "relative" }}>
          <p style={{ textAlign: "center", margin: "30px" }}>
            If you registered using your account, in order to recieve an email
            to reset password, kindly enable access to less secure apps{" "}
            <a
              href="https://support.google.com/accounts/answer/6010255?hl=en"
              target="_blank"
            >
              here
            </a>
          </p>
          <button
            className="btn btn-danger mt-3 ml-3"
            style={{ position: "absolute", left: "45%" }}
            onClick={() => this.pwdreset()}
          >
            Reset Password
          </button>
        </div>
      </>
    );
  }
}

export default withRouter(Welcome);
