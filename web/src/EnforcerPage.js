import React from "react";
import * as Setting from "./Setting";
import * as Backend from "./Backend";
import {Button, Card, Col, Input, Row, Select, Tag} from "antd";
import {Controlled as CodeMirror} from 'react-codemirror2'
import "codemirror/lib/codemirror.css"
import ModelEditor from "./ModelEditor";

require("codemirror/mode/properties/properties");

const { Option } = Select;

class EnforcerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      enforcerId: props.match.params.enforcerId,
      enforcer: null,
      adapters: [],
      models: [],
    };
  }

  componentDidMount() {
    this.getEnforcer();
    this.getModels();
    this.getAdapters();
  }

  getEnforcer() {
    Backend.getEnforcer(this.state.enforcerId)
      .then((res) => {
        this.setState({
          enforcer: res,
        });
        }
      );
  }

  getAdapters() {
    Backend.getAdapters()
      .then((res) => {
          this.setState({
            adapters: res,
          });
        }
      );
  }

  getModels() {
    Backend.getModels()
      .then((res) => {
          this.setState({
            models: res,
          });
        }
      );
  }

  onUpdateModelText(text) {
    let model = this.state.model;
    model.text = text;
    this.setState({
      model: model,
    });
  }

  updateField(key, value) {
    let model = this.state.model;
    model[key] = value;
    this.setState({
      model: model,
    });
  }

  updateModel() {
    let model = Setting.deepCopy(this.state.model);
    model.text = this.stringifyModelText(model.text);
    Backend.updateModel(model)
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
          Edit Enforcer: <Tag color="rgb(232,18,36)">{this.state.enforcerId}</Tag>&nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="primary" onClick={this.updateModel.bind(this)}>Save Change</Button>
        </div>
      } style={{marginLeft: '1px'}} type="inner">
        <Row>
          <Col style={{marginTop: '5px'}} span={2}>
            Id:
          </Col>
          <Col span={22} >
            <Input value={this.state.enforcer.id} onChange={e => {
              this.updateField('id', e.target.value);
            }} />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            Name:
          </Col>
          <Col span={22} >
            <Input value={this.state.enforcer.name} onChange={e => {
              this.updateField('name', e.target.value);
            }} />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}}>
          <Col style={{marginTop: '5px'}} span={2}>
            Model:
          </Col>
          <Col span={22}>
            <Select style={{width: '100%'}} value={this.state.enforcer.model} onChange={(value => {this.updateField('model', value);})}>
              {
                this.state.models.map((item, index) => <Option key={index} value={item.id}>{item.id}</Option>)
              }
            </Select>
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}}>
          <Col style={{marginTop: '5px'}} span={2}>
            Adapter:
          </Col>
          <Col span={22}>
            <Select style={{width: '100%'}} value={this.state.enforcer.adapter} onChange={(value => {this.updateField('adapter', value);})}>
              {
                this.state.adapters.map((item, index) => <Option key={index} value={item.id}>{item.id}</Option>)
              }
            </Select>
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
              this.state.enforcer !== null ? this.renderContent() : null
            }
          </Col>
        </Row>
      </div>
    );
  }
}

export default EnforcerPage;
