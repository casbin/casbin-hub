import React from 'react';
import { Form, Input, Button, Card, Row, Col } from 'antd';
import * as Backend from '../../../Backend';
import * as Setting from '../../../Setting';
import { Select } from 'antd';

const { Option } = Select;

class AddEnforcer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      enforcer: null,
      adapters: this.props.location.state[0],
      models: this.props.location.state[1],
    };
  }

  componentDidMount() {
    Backend.getEmptyEnforcer().then(res => {
      this.setState({
        enforcer: res,
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
        enforcer: {
          id: values.enforcer.id,
          name: values.enforcer.name,
          model: values.enforcer.model,
          adapter: values.enforcer.adapter,
        },
      });
      Backend.updateEnforcer(this.state.enforcer)
        .then(res => {
          Setting.showMessage('success', `Save succeeded`);
          this.props.history.push('/dashboard/home');
        })
        .catch(error => {
          Setting.showMessage('error', `Sava failed: ${error}`);
        });
    };
    return (
      <Card
        title="Add Enforcer"
        extra={
          <Button onClick={() => this.props.history.push('/dashboard/home')}>
            Cancel
          </Button>
        }>
        <Form {...layout} name="nest-messages" onFinish={onFinish}>
          <Form.Item
            name={['enforcer', 'id']}
            label="Id"
            rules={[
              {
                required: true,
                message: 'The id is required!',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name={['enforcer', 'name']}
            label="Name"
            rules={[
              {
                required: true,
                message: 'The name is required!',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name={['enforcer', 'model']}
            label="Model"
            rules={[
              {
                required: true,
                message: 'The model is required!',
              },
            ]}>
            <Select style={{ width: '100%' }}>
              {this.state.models.map(model => (
                <Option key={model.id}>{model.id}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name={['enforcer', 'adapter']}
            label="Adapter"
            rules={[
              {
                required: true,
                message: 'The adapter is required!',
              },
            ]}>
            <Select style={{ width: '100%' }}>
              {this.state.adapters.map(adapter => (
                <Option key={adapter.id}>{adapter.id}</Option>
              ))}
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

export default AddEnforcer;
