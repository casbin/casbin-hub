import React from "react";
import * as Setting from "./Setting";
import * as Backend from "./Backend";
import {Button, Card, Col, Input, Row, Select, Tag} from "antd";
import {Controlled as CodeMirror} from 'react-codemirror2'
import "codemirror/lib/codemirror.css"

require("codemirror/mode/properties/properties");

const { Option } = Select;

class ModelPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      modelId: props.match.params.modelId,
      model: null,
    };
  }

  componentDidMount() {
    this.getModel();
  }

  getModel() {
    Backend.getModel(this.state.modelId)
      .then((res) => {
          this.setState({
            model: res,
          });
        }
      );
  }

  updateField(key, value) {
    let model = this.state.model;
    model[key] = value;
    this.setState({
      model: model,
    });
  }

  updateModel() {
    Backend.updateModel(this.state.model)
      .then((res) => {
        Setting.showMessage("success", `Save succeeded`);
      })
      .catch(error => {
        Setting.showMessage("error", `Sava failed: ${error}`);
      });
  }

  renderContent() {
    return (
      <Card size="small" title={
        <div>
          Edit Model: <Tag color="rgb(232,18,36)">{this.state.modelId}</Tag>&nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="primary" onClick={this.updateModel.bind(this)}>Save Change</Button>
        </div>
      } style={{marginLeft: '1px'}} type="inner">
        <Row>
          <Col style={{marginTop: '5px'}} span={2}>
            Id:
          </Col>
          <Col span={22} >
            <Input value={this.state.model.id} onChange={e => {
              this.updateField('id', e.target.value);
            }} />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            Name:
          </Col>
          <Col span={22} >
            <Input value={this.state.model.name} onChange={e => {
              this.updateField('name', e.target.value);
            }} />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            Type:
          </Col>
          <Col span={22} >
            <Select style={{width: '100%'}} value={this.state.model.type} onChange={(value => {this.updateField('type', value);})}>
              {
                ['ACL', 'RBAC', 'ABAC'].map((type, index) => <Option key={index} value={type}>{type}</Option>)
              }
            </Select>
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            Text:
          </Col>
          <Col span={22} >
            <div style={{border: '1px solid rgb(217,217,217)'}}>
              <CodeMirror
                value={this.state.model.text}
                options={{mode: 'properties',}}
                onBeforeChange={(editor, data, value) => {
                  this.updateField('text', value);
                }}
              />
            </div>
          </Col>
        </Row>
      </Card>
    )
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={24}>
            {
              this.state.model !== null ? this.renderContent() : null
            }
          </Col>
        </Row>
      </div>
    );
  }

}

export default ModelPage;
