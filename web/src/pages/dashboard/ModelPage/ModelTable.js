import React from "react";
import { Button, Card, Table, Popconfirm, Tooltip } from 'antd';
import { DownOutlined, EditOutlined, DeleteOutlined, UpOutlined } from '@ant-design/icons';
import * as Setting from "../../../Setting";
import * as Backend from "../../../Backend";

class ModelTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
    };
  }

  updateTable(table) {
    this.props.onUpdateTable(table);
    Backend.updateModels(table)
      .then((res) => {
        Setting.showMessage("success", `Save succeeded`);
      })
      .catch(error => {
        Setting.showMessage("error", `Sava failed: ${error}`);
      });
  }

  updateField(index, key, value) {
    value = this.parseField(key, value);
    let table = this.props.table;
    table[index][key] = value;
    this.updateTable(table);
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
        width: "20%",
        key: 'id',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        width: "20%",
        key: 'name',
      },
      {
        title: 'Type',
        dataIndex: 'type',
        width: "20%",
        key: 'type',
      },
      {
        title: 'Text',
        dataIndex: 'text',
        width: "20%",
        key: 'text',
      },
      {
        title: 'Action',
        width: "20%",
        key: 'action',
        render: (text, record, index) => {
          return (
            <div>
              <Tooltip placement="topLeft" title="Edit">
                <Button style={{ marginRight: "0.5rem" }} icon={<EditOutlined />} size="small"
                  onClick={() => this.props.history.push({ pathname: `/dashboard/models/edit/${record.id}`, state: record })}
                />
              </Tooltip>
              <Tooltip placement="topLeft" title="Move up">
                <Button style={{ marginRight: "0.5rem" }} disabled={index === 0} icon={<UpOutlined />} size="small" onClick={() => this.upRow.bind(this)(index)} />
              </Tooltip>
              <Tooltip placement="topLeft" title="Move down">
                <Button style={{ marginRight: "0.5rem" }} disabled={index === table.length - 1} icon={<DownOutlined />} size="small" onClick={() => this.downRow.bind(this)(index)} />
              </Tooltip>
              <Popconfirm
                title="Sure to DELETE this model?"
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
            // onChange: loadData,
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
        title="Models"
        extra={
          <Button type="primary" size="small" onClick={() => this.props.history.push('/dashboard/models/add')}>Add</Button>
        }>
        {
          this.renderTable(this.props.table)
        }
      </Card>
    )
  }
}

export default ModelTable;
