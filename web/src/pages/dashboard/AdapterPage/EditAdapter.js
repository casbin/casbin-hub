import React from 'react';
import { Form, Input, Button, Card, Row, Col } from 'antd';
import * as Backend from '../../../Backend';
import * as Setting from '../../../Setting';

class EditAdapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      adapter: null,
    };
  }

  componentDidMount() {
    Backend.getAdapter(this.props.match.params.id).then(res => {
      this.setState({
        adapter: res,
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
      Backend.deleteAdapter(this.props.location.state).then(res => {
        this.setState({
          adapter: {
            id: values.adapter.id,
            name: values.adapter.name,
            type: values.adapter.type,
            param1: values.adapter.param1,
            param2: values.adapter.param2,
          },
        });
        Backend.updateAdapter(this.state.adapter)
          .then(res => {
            Setting.showMessage('success', `Edit succeeded`);
            this.props.history.push('/dashboard/home');
          })
          .catch(error => {
            Setting.showMessage('error', `Edit failed: ${error}`);
          });
      });
    };
    return (
      <Card
        title="Edit Adapters"
        extra={
          <Button onClick={() => this.props.history.push('/dashboard/home')}>
            Cancel
          </Button>
        }>
        <Form {...layout} name="nest-messages" onFinish={onFinish}>
          <Form.Item
            name={['adapter', 'id']}
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
            name={['adapter', 'name']}
            label="Name"
            rules={[
              {
                required: true,
                message: 'The name is required!',
              },
            ]}
            initialValue={this.props.location.state.name}>
            <Input />
          </Form.Item>
          <Form.Item
            name={['adapter', 'type']}
            label="Type"
            rules={[
              {
                required: true,
                message: 'The type is required!',
              },
            ]}
            initialValue={this.props.location.state.type}>
            <Input />
          </Form.Item>
          <Form.Item
            name={['adapter', 'param1']}
            label="Parameter 1"
            rules={[
              {
                required: true,
                message: 'The Parameter 1 is required!',
              },
            ]}
            initialValue={this.props.location.state.param1}>
            <Input />
          </Form.Item>
          <Form.Item
            name={['adapter', 'param2']}
            label="Parameter 2"
            rules={[
              {
                required: true,
                message: 'The Parameter 2 is required!',
              },
            ]}
            initialValue={this.props.location.state.param2}>
            <Input />
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

export default EditAdapter;
