import React from 'react';
import './App.css';
import * as Setting from "./Setting";
import {Switch, Route} from 'react-router-dom'
import HomePage from "./HomePage";
import {Layout, Menu, Typography} from "antd";
import ModelPage from "./ModelPage";
import AdapterPage from "./AdapterPage";
import EnforcerPage from "./EnforcerPage";

const {Text} = Typography;
const {Header, Footer} = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
    };

    Setting.initServerUrl();
  }

  getUrlPath() {
    // eslint-disable-next-line no-restricted-globals
    return location.pathname;
  }

  componentWillMount() {
    const path = this.getUrlPath();
    if (path.includes('model')) {
      this.setState({ selectedMenuKey: 2 });
    } else if (path.includes('adapter')) {
      this.setState({ selectedMenuKey: 3 });
    } else if (path.includes('enforcer')) {
      this.setState({ selectedMenuKey: 4 });
    } else {
      this.setState({ selectedMenuKey: 1 });
    }
  }

  render() {
    return (
        <div>
          <Layout className="layout">
            <Header style={{padding: '0', marginBottom: '3px'}}>
              <div className="logo"/>

              <Menu
                  // theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={[`${this.state.selectedMenuKey}`]}
                  style={{lineHeight: '64px'}}
                  inlineCollapsed={false}
              >
                <Text style={{marginRight: "20px", fontSize: "x-large"}}>Dashboard</Text>

                <Menu.Item key="1">
                  <a href="/">
                    Home
                  </a>
                </Menu.Item>
                {
                  !this.getUrlPath().includes('model') ? null :
                    <Menu.Item key="2">
                      <a href="#">
                        Model
                      </a>
                    </Menu.Item>
                }
                {
                  !this.getUrlPath().includes('adapter') ? null :
                    <Menu.Item key="3">
                      <a href="#">
                        Adapter
                      </a>
                    </Menu.Item>
                }
                {
                  !this.getUrlPath().includes('enforcer') ? null :
                    <Menu.Item key="4">
                      <a href="#">
                        Enforcer
                      </a>
                    </Menu.Item>
                }
                <Menu.Item key='5' style={{float: 'right'}}>
                  <a target="_blank" href="https://github.com/casbin/casbin-dashboard" rel='noreferrer'>
                    <img alt="GitHub stars" src="https://img.shields.io/github/stars/casbin/casbin-dashboard?style=social" />
                  </a>
                </Menu.Item>
              </Menu>
            </Header>
          </Layout>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/model/:modelId" component={ModelPage}/>
            <Route exact path="/adapter/:adapterId" component={AdapterPage}/>
            <Route exact path="/enforcer/:enforcerId" component={EnforcerPage}/>
          </Switch>
          <Footer style={{ textAlign: 'center' }}>
            Made with <span style={{color: '#FF0000'}}>❤</span> by <a target="_blank" href="https://github.com/casbin" rel='noreferrer'>Casbin Organization</a>
          </Footer>
        </div>
    );
  }

}

export default App;
