import React from 'react';
import {
DownOutlined, EditOutlined, MinusOutlined, UpOutlined 
} from '@ant-design/icons';
import {
Button, Input, Row, Select, Table, Tooltip 
} from 'antd';
import * as Setting from '../../../utils/Setting';

const { Option } = Select;

class PolicyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
    };
  }

  updateTable = (table) => {
    this.props.onUpdateTable(this.props.type, table);
  }

  parseField = (key, value) => {
    if (['start', 'end'].includes(key)) {
      value = Setting.myParseInt(value);
    }
    return value;
  }

  updateField = (index, key, value) => {
    value = this.parseField(key, value);

    const { table } = this.props;
    table[index][key] = value;
    this.updateTable(table);
  }

  newRow = () => ({
 pType: this.props.type, v0: '', v1: '', v2: '', v3: '', v4: '', v5: '' 
})

  addRow = () => {
    let { table } = this.props;
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

  deleteRow = (i) => {
    let { table } = this.props;
    table = Setting.deleteRow(table, i);
    this.updateTable(table);
  }

  upRow = (i) => {
    let { table } = this.props;
    table = Setting.swapRow(table, i - 1, i);
    this.updateTable(table);
  }

  downRow = (i) => {
    let { table } = this.props;
    table = Setting.swapRow(table, i, i + 1);
    this.updateTable(table);
  }

  renderTable = (table) => {
    const keys = ['v0', 'v1', 'v2', 'v3', 'v4', 'v5'];
    // const titles = ["V0", "V1", "V2", "V3", "V4", "V5"];

    if (this.props.headers === undefined) {
      return null;
    }

    const columns = [];
    columns.push(
      {
        title: 'PType',
        dataIndex: 'pType',
        key: 'pType',
        render: (text, record, index) => (
          <Input value={text} disabled />
          )
      },
    );

    this.props.headers.forEach((title, i) => {
      columns.push(
        {
          title,
          dataIndex: keys[i],
          key: keys[i],
          render: (text, record, index) => (
            <Input
              value={text}
              onChange={(e) => {
                this.updateField(index, keys[i], e.target.value);
              }}
            />
            )
        },
      );
    });

    columns.push(
      {
        title: 'Edit:',
        key: 'action',
        render: (text, record, index) => (
          <div>
            <Tooltip placement="topLeft" title="Move up">
              <Button style={{ marginRight: '5px' }} disabled={index === 0} icon={<UpOutlined />} size="small" onClick={() => this.upRow(index)} />
            </Tooltip>
            <Tooltip placement="topLeft" title="Move down">
              <Button style={{ marginRight: '5px' }} disabled={index === table.length - 1} icon={<DownOutlined />} size="small" onClick={() => this.downRow(index)} />
            </Tooltip>
            <Tooltip placement="topLeft" title="Delete">
              <Button icon={<MinusOutlined />} size="small" onClick={() => this.deleteRow(index)} />
            </Tooltip>
          </div>
          )
      },
    );

    return (
      <div>
        <Table
          columns={columns}
          dataSource={table}
          size="middle"
          bordered
          pagination={{ pageSize: 100 }}
          scroll={{ y: '100vh' }}
          title={() => (
            <div>
              {this.props.title}
&nbsp;&nbsp;&nbsp;&nbsp;
              <Button type="primary" size="small" onClick={this.addRow}>Add</Button>
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
          {
            this.renderTable(this.props.table)
          }
        </Row>
      </div>
    );
  }
}

export default PolicyTable;
