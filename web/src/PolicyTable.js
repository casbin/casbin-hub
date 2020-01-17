import React from "react";
import {DownOutlined, EditOutlined, MinusOutlined, UpOutlined} from '@ant-design/icons';
import {Button, Input, Row, Select, Table, Tooltip} from 'antd';
import * as Setting from "./Setting";

const { Option } = Select;

class PolicyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
    };
  }

  updateTable(table) {
    this.props.onUpdateTable(table);
  }

  parseField(key, value) {
    if (["start", "end"].includes(key)) {
      value = Setting.myParseInt(value);
    }
    return value;
  }

  updateField(index, key, value) {
    value = this.parseField(key, value);

    let table = this.props.table;
    table[index][key] = value;
    this.updateTable(table);
  }

  newRow() {
    return {id: "new id"};
  }

  addRow() {
    let table = this.props.table;
    let row = this.newRow();
    if (table === undefined) {
      table = [];
    }
    if (table.length > 0) {
      const last = table.slice(-1)[0];
      row = Setting.deepCopy(last);
      row.id = last.id + " (new)";
    }
    table = Setting.addRow(table, row);
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
        title: 'PType',
        dataIndex: 'pType',
        key: 'pType',
        render: (text, record, index) => {
          return (
            <Input value={text} onChange={e => {
              this.updateField(index, 'pType', e.target.value);
            }} />
          )
        }
      },
      {
        title: 'V0',
        dataIndex: 'v0',
        key: 'v0',
        render: (text, record, index) => {
          return (
            <Input value={text} onChange={e => {
              this.updateField(index, 'v0', e.target.value);
            }} />
          )
        }
      },
      {
        title: 'V1',
        dataIndex: 'v1',
        key: 'v1',
        render: (text, record, index) => {
          return (
            <Input value={text} onChange={e => {
              this.updateField(index, 'v1', e.target.value);
            }} />
          )
        }
      },
      {
        title: 'V2',
        dataIndex: 'v2',
        key: 'v2',
        render: (text, record, index) => {
          return (
            <Input value={text} onChange={e => {
              this.updateField(index, 'v2', e.target.value);
            }} />
          )
        }
      },
      {
        title: 'V3',
        dataIndex: 'v3',
        key: 'v3',
        render: (text, record, index) => {
          return (
            <Input value={text} onChange={e => {
              this.updateField(index, 'v3', e.target.value);
            }} />
          )
        }
      },
      {
        title: 'V4',
        dataIndex: 'v4',
        key: 'v4',
        render: (text, record, index) => {
          return (
            <Input value={text} onChange={e => {
              this.updateField(index, 'v4', e.target.value);
            }} />
          )
        }
      },
      {
        title: 'V5',
        dataIndex: 'v5',
        key: 'v5',
        render: (text, record, index) => {
          return (
            <Input value={text} onChange={e => {
              this.updateField(index, 'v5', e.target.value);
            }} />
          )
        }
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record, index) => {
          return (
            <div>
              <Tooltip placement="topLeft" title="Edit">
                <Button style={{marginRight: "5px"}} icon={<EditOutlined />} size="small" onClick={() => Setting.openLink(`/adapter/${record.id}`)} />
              </Tooltip>
              <Tooltip placement="topLeft" title="Move up">
                <Button style={{marginRight: "5px"}} disabled={index === 0} icon={<UpOutlined />} size="small" onClick={() => this.upRow.bind(this)(index)} />
              </Tooltip>
              <Tooltip placement="topLeft" title="Move down">
                <Button style={{marginRight: "5px"}} disabled={index === table.length - 1} icon={<DownOutlined />} size="small" onClick={() => this.downRow.bind(this)(index)} />
              </Tooltip>
              <Tooltip placement="topLeft" title="Delete">
                <Button icon={<MinusOutlined />} size="small" onClick={() => this.deleteRow.bind(this)(index)} />
              </Tooltip>
            </div>
          );
        }
      },
    ];

    return (
      <div>
        <Table columns={columns} dataSource={table} size="middle" bordered pagination={{pageSize: 100}} scroll={{y: '100vh'}}
               title={() => (
                 <div>
                   {this.props.title}&nbsp;&nbsp;&nbsp;&nbsp;
                   <Button type="primary" size="small" onClick={this.addRow.bind(this)}>Add</Button>
                 </div>
               )}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <Row style={{marginTop: '20px'}} >
          {
            this.renderTable(this.props.table)
          }
        </Row>
      </div>
    )
  }
}

export default PolicyTable;
