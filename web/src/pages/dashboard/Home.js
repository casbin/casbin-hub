import React from 'react';
import {Card, Col, Row} from 'antd';
import * as Backend from "../../Backend";
import * as Setting from "../../Setting";
import AdapterTable from "./AdapterPage/AdapterTable";
import ModelTable from "./ModelPage/ModelTable";
import EnforcerTable from "./EnforcerPage/EnforcerTable";
import './home.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          classes: props,
          adapters: null,
          models: null,
          enforcers: null,
        };
        Setting.initServerUrl();
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
          <Card className='full-width' title={
            <div  style={{width: "90vw"}}>
              <a className='row-header' target="_blank" href="https://github.com/casbin/casbin-dashboard" rel='noopener noreferrer'>
                <img alt="GitHub stars" src="https://img.shields.io/github/stars/casbin/casbin-dashboard?style=social" />
              </a>
            </div>
          } style={{marginLeft: '5px'}} type="inner">
            <Row style={{marginTop: '20px'}} >
              <Col span={22} >
                <ModelTable  history={this.props.history} table={this.state.models} onUpdateTable={this.onUpdateModels.bind(this)} />
              </Col>
            </Row>
            <Row style={{marginTop: '20px'}} >
              <Col span={22} >
                <AdapterTable  history={this.props.history} table={this.state.adapters} onUpdateTable={this.onUpdateAdapters.bind(this)} />
              </Col>
            </Row>
            <Row style={{marginTop: '20px'}} >
              <Col span={22} >
                <EnforcerTable  history={this.props.history} table={this.state.enforcers} models={this.state.models === null ? [] : this.state.models} adapters={this.state.adapters === null ? [] : this.state.adapters} onUpdateTable={this.onUpdateEnforcers.bind(this)} />
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
    
    export default Home;
