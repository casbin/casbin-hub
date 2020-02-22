import React from 'react';
import {
Card, Col, Input, Row, Select 
} from 'antd';
import * as Setting from '../../utils/Setting';

const { Option } = Select;

const effects = [
  { id: 'some(where (p.eft == allow))', name: 'allow-override' },
  { id: '!some(where (p.eft == deny))', name: 'deny-override' },
  { id: 'some(where (p.eft == allow)) && !some(where (p.eft == deny))', name: 'allow-and-deny' },
  { id: 'priority(p.eft) || deny', name: 'priority' },
];

class ModelEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
    };
  }

  updateModel = (model) => {
    this.props.onUpdateModelText(model);
  }

  updateField = (key, value) => {
    const { model } = this.props;
    model[key] = value;
    this.updateModel(model);
  }

  renderContent = () => (
    <Card
      size="small"
      title={(
        <div>
          Model Editor&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      )}
      style={{ marginLeft: '1px' }}
      type="inner"
    >
      <Row>
        <Col style={{ marginTop: '5px' }} span={3}>
          Request:
        </Col>
        <Col span={21}>
          <Select
            mode="tags"
            style={{ width: '100%' }}
            value={Setting.getSelectOptions(this.props.model.r)}
            onChange={(value) => {
                      this.updateField('r', value);
                    }}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Col style={{ marginTop: '5px' }} span={3}>
          Policy:
        </Col>
        <Col span={21}>
          <Select
            mode="tags"
            style={{ width: '100%' }}
            value={Setting.getSelectOptions(this.props.model.p)}
            onChange={(value) => {
                      this.updateField('p', value);
                    }}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Col style={{ marginTop: '5px' }} span={3}>
          Role:
        </Col>
        <Col span={21}>
          <Select
            mode="tags"
            style={{ width: '100%' }}
            value={Setting.getSelectOptions(this.props.model.g)}
            onChange={(value) => {
                      this.updateField('g', value);
                    }}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Col style={{ marginTop: '5px' }} span={3}>
          Effect:
        </Col>
        <Col span={21}>
          <Select style={{ width: 200 }} value={this.props.model.e} onChange={((value) => { this.updateField('e', value); })}>
            {
                effects.map((item, index) => <Option key={index} value={item.id}>{item.name}</Option>)
              }
          </Select>
        </Col>
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Col style={{ marginTop: '5px' }} span={3}>
          Matcher:
        </Col>
        <Col span={21}>
          <Input
            value={this.props.model.m}
            onChange={(e) => {
              this.updateField('m', e.target.value);
            }}
          />
        </Col>
      </Row>

      {/* <Row style={{marginTop: '20px'}} > */}
      {/*  <Col style={{marginTop: '5px'}} span={2}> */}
      {/*    Type: */}
      {/*  </Col> */}
      {/*  <Col span={22} > */}
      {/*    <Select style={{width: '100%'}} value={this.state.model.type} onChange={(value => {this.updateField('type', value);})}> */}
      {/*      { */}
      {/*        ['ACL', 'RBAC', 'ABAC'].map((type, index) => <Option key={index} value={type}>{type}</Option>) */}
      {/*      } */}
      {/*    </Select> */}
      {/*  </Col> */}
      {/* </Row> */}
      {/* <Row style={{marginTop: '20px'}} > */}
      {/*  <Col style={{marginTop: '5px'}} span={2}> */}
      {/*    Text: */}
      {/*  </Col> */}
      {/*  <Col span={22} > */}
      {/*    <div style={{border: '1px solid rgb(217,217,217)'}}> */}
      {/*      <CodeMirror */}
      {/*        value={this.state.model.text} */}
      {/*        options={{mode: 'properties',}} */}
      {/*        onBeforeChange={(editor, data, value) => { */}
      {/*          this.updateField('text', value); */}
      {/*        }} */}
      {/*      /> */}
      {/*    </div> */}
      {/*  </Col> */}
      {/* </Row> */}
    </Card>
    )

  render() {
    return (
      <div>
        <Row>
          <Col span={24}>
            {
              this.props.model !== null ? this.renderContent() : null
            }
          </Col>
        </Row>
      </div>
    );
  }
}

export default ModelEditor;
