import React from "react";
import { Button, Card, Table, Popconfirm, Tooltip } from 'antd';
import { DownOutlined, EditOutlined, DeleteOutlined, UpOutlined } from '@ant-design/icons';
import * as Setting from "../../../Setting";
import * as Backend from "../../../Backend";


class AdapterTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
    };
  }

  updateTable(table) {
    this.props.onUpdateTable(table);
    Backend.updateAdapters(table)
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
        width: "16%",
        key: 'id',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        width: "16%",
        key: 'name',
      },
      {
        title: 'Type',
        dataIndex: 'type',
        width: "16%",
        key: 'type',
      },
      {
        title: 'Parameter 1',
        dataIndex: 'param1',
        width: "16%",
        key: 'param1',
      },
      {
        title: 'Parameter 2',
        dataIndex: 'param2',
        width: "16%",
        key: 'param2',
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
                onClick={() => this.props.history.push({pathname:`/dashboard/adapters/edit/${record.id}`,state:record})} 
                />
              </Tooltip>
              <Tooltip placement="topLeft" title="Move up">
                <Button style={{ marginRight: "0.5rem" }} disabled={index === 0} icon={<UpOutlined />} size="small" onClick={() => this.upRow.bind(this)(index)} />
              </Tooltip>
              <Tooltip placement="topLeft" title="Move down">
                <Button style={{ marginRight: "0.5rem" }} disabled={index === table.length - 1} icon={<DownOutlined />} size="small" onClick={() => this.downRow.bind(this)(index)} />
              </Tooltip>
              <Popconfirm
                title="Sure to DELETE this adapter?"
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
        title="Adapters"
        extra={
          <Button type="primary" size="small" onClick={() => this.props.history.push('/dashboard/adapters/add')}>Add</Button>
        }>
        {
          this.renderTable(this.props.table)
        }
      </Card>
    )
  }
}

export default AdapterTable;
