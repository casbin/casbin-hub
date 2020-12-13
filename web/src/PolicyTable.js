import React from 'react';
import { DownOutlined, MinusOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Input, Row, Table, Tooltip } from 'antd';
import * as Setting from './Setting';

/* eslint-disable */
class PolicyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
    };
  }

  updateTable(table) {
    this.props.onUpdateTable(this.props.type, table);
  }

  parseField(key, value) {
    if (['start', 'end'].includes(key)) {
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
    return {
      pType: this.props.type,
      v0: '',
      v1: '',
      v2: '',
      v3: '',
      v4: '',
      v5: '',
    };
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
    const keys = ['v0', 'v1', 'v2', 'v3', 'v4', 'v5'];
    // const titles = ["V0", "V1", "V2", "V3", "V4", "V5"];

    if (this.props.headers === undefined) {
      return null;
    }

    const columns = [];
    columns.push({
      title: 'PType',
      dataIndex: 'pType',
      key: 'pType',
      render: (text, record, index) => {
        return <Input value={text} disabled={true} />;
      },
    });

    if (this.props.headers) {
      this.props.headers.forEach((title, i) => {
        columns.push({
          title: title,
          dataIndex: keys[i],
          key: keys[i],
          render: (text, record, index) => {
            return (
              <Input
                value={text}
                onChange={e => {
                  this.updateField(index, keys[i], e.target.value);
                }}
              />
            );
          },
        });
      });
    }

    columns.push({
      title: 'Edit:',
      key: 'action',
      render: (text, record, index) => {
        return (
          <div>
            <Tooltip placement="topLeft" title="Move up">
              <Button
                style={{ marginRight: '5px' }}
                disabled={index === 0}
                icon={<UpOutlined />}
                size="small"
                onClick={() => this.upRow.bind(this)(index)}
              />
            </Tooltip>
            <Tooltip placement="topLeft" title="Move down">
              <Button
                style={{ marginRight: '5px' }}
                disabled={index === table.length - 1}
                icon={<DownOutlined />}
                size="small"
                onClick={() => this.downRow.bind(this)(index)}
              />
            </Tooltip>
            <Tooltip placement="topLeft" title="Delete">
              <Button
                icon={<MinusOutlined />}
                size="small"
                onClick={() => this.deleteRow.bind(this)(index)}
              />
            </Tooltip>
          </div>
        );
      },
    });

    return (
      <div className="full-width">
        <Table
          columns={columns}
          dataSource={table}
          size="middle"
          bordered
          pagination={{ pageSize: 10 }}
          title={() => (
            <div>
              {this.props.title}&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                type="primary"
                size="small"
                onClick={this.addRow.bind(this)}>
                Add
              </Button>
            </div>
          )}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <Row style={{ marginTop: '20px' }}>
          {this.renderTable(this.props.table)}
        </Row>
      </div>
    );
  }
}

export default PolicyTable;

/* eslint-disable */
