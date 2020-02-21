import React from "react";
import * as Backend from "../../utils/Backend";
import AdapterTable from "../../components/Tables/AdapterTable/AdapterTable";
import {Button, Card, Col, Row} from "antd";
import * as Setting from "../../utils/Setting";
import ModelTable from "../../components/Tables/ModelTable/ModelTable";
import EnforcerTable from "../../components/Tables/EnforcerTable/EnforcerTable";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      adapters: null,
      models: null,
      enforcers: null,
    };
  }

  componentDidMount() {
    this.getAdapters();
    this.getModels();
    this.getEnforcers();
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

  getEnforcers() {
    Backend.getEnforcers()
      .then((res) => {
          this.setState({
            enforcers: res,
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

  onUpdateEnforcers(enforcers) {
    this.setState({
      enforcers: enforcers,
    });
  }

  updateMetadata() {
    Backend.updateAdapters(this.state.adapters)
      .then((res) => {
        // Setting.showMessage("success", `Save succeeded`);

        Backend.updateModels(this.state.models)
          .then((res) => {
            // Setting.showMessage("success", `Save succeeded`);

            Backend.updateEnforcers(this.state.enforcers)
              .then((res) => {
                Setting.showMessage("success", `Save succeeded`);
              })
              .catch(error => {
                Setting.showMessage("error", `Sava failed: ${error}`);
              });
          })
          .catch(error => {
            Setting.showMessage("error", `Sava failed: ${error}`);
          });
      })
      .catch(error => {
        Setting.showMessage("error", `Sava failed: ${error}`);
      });
  }

  renderContent() {
    return (
      <Card size="small" title={
        <div style={{width: "90vw"}}>
          Edit Metadata&nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="primary" onClick={this.updateMetadata.bind(this)}>Save Change</Button>
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
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            Enforcers:
          </Col>
          <Col span={22} >
            <EnforcerTable title="Enforcers" table={this.state.enforcers} models={this.state.models === null ? [] : this.state.models} adapters={this.state.adapters === null ? [] : this.state.adapters} onUpdateTable={this.onUpdateEnforcers.bind(this)} />
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
