import React from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { Avatar, Dropdown, Layout, Menu, message } from 'antd';
import './frame.css';
import * as setting from './Setting'
import * as Backend from './Backend'
import { LoginOutlined, DownOutlined, UserOutlined, HomeOutlined, GroupOutlined, HeartFilled } from '@ant-design/icons';
import {dashboardRoutes} from "./routes";
import Home from "./pages/dashboard/Home";

const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      selectedMenuKey: 0,
      account: null,
    };
  }

  componentWillMount() {
    // this.getAccount();
    Backend.initServerUrl();
    setting.initFullClientUrl();
    this.getAccount();
  }

  getAccount(msg) {
    if(msg!==undefined){
      this.setState({
        account: msg,
      })
    }
    
  }

  handleRightDropdownClick(e) {
    if (e.key === '0') {
      this.props.history.push(`/account`);
    } else if (e.key === '1') {
      this.logout();
    }
  }

  renderRightDropdown() {
    const menu = (
      <Menu
        onClick={p => this.adminRoute(p.key)}>
        <Menu.Item key="My account" icon={<UserOutlined />}>My account</Menu.Item>
        <Menu.Item key="logout" icon={<LoginOutlined />}>Logout</Menu.Item>
      </Menu>)

    return (
      <Dropdown key="4" overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" href="/" style={{ float: 'right' }}>
          <Avatar src={this.state.account.avatar} size="large">
            {setting.getShortName(this.state.account.account)}
          </Avatar>
                &nbsp;
                &nbsp;
                {setting.getShortName(this.state.account.account)} &nbsp; <DownOutlined />
                &nbsp;
                &nbsp;
                &nbsp;
              </a>
      </Dropdown>
    )
  }

  adminRoute(option) {
    if (option === "logout") {
      this.logout();
    } else if (option === "My account") {
      if (this.state.account.isAdmin) {
        message.info("You are Admin User!  You can edit all subjects", 0.5)
      } else (
        message.info("You are not Admin User!  You can only edit your subjects", 0.5)
      )
    };
  }

  renderAccount() {
    let res = [];
    if (this.state.account === undefined) {
      this.setState(
        {
          account: null,
        }
      )
    }else if(this.state.account === null){
      res.push(
        <div key="0" onClick={() => setting.getGithubAuthCode("signup")}>
          <LoginOutlined style={{ marginRight: '0.25rem', marginTop: '0.5rem', fontSize: '1rem' }} /> <a href="/" style={{ marginRight: '1rem', marginTop: '0.5rem' }}>Login with Github</a>
        </div>
      );
    } else {
      res.push(this.renderRightDropdown());
    }

    return res;
  }

  logout() {
    this.setState({
      expired: false,
      submitted: false,
    });

    Backend.logout()
      .then((res) => {
        if (res.status === 'ok') {
          this.setState({
            account: null
          });

          setting.showMessage("success", `Successfully logged out, redirected to homepage`);

          setting.goToLink("/");
        } else {
          setting.showMessage("error", `Logout failed: ${res.msg}`);
        }
      });
  }

  onLogined() {
    this.getAccount();
  }

  onUpdateAccount(account) {
    this.setState({
      account: account
    });
  }

  render() {
    return (
      <div id='frame'>
        <Layout id="content-wrap" style={{ minHeight: '100vh' }}>
          <Header className="header" style={{
            backgroundColor: "#FFFFFF",
          }}>
            <div className="logo" />
            {
              this.renderAccount()
            }
            {/* <Dropdown overlay={popMenu} trigger={['click']}>
                            <div>
                                <Avatar style={{ marginRight: '1rem' }}>U</Avatar>
                                <a href="/" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    Admin <DownOutlined />
                                </a>
                            </div>
                        </Dropdown> */}
          </Header>
          <Content style={{ padding: '0 3rem' }}>
            <Layout className="site-layout-background" style={{ padding: '1.5rem 0' }}>
              <Sider className="site-layout-background" width={200}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%' }}
                >
                  <Menu.Item style={{ marginTop: '1rem' }} onClick={p => this.props.history.push("/dashboard/home")} icon={<HomeOutlined />}>
                    Home
                                    </Menu.Item>
                  <Menu.Item style={{ marginTop: '1rem' }} onClick={p => this.props.history.push("/dashboard/policy")} icon={<GroupOutlined />}>
                    Policy
                                    </Menu.Item>
                </Menu>
              </Sider>
              <Content style={{ padding: '0 3rem', width: "100%" }}>
                <Switch>
                <Route exact path="/dashboard/home" render={(props) => <Home change={this.getAccount.bind(this)} {...props} />} />
                  {dashboardRoutes.map(route => {
                    return (
                      <Route
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        render={routeProps => {
                          return <route.component{...routeProps} />
                        }
                        }
                      />
                    );
                  })}
                  <Redirect to={dashboardRoutes[0].path} from="/dashboard" />
                  <Redirect to="/404" />
                </Switch>
              </Content>
            </Layout>
          </Content>
          <Footer id="footer" style={{ textAlign: 'center' }}>
            Made with <HeartFilled style={{ color: "red" }} /> by <a style={{ fontWeight: "bold", color: "black" }} rel='noopener noreferrer' target="_blank" href="https://casbin.org">Casbin</a>
          </Footer>
        </Layout>
      </div>
    )
  }

}

export default withRouter(App)







// import React from 'react';
// import {Switch, Route, Redirect} from 'react-router-dom'
// import Frame from './frame/Index'
// import 'antd/dist/antd.css';
// import {dashboardRoutes} from "./routes";


// function App(){
//   return ( 
//       <Frame>
//       <Switch>
//           {dashboardRoutes.map(route => {
//           return(
//             <Route 
//             key={route.path} 
//             path={route.path} 
//             exact = {route.exact}
//             render={routeProps=>{
//               return <route.component{...routeProps}/>
//             }
//           }
//             />
//           );
//         })}
//           <Redirect to ={dashboardRoutes[0].path} from="/dashboard"/>
//           <Redirect to ="/404" />
//         </Switch>
//         </Frame>
//   )
// }

// export default App;