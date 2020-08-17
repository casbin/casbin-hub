import React from "react";
import { Card, Button, Row, Table, Popconfirm, Tooltip } from 'antd';
import { DownOutlined, EditOutlined, MinusOutlined, UpOutlined } from '@ant-design/icons';
import * as Setting from "../../Setting";
import * as Backend from "../../Backend";

class Policy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      policyLists: null,
    };
    Setting.initServerUrl();
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


  updateTable(table) {
    Backend.updatePolicyLists(table)
      .then((res) => {
        Setting.showMessage("success", `Save succeeded`);
      })
      .catch(error => {
        Setting.showMessage("error", `Sava failed: ${error}`);
      });
  }

  deleteRow(i) {
    let table = this.state.policyLists;
    table = Setting.deleteRow(table, i);
    this.updateTable(table);
  }

  upRow(i) {
    let table = this.state.policyLists;
    table = Setting.swapRow(table, i - 1, i);
    this.updateTable(table);
  }

  downRow(i) {
    let table = this.state.policyLists;
    table = Setting.swapRow(table, i, i + 1);
    this.updateTable(table);
  }

  renderTable(table) {
    // const keys = ["v0", "v1", "v2", "v3", "v4", "v5"];
    // const titles = ["V0", "V1", "V2", "V3", "V4", "V5"];
    const columns = [{
      title: 'Id',
      dataIndex: 'id',
      width: 100,
      key: 'id',
    }, {
      title: 'Rule Type',
      dataIndex: 'ruleType',
      width: 120,
      key: 'ruleType',
    }, {
      title: 'Tenant',
      dataIndex: 'tenant',
      width: 180,
      key: 'tenant',
    }, {
      title: 'User',
      dataIndex: 'user',
      width: 120,
      key: 'user',
    }, {
      title: 'Resource Path',
      dataIndex: 'resourcePath',
      width: 180,
      key: 'resourcePath',
    }, {
      title: 'Action',
      dataIndex: 'action',
      width: 120,
      key: 'action',
    }, {
      title: 'Service',
      dataIndex: 'service',
      width: 120,
      key: 'service',
    }, {
      title: 'Auth Effect',
      dataIndex: 'authEffect',
      width: 120,
      key: 'authEffect',
    }, {
      title: 'Option',
      width: 180,
      key: 'option',
      render: (text, record, index) => {
        return (
          <div>
            <Tooltip placement="topLeft" title="Edit">
              <Button style={{ marginRight: "5px" }} icon={<EditOutlined />} size="small"
                onClick={() => this.props.history.push({ pathname: `/dashboard/policyList/edit/${record.id}`, state: record })}
              />
            </Tooltip>
            <Tooltip placement="topLeft" title="Move up">
              <Button style={{ marginRight: "5px" }} disabled={index === 0} icon={<UpOutlined />} size="small" onClick={() => this.upRow.bind(this)(index)} />
            </Tooltip>
            <Tooltip placement="topLeft" title="Move down">
              <Button style={{ marginRight: "5px" }} disabled={index === table.length - 1} icon={<DownOutlined />} size="small" onClick={() => this.downRow.bind(this)(index)} />
            </Tooltip>
            <Popconfirm
              title="Sure to DELETE this adapter?"
              onCancel={() => console.log("Cancel deletion")}
              onConfirm={() => {
                console.log("Confirm deletion");
                this.deleteRow.bind(this)(index);
              }}>
              <Tooltip placement="topLeft" title="Delete">
                <Button icon={<MinusOutlined />} size="small" />
              </Tooltip>
            </Popconfirm>
          </div>
        );
      }
    }];
    // columns.push(
    //   {
    //     title: "PType",
    //     dataIndex: "pType",
    //     key: "pType",
    //     render: (text, record, index) => {
    //       return (
    //         <Input value={text} disabled={true} />
    //       )
    //     }
    //   },
    // );

    // this.props.headers.forEach((title, i) => {
    //   columns.push(
    //     {
    //       title: title,
    //       dataIndex: keys[i],
    //       key: keys[i],
    //       render: (text, record, index) => {
    //         return (
    //           <Input value={text} onChange={e => {
    //             this.updateField(index, keys[i], e.target.value);
    //           }} />
    //         )
    //       }
    //     },
    //   );
    // });

    // columns.push(
    //   {
    //     title: 'Edit:',
    //     key: 'action',
    //     render: (text, record, index) => {
    //       return (
    //         <div>
    //           <Tooltip placement="topLeft" title="Move up">
    //             <Button style={{marginRight: "5px"}} disabled={index === 0} icon={<UpOutlined />} size="small" onClick={() => this.upRow.bind(this)(index)} />
    //           </Tooltip>
    //           <Tooltip placement="topLeft" title="Move down">
    //             <Button style={{marginRight: "5px"}} disabled={index === table.length - 1} icon={<DownOutlined />} size="small" onClick={() => this.downRow.bind(this)(index)} />
    //           </Tooltip>
    //           <Tooltip placement="topLeft" title="Delete">
    //             <Button icon={<MinusOutlined />} size="small" onClick={() => this.deleteRow.bind(this)(index)} />
    //           </Tooltip>
    //         </div>
    //       );
    //     }
    //   },
    // );

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
        <Row style={{ marginTop: '20px' }} >
          {
            this.renderTable(this.state.policyLists)
          }
        </Row>
      </Card>
    )
  }
}
export default Policy
