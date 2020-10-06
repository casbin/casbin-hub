import React from "react";
import { Alert, Button, Card, Table, Popconfirm, Tooltip } from 'antd';
import { DownOutlined, EditOutlined, DeleteOutlined, UpOutlined } from '@ant-design/icons';
import * as Setting from "../../../Setting";
import * as Backend from "../../../Backend";


class EnforcerTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
    };
  }

  updateTable(table) {
    this.props.onUpdateTable(table);
    Backend.updateEnforcers(table)
      .then((res) => {
        Setting.showMessage("success", `Save succeeded`);
      })
      .catch(error => {
        Setting.showMessage("error", `Sava failed: ${error}`);
      });
  }

  deleteRow(i) {
    let table = this.props.table;
    table = Setting.deleteRow(table, i);
    this.updateTable(table);
  }

  upRow(i) {
    let table = this.props.table;
    table = Setting.swapRow(table, i - 1, i);
    this.updateTable(table);
  }

  downRow(i) {
    let table = this.props.table;
    table = Setting.swapRow(table, i, i + 1);
    this.updateTable(table);
  }

  renderTable(table) {
    const columns = [
      {
        title: 'Id',
        dataIndex: 'id',
        width: "15%",
        key: 'id',

      },
      {
        title: 'Name',
        dataIndex: 'name',
        width: "15%",
        key: 'name',
      },
      {
        title: 'Model Id',
        dataIndex: 'model',
        width: "15%",
        key: 'model',
      },
      {
        title: 'Adapter Id',
        dataIndex: 'adapter',
        width: "15%",
        key: 'adapter',
      },
      {
        title: 'State',
        key: 'state',
        width: "20%",
        render: (text, record, index) => {
          let modelState, adapterState = ""
          this.props.models.map(
            function (item) {
              if (item.id === record.model) {
                modelState = "validModel"
                return modelState
              }
              return modelState
            }
          )
          this.props.adapters.map(
            function (item) {
              if (item.id === record.adapter) {
                adapterState = "validAdapter"
                return adapterState
              }
              return adapterState
            }
          )
          if (adapterState !== "validAdapter" && modelState !== "validModel") {
            return (<Alert
              message="Error"
              description="The model and adapter has missed!"
              type="error"
              showIcon
            />)
          }
          if (modelState !== "validModel") {
            return (<Alert
              message="Error"
              description="The model has missed!"
              type="error"
              showIcon
            />)
          }
          if (adapterState !== "validAdapter") {
            return (<Alert
              message="Error"
              description="The adapter has missed!"
              type="error"
              showIcon
            />)
          }
        }


      },
      {
        title: 'Action',
        key: 'action',
        width: "20%",
        render: (text, record, index) => {
          return (
            <div>
              <Tooltip placement="topLeft" title="Edit">
                <Button style={{ marginRight: "0.5rem" }} icon={<EditOutlined />} size="small"
                  onClick={() => this.props.history.push({ pathname: `/dashboard/enforcers/edit/${record.id}`, state: [record, this.props.adapters, this.props.models] })}
                />
              </Tooltip>
              <Tooltip placement="topLeft" title="Move up">
                <Button style={{ marginRight: "0.5rem" }} disabled={index === 0} icon={<UpOutlined />} size="small" onClick={() => this.upRow.bind(this)(index)} />
              </Tooltip>
              <Tooltip placement="topLeft" title="Move down">
                <Button style={{ marginRight: "0.5rem" }} disabled={index === table.length - 1} icon={<DownOutlined />} size="small" onClick={() => this.downRow.bind(this)(index)} />
              </Tooltip>
              <Popconfirm
                title="Sure to DELETE this enforcer?"
                onCancel={() => console.log("Cancel deletion")}
                onConfirm={() => {
                  console.log("Confirm deletion");
                  this.deleteRow.bind(this)(index);
                }}>
                <Tooltip placement="topLeft" title="Delete">
                  <Button icon={<DeleteOutlined />} size="small" />
                </Tooltip>
              </Popconfirm>
            </div>
          );
        }
      },
    ];

    return (
      <div className='full-width'>
        <Table
          pagination={{
            defaultPageSize: 3,
          }}
          columns={columns}
          dataSource={this.props.table}
          size="middle"
          bordered
          rowKey={obj => obj.id}
        />
      </div>
    );
  }

  render() {
    return (
      <Card
        title="Enforcers"
        extra={
          <Button type="primary" size="small" onClick={() => this.props.history.push({ pathname: '/dashboard/enforcers/add', state: [this.props.adapters, this.props.models] })}>Add</Button>
        }>
        {
          this.renderTable(this.props.table)
        }
      </Card>
    )
  }
}

export default EnforcerTable;
