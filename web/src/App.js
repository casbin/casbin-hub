import React from 'react';
import './App.css';
import * as Setting from "./Setting";

import {Switch, Route} from 'react-router-dom'
import HomePage from "./HomePage";
import {Layout, Menu, Typography} from "antd";

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

  componentWillMount() {
    // eslint-disable-next-line no-restricted-globals
    const uri = location.pathname;
    if (uri.includes('page1')) {
      this.setState({ selectedMenuKey: 2 });
    } else if (uri.includes('page2')) {
      this.setState({ selectedMenuKey: 3 });
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
                <Text>Casbin Dashboard</Text>

                <Menu.Item key="1">
                  <a href="/">
                    Home
                  </a>
                </Menu.Item>
                <Menu.Item key="2">
                  <a href="/page1">
                    Page1
                  </a>
                </Menu.Item>
                <Menu.Item key="3">
                  <a href="/page2">
                    Page2
                  </a>
                </Menu.Item>
              </Menu>
            </Header>
          </Layout>
          <Switch>
            <Route exact path="/" component={HomePage}/>
          </Switch>
          <Footer style={{ textAlign: 'center' }}>
            Made with <span style={{color: 'rgb(255, 255, 255)'}}>❤</span> by <a target="_blank" href="https://github.com/casbin">Casbin Organization</a>
          </Footer>
        </div>
    );
  }

}

export default App;
