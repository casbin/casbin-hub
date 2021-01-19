import React from 'react';
import { Form, Input, Button, Card, Row, Col } from 'antd';
import * as Backend from '../../Backend';
import * as Setting from '../../Setting';
import { Select } from 'antd';

const { Option } = Select;

class EditPolicyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      policyList: null,
    };
  }

  componentWillMount() {
    Backend.getPolicyList(this.props.match.params.id).then(res => {
      this.setState({
        policyList: res,
      });
    });
  }

  render() {
    const layout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 16,
      },
    };

    const onFinish = values => {
      Backend.deletePolicyList(this.props.location.state).then(res => {
        this.setState({
          policyList: {
            id: values.policyList.id,
            ruleType: values.policyList.ruleType,
            tenant: values.policyList.tenant,
            user: values.policyList.user,
            resourcePath: values.policyList.resourcePath,
            action: values.policyList.action,
            service: values.policyList.service,
            authEffect: values.policyList.authEffect,
          },
        });
        Backend.updatePolicyList(this.state.policyList)
          .then(res => {
            Setting.showMessage('success', `Edit succeeded`);
            this.props.history.push('/dashboard/Policy');
          })
          .catch(error => {
            Setting.showMessage('error', `Edit failed: ${error}`);
          });
      });
    };
    return (
      <Card
        title="Edit policyLists"
        extra={
          <Button onClick={() => this.props.history.push('/dashboard/Policy')}>
            Cancel
          </Button>
        }>
        <Form {...layout} name="nest-messages" onFinish={onFinish}>
          <Form.Item
            name={['policyList', 'id']}
            label="Id"
            rules={[
              {
                required: true,
                message: 'The id is required!',
              },
            ]}
            initialValue={this.props.location.state.id}>
            <Input />
          </Form.Item>
          <Form.Item
            name={['policyList', 'ruleType']}
            label="RuleType"
            rules={[
              {
                required: true,
                message: 'The RuleType is required!',
              },
            ]}
            initialValue={this.props.location.state.ruleType}>
            <Select style={{ width: '100%' }}>
              <Option value="p">p</Option>
              <Option value="g">g</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={['policyList', 'tenant']}
            label="Tenant"
            rules={[
              {
                required: true,
                message: 'The Tenant is required!',
              },
            ]}
            initialValue={this.props.location.state.tenant}>
            <Input />
          </Form.Item>
          <Form.Item
            name={['policyList', 'user']}
            label="User"
            rules={[
              {
                required: true,
                message: 'The User is required!',
              },
            ]}
            initialValue={this.props.location.state.user}>
            <Input />
          </Form.Item>
          <Form.Item
            name={['policyList', 'resourcePath']}
            label="ResourcePath"
            rules={[
              {
                required: true,
                message: 'The ResourcePath is required!',
              },
            ]}
            initialValue={this.props.location.state.resourcePath}>
            <Input />
          </Form.Item>
          <Form.Item
            name={['policyList', 'action']}
            label="Action"
            rules={[
              {
                required: true,
                message: 'The Action is required!',
              },
            ]}
            initialValue={this.props.location.state.action}>
            <Input />
          </Form.Item>
          <Form.Item
            name={['policyList', 'service']}
            label="Service"
            rules={[
              {
                required: true,
                message: 'The Service is required!',
              },
            ]}
            initialValue={this.props.location.state.service}>
            <Input />
          </Form.Item>
          <Form.Item
            name={['policyList', 'authEffect']}
            label="AuthEffect"
            rules={[
              {
                required: true,
                message: 'The AuthEffect is required!',
              },
            ]}
            initialValue={this.props.location.state.authEffect}>
            <Select style={{ width: '100%' }}>
              <Option value="allow">allow</Option>
              <Option value="deny">deny</Option>
            </Select>
          </Form.Item>
          <Row>
            <Col span={24} align="center">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }
}

export default EditPolicyList;
