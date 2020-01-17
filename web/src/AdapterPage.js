import React from "react";
import * as Setting from "./Setting";
import * as Backend from "./Backend";
import {Button, Card, Col, Input, Row, Select, Tag} from "antd";
import {Controlled as CodeMirror} from 'react-codemirror2'
import "codemirror/lib/codemirror.css"

require("codemirror/mode/properties/properties");

const { Option } = Select;

class AdapterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      adapterId: props.match.params.adapterId,
      adapter: null,
    };
  }

  componentDidMount() {
    this.getAdapter();
  }

  getAdapter() {
    Backend.getAdapter(this.state.adapterId)
      .then((res) => {
          this.setState({
            adapter: res,
          });
        }
      );
  }

  updateField(key, value) {
    let adapter = this.state.adapter;
    adapter[key] = value;
    this.setState({
      adapter: adapter,
    });
  }

  updateAdapter() {
    Backend.updateAdapter(this.state.adapter)
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
        <div style={{width: "90vw"}}>
          Edit Adapter: <Tag color="rgb(232,18,36)">{this.state.adapterId}</Tag>&nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="primary" onClick={this.updateAdapter.bind(this)}>Save Change</Button>
        </div>
      } style={{marginLeft: '5px'}} type="inner">
        <Row>
          <Col style={{marginTop: '5px'}} span={2}>
            Id:
          </Col>
          <Col span={22} >
            <Input value={this.state.adapter.id} onChange={e => {
              this.updateField('id', e.target.value);
            }} />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            Name:
          </Col>
          <Col span={22} >
            <Input value={this.state.adapter.name} onChange={e => {
              this.updateField('name', e.target.value);
            }} />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            Database:
          </Col>
          <Col span={22} >
            <Select style={{width: '100%'}} value={this.state.adapter.database} onChange={(value => {this.updateField('database', value);})}>
              {
                ['MySQL', 'PostgreSQL', 'SQLite'].map((database, index) => <Option key={index} value={database}>{database}</Option>)
              }
            </Select>
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            Connection string:
          </Col>
          <Col span={22} >
            <Input value={this.state.adapter.connectString} onChange={e => {
              this.updateField('connectString', e.target.value);
            }} />
          </Col>
        </Row>
      </Card>
    )
  }

  render() {
    return (
      <div>
        <Row>
          {
            this.state.adapter !== null ? this.renderContent() : null
          }
        </Row>
      </div>
    );
  }

}

export default AdapterPage;
