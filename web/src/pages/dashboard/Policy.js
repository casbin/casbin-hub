import React from "react";
import { Card, Button, Row, Table, Popconfirm, Tooltip } from 'antd';
import { EditOutlined, MinusOutlined} from '@ant-design/icons';
import * as Setting from "../../Setting";
import * as Backend from "../../Backend";

class Policy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      policyLists: null,
    };
  }

  componentDidMount() {
    this.getPolicyLists();
  }

  getPolicyLists() {
    Backend.getPolicyLists()
      .then((res) => {
          this.setState({
            policyLists: res,
          });
        }
      );
  }

  deleteRow(policyList) {
    Backend.deletePolicyList(policyList)
      .then((res) => {
        Setting.showMessage("success", `Save succeeded`);
        this.getPolicyLists();
      })
      .catch(error => {
        Setting.showMessage("error", `Sava failed: ${error}`);
      });
  }

  renderTable(table) {
    // const keys = ["v0", "v1", "v2", "v3", "v4", "v5"];
    // const titles = ["V0", "V1", "V2", "V3", "V4", "V5"];
    const columns = [{
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: 'Rule Type',
      dataIndex: 'ruleType',
      key: 'ruleType',
    }, {
      title: 'Tenant',
      dataIndex: 'tenant',
      key: 'tenant',
    }, {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    }, {
      title: 'Resource Path',
      dataIndex: 'resourcePath',
      key: 'resourcePath',
    }, {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    }, {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
    }, {
      title: 'Auth Effect',
      dataIndex: 'authEffect',
      key: 'authEffect',
    }, {
      title: 'Option',
      key: 'option',
      render: (text, record, index) => {
        return (
          <div>
            <Tooltip placement="topLeft" title="Edit">
              <Button style={{ marginRight: "0.5rem" }} icon={<EditOutlined />} size="small"
                onClick={() => this.props.history.push({ pathname: `/dashboard/policyList/edit/${record.id}`, state: record })}
              />
            </Tooltip>
            <Popconfirm
              title="Sure to DELETE this adapter?"
              onCancel={() => console.log("Cancel deletion")}
              onConfirm={() => {
                console.log("Confirm deletion");
                this.deleteRow.bind(this)(record);
              }}>
              <Tooltip placement="topLeft" title="Delete">
                <Button icon={<MinusOutlined />} size="small" />
              </Tooltip>
            </Popconfirm>
          </div>
        );
      }
    }];
    
    return (
      <div className='full-width'>
        <Table
        pagination={{
          defaultPageSize: 10,
        }}
          columns={columns}
          dataSource={table}
          size="middle"
          bordered
          rowKey={obj => obj.id}
        />
      </div>
    );
  }

  render() {
    return (
      <Card title="Policy List"
        extra={
          <Button type="primary" size="small" onClick={() => this.props.history.push('/dashboard/policyList/add')}>
            Add
            </Button>
        }>
        <Row style={{ marginTop: '1rem' }} >
          {
            this.renderTable(this.state.policyLists)
          }
        </Row>
      </Card>
    )
  }
}
export default Policy
