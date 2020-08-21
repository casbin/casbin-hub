import React from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Avatar, Dropdown, message } from 'antd';
import './frame.css';
import { DownOutlined,NotificationOutlined, SettingOutlined, LoginOutlined, HomeOutlined, GroupOutlined, HeartFilled} from '@ant-design/icons';
import { clearToken } from '../../utils/auth'

const { Header, Content, Footer, Sider } = Layout;

function index(props) {
    const popMenu = (
        <Menu
            onClick={p => {
                if (p.key === "logout") {
                    clearToken()
                    props.history.push('/login')
                } else {
                    message.info(p.key)//tip
                }
            }}>
            <Menu.Item key="notice" icon = {<NotificationOutlined />}>Notice</Menu.Item>
            <Menu.Item key="Seting" icon = {<SettingOutlined />}>Seting</Menu.Item>
            <Menu.Item key="logout" icon = {<LoginOutlined />}>Exit</Menu.Item>
        </Menu>)

    return (
        <Layout  id="content-wrap" style={{ minHeight: '100vh' }}>
            <Header className="header" style={{
                backgroundColor: "#FFFFFF",
            }}>
                <div className="logo" />
                <Dropdown overlay={popMenu} trigger={['click']}>
                    <div>
                        <Avatar>U</Avatar>&nbsp;&nbsp;&nbsp;
                        <a href="/" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Admin <DownOutlined />
                        </a>
                    </div>
                </Dropdown>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Layout className="site-layout-background" style={{ padding: '24px 0'}}>
                    <Sider className="site-layout-background" width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%'}}
                        >
                                <Menu.Item onClick={p => props.history.push("/dashboard/home")} icon={<HomeOutlined />}>
                                    Home
                                </Menu.Item>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Menu.Item onClick={p => props.history.push("/dashboard/policy")} icon={<GroupOutlined />}>
                                    Policy
                                </Menu.Item>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </Menu>
                    </Sider>
                    <Content style={{ padding: '0 50px',width: "100%" }}>
                        {props.children}
                    </Content>
                </Layout>
            </Content>
            <Footer id="footer" style={{textAlign: 'center'}}>
                Made with <HeartFilled style={{color: "red"}}/> by <a style={{ fontWeight: "bold", color: "black" }} rel='noopener noreferrer' target="_blank" href="https://casbin.org">Casbin</a>
            </Footer>
        </Layout>
    )
}

export default withRouter(index)
