import React from 'react';
import { Form, Input, Button, Card, Row, Col } from 'antd';
import * as Backend from '../../Backend';
import * as Setting from '../../Setting';

import { Select } from 'antd';

const { Option } = Select;

class AddPolicyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      PolicyList: null,
    };
  }

  componentDidMount() {
    Backend.getEmptyPolicyList().then(res => {
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
          Setting.showMessage('success', `Save succeeded`);
          this.props.history.push('/dashboard/policy');
        })
        .catch(error => {
          Setting.showMessage('error', `Sava failed: ${error}`);
        });
    };
    return (
      <Card
        title="Add PolicyList"
        extra={
          <Button onClick={() => this.props.history.push('/dashboard/policy')}>
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
                message: 'The Id is required!',
              },
            ]}>
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
            ]}>
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
            ]}>
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
            ]}>
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
            ]}>
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
            ]}>
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
            ]}>
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
            ]}>
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

export default AddPolicyList;
