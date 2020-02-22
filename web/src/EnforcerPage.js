import React from 'react'
import * as Setting from './Setting'
import * as Backend from './Backend'
import { Button, Card, Col, Input, Row, Select, Tag } from 'antd'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import PolicyTable from './PolicyTable'

require('codemirror/mode/properties/properties')

const { Option } = Select

class EnforcerPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      classes: props,
      enforcerId: props.match.params.enforcerId,
      enforcer: null,
      adapters: [],
      models: [],
      adapter: null,
      model: null,
      pPolicies: null,
      gPolicies: null,
    }
  }

  componentDidMount() {
    Promise.all([
      Backend.getEnforcer(this.state.enforcerId),
      Backend.getAdapters(),
      Backend.getModels(),
    ]).then(values => {
      let enforcer = values[0]
      let adapters = values[1]
      let models = values[2]

      this.setState({
        enforcer: enforcer,
        adapters: adapters,
        models: models,
        adapter: adapters.filter(adapter => adapter.id === enforcer.adapter)[0],
        model: models.filter(model => model.id === enforcer.model)[0],
      })

      this.getAdapterPolicies(enforcer.adapter)
      this.getAdapterGroupingPolicies(enforcer.adapter)
    })
  }

  getAdapterPolicies(adapterId) {
    Backend.getAdapterPolicies(adapterId).then(res => {
      this.setState({
        pPolicies: res.data,
      })
    })
  }

  getAdapterGroupingPolicies(adapterId) {
    Backend.getAdapterGroupingPolicies(adapterId).then(res => {
      this.setState({
        gPolicies: res.data,
      })
    })
  }

  onUpdateModelText(text) {
    let model = this.state.model
    model.text = text
    this.setState({
      model: model,
    })
  }

  updateField(key, value) {
    let model = this.state.model
    model[key] = value
    this.setState({
      model: model,
    })
  }

  updateModel() {
    let model = Setting.deepCopy(this.state.model)
    model.text = this.stringifyModelText(model.text)
    Backend.updateModel(model)
      .then(res => {
        Setting.showMessage('success', `Save succeeded`)
      })
      .catch(error => {
        Setting.showMessage('error', `Sava failed: ${error}`)
      })
  }

  onUpdatePolicies() {}

  renderContent() {
    return (
      <Card
        size="small"
        title={
          <div>
            Edit Enforcer:{' '}
            <Tag color="rgb(232,18,36)">{this.state.enforcerId}</Tag>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" onClick={this.updateModel.bind(this)}>
              Save Change
            </Button>
          </div>
        }
        style={{ marginLeft: '1px' }}
        type="inner"
      >
        <Row>
          <Col style={{ marginTop: '5px' }} span={2}>
            Id:
          </Col>
          <Col span={22}>
            <Input
              value={this.state.enforcer.id}
              onChange={e => {
                this.updateField('id', e.target.value)
              }}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: '20px' }}>
          <Col style={{ marginTop: '5px' }} span={2}>
            Name:
          </Col>
          <Col span={22}>
            <Input
              value={this.state.enforcer.name}
              onChange={e => {
                this.updateField('name', e.target.value)
              }}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: '20px' }}>
          <Col style={{ marginTop: '5px' }} span={2}>
            Model:
          </Col>
          <Col span={2}>
            <Select
              style={{ width: '100%' }}
              value={this.state.enforcer.model}
              onChange={value => {
                this.updateField('model', value)
              }}
            >
              {this.state.models.map((item, index) => (
                <Option key={index} value={item.id}>
                  {item.id}
                </Option>
              ))}
            </Select>
            <Button
              style={{ width: '100%', marginTop: '10px' }}
              type="primary"
              onClick={() =>
                Setting.openLink(`/model/${this.state.enforcer.model}`)
              }
            >
              Edit
            </Button>
          </Col>
          <Col span={1}></Col>
          <Col span={19}>
            <div style={{ border: '1px solid rgb(217,217,217)' }}>
              <CodeMirror
                value={this.state.model.text}
                options={{ mode: 'properties' }}
              />
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: '20px' }}>
          <Col style={{ marginTop: '5px' }} span={2}>
            Adapter:
          </Col>
          <Col span={2}>
            <Select
              style={{ width: '100%' }}
              value={this.state.enforcer.adapter}
              onChange={value => {
                this.updateField('adapter', value)
              }}
            >
              {this.state.adapters.map((item, index) => (
                <Option key={index} value={item.id}>
                  {item.id}
                </Option>
              ))}
            </Select>
            <Button
              style={{ width: '100%', marginTop: '10px' }}
              type="primary"
              onClick={() =>
                Setting.openLink(`/adapter/${this.state.enforcer.adapter}`)
              }
            >
              Edit
            </Button>
          </Col>
          <Col span={1}></Col>
          <Col span={9}>
            <PolicyTable
              title="P Policies"
              type="p"
              table={this.state.pPolicies}
              headers={this.state.adapter.policyHeaders}
              onUpdateTable={this.onUpdatePolicies.bind(this)}
            />
          </Col>
          <Col span={1}></Col>
          <Col span={9}>
            <PolicyTable
              title="G Policies"
              type="g"
              table={this.state.gPolicies}
              headers={['User', 'Role']}
              onUpdateTable={this.onUpdatePolicies.bind(this)}
            />
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
            {this.state.enforcer !== null &&
            this.state.adapter !== null &&
            this.state.model !== null
              ? this.renderContent()
              : null}
          </Col>
        </Row>
      </div>
    )
  }
}

export default EnforcerPage
