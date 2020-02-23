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
    this.getAdapter(this.state.adapterId);
    this.getAdapterPolicies(this.state.adapterId);
    this.getAdapterGroupingPolicies(this.state.adapterId);
  }

  getAdapter(adapterId) {
    Backend.getAdapter(adapterId)
      .then((res) => {
          this.setState({
            adapter: res,
          });
        }
      );
  }

  getAdapterPolicies(adapterId) {
    Backend.getAdapterPolicies(adapterId)
      .then((res) => {
          this.setState({
            pPolicies: res.data,
          });
        }
      );
  }

  getAdapterGroupingPolicies(adapterId) {
    Backend.getAdapterGroupingPolicies(adapterId)
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
    // Backend.updateAdapter(this.state.adapter)
    //   .then((res) => {
    //     Setting.showMessage("success", `Save succeeded`);
    //   })
    //   .catch(error => {
    //     Setting.showMessage("error", `Sava failed: ${error}`);
    //   });
    //
    // Backend.setAdapterAllPolicies(this.state.adapter.id, this.state.pPolicies.concat(this.state.gPolicies))
    //   .then((res) => {
    //     Setting.showMessage("success", `Save succeeded`);
    //   })
    //   .catch(error => {
    //     Setting.showMessage("error", `Sava failed: ${error}`);
    //   });

    Promise.all([
      Backend.updateAdapter(this.state.adapter),
      Backend.setAdapterAllPolicies(this.state.adapter.id, this.state.pPolicies.concat(this.state.gPolicies)),
    ]).then((values) => {
      let res1 = values[0];
      let res2 = values[1];

      Setting.showMessage("success", `Save succeeded`);
    }).catch((errors) => {
      let error1 = errors[0];
      let error2 = errors[1];

      Setting.showMessage("error", `Sava failed: ${error1}`);
      Setting.showMessage("error", `Sava failed: ${error2}`);
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

  onUpdatePolicies(pType, policies) {
    let pPolicies = this.state.pPolicies;
    let gPolicies = this.state.gPolicies;
    if (pType === "p") {
      pPolicies = policies;
    } else if (pType === "g") {
      gPolicies = policies;
    }

    this.setState({
      pPolicies: pPolicies,
      gPolicies: gPolicies,
    });
  }

  renderContent() {
    return (
      <Card size="small" title={
        <div>
          Edit Adapter: <Tag color="rgb(232,18,36)">{this.state.adapterId}</Tag>&nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="primary" onClick={this.updateAdapter.bind(this)}>Save Change</Button>
        </div>
      } style={{marginLeft: '1px'}} type="inner">
        <Row>
          <Col style={{marginTop: '5px'}} span={2}>
            Id:
          </Col>
          <Col span={22}>
            <Input value={this.state.adapter.id} minLength={1} onChange={e => {
              this.updateField('id', e.target.value);
            }}/>
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}}>
          <Col style={{marginTop: '5px'}} span={2}>
            Name:
          </Col>
          <Col span={22}>
            <Input value={this.state.adapter.name} minLength={1} maxLength={256} onChange={e => {
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
            Policies:
          </Col>
          <Col span={10}>
            <PolicyTable title="P Policies" type="p" table={this.state.pPolicies} headers={this.state.adapter.policyHeaders} onUpdateTable={this.onUpdatePolicies.bind(this)}/>
          </Col>
          <Col span={2}>
          </Col>
          <Col span={10}>
            <PolicyTable title="G Policies" type="g" table={this.state.gPolicies} headers={["User", "Role"]} onUpdateTable={this.onUpdatePolicies.bind(this)}/>
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
              this.state.adapter !== null ? this.renderContent() : null
            }
          </Col>
        </Row>
      </div>
    );
  }

}

export default AdapterPage;
