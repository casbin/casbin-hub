import React from 'react'
import { Spin } from "antd";
import * as setting from '../Setting'
import * as Backend from '../Backend'

class Callback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      addition: props.match.params.addition,
      state: "",
      code: ""
    };
    const params = new URLSearchParams(this.props.location.search);
    this.state.code = params.get("code");
    this.state.state = params.get("state");
    setting.initFullClientUrl();
    Backend.initServerUrl();
  }

  getAuthenticatedInfo() {
    let redirectUrl;
    redirectUrl = `${setting.ClientUrl}/callback/${this.state.addition}`;
    Backend.githubLogin(this.state.code, this.state.state, redirectUrl, this.state.addition)
      .then((res) => {
        if (res.status === "ok") {
          // window.location.href = '/dashboard/home';
          console.log(res.data)
          this.props.history.push(
            {pathname: "/dashboard/home",
            state:{
              isAuthenticated: res.data.isAuthenticated,
              isSignedUp: res.data.isSignedUp,
              email: res.data.email,
              account: res.data.addition,
              avatar: res.data.avatar,
              isAdmin: res.data.isAdmin
            }})
        } else {
          setting.showMessage("error", res?.msg);
        }
      });

  }

  componentDidMount() {
    this.getAuthenticatedInfo();
  }

  render() {
    return (
      // https://codesandbox.io/s/antd-reproduction-template-q2dwk
      <div className="App">
        <Spin size="large" tip="Logging in..." style={{ paddingTop: "10%", paddingLeft: "50%" }} />
      </div>
    )
  }
}

export default Callback;

