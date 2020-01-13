import React from "react";
import * as Backend from "./Backend";
import AdapterTable from "./AdapterTable";
import {Button, Card, Col, Row} from "antd";
import * as Setting from "./Setting";
import ModelTable from "./ModelTable";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      adapters: null,
      models: null,
    };
  }

  componentDidMount() {
    this.getAdapters();
    this.getModels();
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

  onUpdateAdapters(adapters) {
    this.setState({
      adapters: adapters,
    });
  }

  onUpdateModels(models) {
    this.setState({
      models: models,
    });
  }

  submitAdaptersEdit() {
    Backend.updateAdapters(this.state.adapters)
      .then((res) => {
        Setting.showMessage("success", `保存成功`);
      })
      .catch(error => {
        Setting.showMessage("error", `保存失败：${error}`);
      });
  }

  renderContent() {
    return (
      <Card size="small" title={
        <div style={{width: "90vw"}}>
          Edit Metadata&nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="primary" onClick={this.submitAdaptersEdit.bind(this)}>Save Change</Button>
        </div>
      } style={{marginLeft: '5px'}} type="inner">
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            Models:
          </Col>
          <Col span={22} >
            <ModelTable title="Models" table={this.state.models} onUpdateTable={this.onUpdateModels.bind(this)} />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            Adapters:
          </Col>
          <Col span={22} >
            <AdapterTable title="Adapters" table={this.state.adapters} onUpdateTable={this.onUpdateAdapters.bind(this)} />
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
            this.state.adapters !== null ? this.renderContent() : null
          }
        </Row>
      </div>
    );
  }

}

export default HomePage;
