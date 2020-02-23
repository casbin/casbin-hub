import React from "react";
import * as Setting from "./Setting";
import * as Backend from "./Backend";
import { Button, Card, Col, Input, Row, Select, Tag } from "antd";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import ModelEditor from "./ModelEditor";

require("codemirror/mode/properties/properties");

const { Option } = Select;

class ModelPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      modelId: props.match.params.modelId,
      model: null
    };
  }

  componentDidMount() {
    this.getModel();
  }

  getModel() {
    Backend.getModel(this.state.modelId).then(res => {
      let model = res;
      model.text = this.parseModelText(model.text);
      this.setState({
        model: model
      });
    });
  }

  onUpdateModelText(text) {
    let model = this.state.model;
    model.text = text;
    this.setState({
      model: model
    });
  }

  parseLine(s) {
    const res = s.split(",").map(value => value.trim(" "));
    return res;
  }

  parseModelText(text) {
    const res = {};

    const lines = text.match(/[^\r\n]+/g);
    lines.forEach((line, i) => {
      if (line.startsWith("p = ")) {
        res.p = line.slice(4);
        res.p = this.parseLine(res.p);
      } else if (line.startsWith("r = ")) {
        res.r = line.slice(4);
        res.r = this.parseLine(res.r);
      } else if (line.endsWith("= _, _")) {
        if (res.g === undefined) {
          res.g = [];
        }
        res.g.push(line.split("=")[0].trim(" "));
      } else if (line.startsWith("e = ")) {
        res.e = line.slice(4);
      } else if (line.startsWith("m = ")) {
        res.m = line.slice(4);
      }
    });

    return res;
  }

  stringifyModelText(text) {
    const lines = [];

    lines.push("[request_definition]");
    lines.push("r = " + text.r.join(", "));
    lines.push("");

    lines.push("[policy_definition]");
    lines.push("p = " + text.p.join(", "));
    lines.push("");

    lines.push("[role_definition]");
    text.g.forEach((line, i) => {
      lines.push(line + " = _, _");
    });
    lines.push("");

    lines.push("[policy_effect]");
    lines.push("e = " + text.e);
    lines.push("");

    lines.push("[matchers]");
    lines.push("m = " + text.m);

    return lines.join("\n");
  }

  updateField(key, value) {
    let model = this.state.model;
    model[key] = value;
    this.setState({
      model: model
    });
  }

  updateModel() {
    let model = Setting.deepCopy(this.state.model);
    model.text = this.stringifyModelText(model.text);
    Backend.updateModel(model)
      .then(res => {
        Setting.showMessage("success", `Save succeeded`);
      })
      .catch(error => {
        Setting.showMessage("error", `Sava failed: ${error}`);
      });
  }

  renderContent() {
    return (
      <Card
        size="small"
        title={
          <div>
            Edit Model: <Tag color="rgb(232,18,36)">{this.state.modelId}</Tag>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" onClick={this.updateModel.bind(this)}>
              Save Change
            </Button>
          </div>
        }
        style={{ marginLeft: "1px" }}
        type="inner"
      >
        <Row>
          <Col style={{ marginTop: "5px" }} span={2}>
            Id:
          </Col>
          <Col span={22}>
            <Input
              value={this.state.model.id}
              minLength={1}
              onChange={e => {
                this.updateField("id", e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col style={{ marginTop: "5px" }} span={2}>
            Name:
          </Col>
          <Col span={22}>
            <Input
              value={this.state.model.name}
              minLength={1}
              maxLength={256}
              onChange={e => {
                this.updateField("name", e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col style={{ marginTop: "5px" }} span={2}>
            Type:
          </Col>
          <Col span={22}>
            <Select
              style={{ width: "100%" }}
              value={this.state.model.type}
              onChange={value => {
                this.updateField("type", value);
              }}
            >
              {["ACL", "RBAC", "ABAC"].map((type, index) => (
                <Option key={index} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col style={{ marginTop: "5px" }} span={2}>
            Text:
          </Col>
          <Col span={10}>
            <ModelEditor
              model={this.state.model.text}
              onUpdateModelText={this.onUpdateModelText.bind(this)}
            />
          </Col>
          <Col span={1}></Col>
          <Col span={11}>
            <div style={{ border: "1px solid rgb(217,217,217)" }}>
              <CodeMirror
                value={this.stringifyModelText(this.state.model.text)}
                options={{ mode: "properties" }}
                onBeforeChange={(editor, data, value) => {
                  this.updateField("text", value);
                }}
              />
            </div>
          </Col>
        </Row>
      </Card>
    );
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={24}>
            {this.state.model !== null ? this.renderContent() : null}
          </Col>
        </Row>
      </div>
    );
  }
}

export default ModelPage;
