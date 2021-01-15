import React from 'react';
import { Form, Input, Button, Card, Row, Col, message } from 'antd';
import * as Backend from '../../../Backend';
import * as Setting from '../../../Setting';

import { Select } from 'antd';

const { Option } = Select;

class AddModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      model: null,
      errors: [],
    };
  }

  componentDidMount() {
    Backend.getEmptyModel().then(res => {
      this.setState({
        model: res,
      });
    });
  }

  parseLine(s) {
    const res = s.split(',').map(value => value.trim(' '));
    return res;
  }

  parseModel(modelText) {
    var text = modelText.split(' ');
    var texts = '';
    for (var i = 0; i < text.length; i++) {
      texts += text[i];
    }
    console.log(texts);
    const res = {};
    const lines = texts.match(/[^\r\n]+/g);
    lines.forEach((line, i) => {
      if (line.startsWith('p=') || line.startsWith('P=')) {
        res.p = line.slice(2);
        res.p = this.parseLine(res.p);
      } else if (line.startsWith('r=') || line.startsWith('R=')) {
        res.r = line.slice(2);
        res.r = this.parseLine(res.r);
      } else if (line.endsWith('=_,_')) {
        if (res.g === undefined) {
          res.g = [];
        }
        res.g.push(line.split('=')[0].trim(' '));
      } else if (line.startsWith('e=') || line.startsWith('E=')) {
        res.e = line.slice(2);
      } else if (line.startsWith('m=') || line.startsWith('M=')) {
        res.m = line.slice(2);
      }
    });
    return res;
  }

  modelDefault =
    '[request_definition]\nr = sub, obj, act\n[policy_definition]\np = sub, obj, act\n[policy_effect]\ne = some(where (p.eft == allow))\n[matchers]\nm = r.sub == p.sub && r.obj == p.obj && r.act == p.act';

  validateModel = (rule, value, callback) => {
    let listOfValidPolicyEffects = [
      'some(where(p.eft==allow))',
      '!some(where(p.eft==deny))',
      'some(where(p.eft==allow))&&!some(where(p.eft==deny))',
      'priority(p.eft)||deny',
    ];
    let res = this.parseModel(value);
    if (res === null || res.r === undefined || res.r[0].length === 0) {
      return Promise.reject('Please add arguments to request_definition');
    } else if (res === null || res.p === undefined || res.p[0].length === 0) {
      return Promise.reject('Please add a policy_definition');
    } else if (
      res === null ||
      res.e === undefined ||
      listOfValidPolicyEffects.indexOf(res.e.trim())
    ) {
      return Promise.reject('Please add valid policy_effect');
    } else if (res === null || res.m === undefined || res.m[0].length === 0) {
      return Promise.reject('Please add matchers expresion');
    } else {
      return Promise.resolve();
    }
  };

  validateRBAC(values) {
    let res = this.parseModel(values.model.text);
    if (values.model.type === 'RBAC') {
      if (res === null || res.g === undefined || res.g.length === 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
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
      let result = this.validateRBAC(values);
      if (result === true) {
        this.setState({
          model: {
            id: values.model.id,
            name: values.model.name,
            type: values.model.type,
            text: values.model.text,
          },
        });
        Backend.updateModel(this.state.model)
          .then(res => {
            Setting.showMessage('success', `Save succeeded`);
            this.props.history.push('/dashboard/home');
          })
          .catch(error => {
            Setting.showMessage('error', `Sava failed: ${error}`);
          });
      } else {
        message.info('Please add role_definition!');
      }
    };

    return (
      <Card
        title="Add Models"
        extra={
          <Button onClick={() => this.props.history.push('/dashboard/home')}>
            Cancel
          </Button>
        }>
        <Form {...layout} name="nest-messages" onFinish={onFinish}>
          <Form.Item
            name={['model', 'id']}
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
            name={['model', 'name']}
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
            name={['model', 'type']}
            label="Type"
            rules={[
              {
                required: true,
                message: 'The type is required!',
              },
            ]}>
            <Select style={{ width: '100%' }}>
              <Option value="ALC">ALC</Option>
              <Option value="RBAC">RBAC</Option>
              <Option value="ABAC">ABAC</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={['model', 'text']}
            label="Text"
            rules={[
              {
                required: true,
                message: 'The text is required!',
              },
              {
                validator: this.validateModel,
              },
            ]}
            initialValue={this.modelDefault}>
            <Input.TextArea rows={11} />
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

export default AddModel;
