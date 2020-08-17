import React from 'react'
import { Form, Input, Button, Card } from 'antd';
import * as Backend from "../../../Backend";
import * as Setting from "../../../Setting";

import { Select } from 'antd';

const { Option } = Select;


class EditModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: props,
            model: null,
        };
    }

    componentWillMount() {
        Backend.getModel(this.props.match.params.id)
            .then((res) => {
                this.setState({
                    model: res
                });
            },
            );
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
        
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                }
            }
        }
        const onFinish = values => {
            Setting.initServerUrl();
            Backend.deleteModel(this.props.location.state)
                .then((res) => {
                    this.setState({
                        model: {
                            id: values.model.id,
                            name: values.model.name,
                            type: values.model.type,
                            text: values.model.text,
                        }
                    })
                    Backend.updateModel(this.state.model)
                        .then((res) => {
                            Setting.showMessage("success", `Edit succeeded`);
                            this.props.history.push("/dashboard/home");
                        })
                        .catch(error => {
                            Setting.showMessage("error", `Edit failed: ${error}`);
                        });
                })

        };
        return (
            <Card
                title="Edit Models"
                extra={
                    <Button onClick={() => this.props.history.push("/dashboard/home")}>
                        Cancel
                    </Button>
                }
            >
                <Form {...layout} name="nest-messages" onFinish={onFinish}>
                    <Form.Item
                        name={['model', 'id']}
                        label="Id"
                        rules={[
                            {
                                required: true,
                                message: 'The id is required!',
                            },
                        ]}
                        initialValue={this.props.location.state.id}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['model', 'name']}
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: 'The name is required!',
                            }]
                        }
                        initialValue={this.props.location.state.name}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['model', 'type']}
                        label="Type"
                        rules={[
                            {
                                required: true,
                                message: 'The type is required!',
                            }]
                        }
                        initialValue={this.props.location.state.type}
                    >
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
                        ]}
                        initialValue={this.props.location.state.text}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default EditModel
