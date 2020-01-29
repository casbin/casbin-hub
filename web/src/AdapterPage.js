import React from "react";
import * as Setting from "./Setting";
import * as Backend from "./Backend";
import {Button, Card, Col, Input, Row, Select, Tag} from "antd";
import {Controlled as CodeMirror} from 'react-codemirror2'
import "codemirror/lib/codemirror.css"
import AdapterTable from "./AdapterTable";
import PolicyTable from "./PolicyTable";

require("codemirror/mode/properties/properties");

const {Option} = Select;

class AdapterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      adapterId: props.match.params.adapterId,
      adapter: null,
      pPolicies: null,
      gPolicies: null,
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

          this.getAdapterPolicies(res);
          this.getAdapterGroupingPolicies(res);
        }
      );
  }

  getAdapterPolicies(adapter) {
    Backend.getAdapterPolicies(adapter)
      .then((res) => {
          this.setState({
            pPolicies: res.data,
          });
        }
      );
  }

  getAdapterGroupingPolicies(adapter) {
    Backend.getAdapterGroupingPolicies(adapter)
      .then((res) => {
          this.setState({
            gPolicies: res.data,
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

  testAdapterConnection() {
    Backend.testAdapterConnection(this.state.adapter)
      .then((res) => {
        if (res.status === 'ok') {
          Setting.showMessage("success", `Connection succeeded`);
        } else {
          Setting.showMessage("error", `Connection failed: ${res.msg}`);
        }
      })
      .catch(error => {
        Setting.showMessage("error", `Test connection failed: ${error}`);
      });
  }

  onUpdatePolicies() {

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
          <Col span={22}>
            <Input value={this.state.adapter.id} onChange={e => {
              this.updateField('id', e.target.value);
            }}/>
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}}>
          <Col style={{marginTop: '5px'}} span={2}>
            Name:
          </Col>
          <Col span={22}>
            <Input value={this.state.adapter.name} onChange={e => {
              this.updateField('name', e.target.value);
            }}/>
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}}>
          <Col style={{marginTop: '5px'}} span={2}>
            Type:
          </Col>
          <Col span={22}>
            <Select style={{width: '100%'}} value={this.state.adapter.type} onChange={(value => {
              this.updateField('database', value);
            })}>
              {
                ['MySQL', 'PostgreSQL', 'SQLite'].map((type, index) => <Option key={index} value={type}>{type}</Option>)
              }
            </Select>
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}}>
          <Col style={{marginTop: '5px'}} span={2}>
            Parameter 1:
          </Col>
          <Col span={22}>
            <Input value={this.state.adapter.param1} onChange={e => {
              this.updateField('param1', e.target.value);
            }}/>
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}}>
          <Col style={{marginTop: '5px'}} span={2}>
            Parameter 2:
          </Col>
          <Col span={22}>
            <Input value={this.state.adapter.param2} onChange={e => {
              this.updateField('param2', e.target.value);
            }}/>
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}}>
          <Col style={{marginTop: '5px'}} span={2}>
            Policy Headers:
          </Col>
          <Col span={22}>
            <Select mode="tags" style={{width: '100%'}}
                    value={Setting.getSelectOptions(this.state.adapter.policyHeaders)}
                    onChange={value => {
                      this.updateField('policyHeaders', value);
                    }}
            />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}}>
          <Col style={{marginTop: '5px'}} span={2}>
            Test:
          </Col>
          <Col span={22}>
            <Button type="primary" onClick={this.testAdapterConnection.bind(this)}>Test Connection</Button>
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}}>
          <Col style={{marginTop: '5px'}} span={2}>
            P Policies:
          </Col>
          <Col span={22}>
            <PolicyTable title="P Policies" table={this.state.pPolicies} headers={this.state.adapter.policyHeaders} onUpdateTable={this.onUpdatePolicies.bind(this)}/>
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}}>
          <Col style={{marginTop: '5px'}} span={2}>
            G Policies:
          </Col>
          <Col span={22}>
            <PolicyTable title="G Policies" table={this.state.gPolicies} headers={["User", "Role"]} onUpdateTable={this.onUpdatePolicies.bind(this)}/>
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
