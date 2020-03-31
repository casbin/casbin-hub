import React from "react";
import {
  DownOutlined,
  EditOutlined,
  MinusOutlined,
  UpOutlined
} from "@ant-design/icons";
import { Button, Input, Row, Select, Table, Tooltip } from "antd";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import ModelEditor from "./ModelEditor";
import * as Setting from "./Setting";

require("codemirror/mode/properties/properties");

const { Option } = Select;

class ModelTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      errors: []
    };
  }
  parseLine = s => {
    const res = s.split(",").map(value => value.trim(" "));
    return res;
  };
  addError = (error, index) => {
    let indexedError = `${error} at row ${index + 1}`;
    if (this.state.errors.indexOf(indexedError) == -1) {
      this.setState({
        errors: [...this.state.errors, indexedError]
      });
    }
  };

  removeError = (error, index) => {
    let errors = this.state.errors.filter(eachError => {
      return eachError != `${error} at row ${index + 1}`;
    });
    let uniqueErrors = Array.from(new Set(errors));
    this.setState({
      errors: uniqueErrors
    });
    this.setState({ errors });
  };
  parseModel = (index, key = "text") => {
    let res = {};
    let models = this.props.table[index][key];
    if (models == "") {
      return null;
    }
    const lines = models.match(/[^\r\n]+/g);
    lines.forEach((line, i) => {
      if (line.startsWith("p = ")) {
        res.p = line.slice(4);
        res.p = this.parseLine(res.p);
      } else if (line.startsWith("r = ")) {
        res.r = line.slice(4);
        res.r = this.parseLine(res.r);
      } else if (line.endsWith("= _, _")) {
        if (res.g === undefined) {
          res.g = [];
        }
        res.g.push(line.split("=")[0].trim(" "));
      } else if (line.startsWith("e = ")) {
        res.e = line.slice(4);
      } else if (line.startsWith("m = ")) {
        res.m = line.slice(4);
      }
    });
    return res;
  };
  validateModel = (index, key = "text") => {

    let res = this.parseModel(index);

    if (res == null || res.r == undefined || res.r[0].length == 0) {
      this.addError("Please add arguments to request_definition", index);
    } else {
      this.removeError("Please add arguments to request_definition", index);
    }
    if (res == null || res.p == undefined || res.p[0].length == 0) {
      this.addError("Please add a policy_definition", index);
    } else {
      this.removeError("Please add a policy_definition", index);
    }
    let mapOfValidPolicyEffects = {
      "some(where (p.eft == allow))" : true,
      "!some(where (p.eft == deny))" : true,
      "some(where (p.eft == allow)) && !some(where (p.eft == deny))" : true,
      "priority(p.eft) || deny" : true,
    };
    if (res == null ||  !mapOfValidPolicyEffects[res.e.trim()]) {
      this.addError("Please add valid policy_effect", index);
    } else {
      this.removeError("Please add valid policy_effect", index);
    }
    if (res == null || res.m == undefined || res.m[0].length == 0) {
      this.addError("Please add matchers expresion", index);
    } else {
      this.removeError("Please add matchers expresion", index);
    }
    if (this.props.table[index]['type'] == "RBAC") {
      if (res == null || res.g == undefined || res.g.length == 0) {
        this.addError("Please add role_definition", index);
      } 
    } else {
        this.removeError("Please add role_definition", index);
    }
    console.table(res);
  };
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
    return { id: "new id" };
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
        title: "Id",
        dataIndex: "id",
        key: "id",
        render: (text, record, index) => {
          return (
            <Input
              value={text}
              onChange={e => {
                this.updateField(index, "id", e.target.value);
              }}
            />
          );
        }
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text, record, index) => {
          return (
            <Input
              value={text}
              onChange={e => {
                this.updateField(index, "name", e.target.value);
              }}
            />
          );
        }
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        render: (text, record, index) => {
          return (
            <Select
              style={{ width: "100%" }}
              value={text}
              onChange={value => {
                this.updateField(index, "type", value);
              }}
            >
              {["ACL", "RBAC", "ABAC"].map((type, index) => (
                <Option key={index} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          );
        }
      },
      {
        title: "Text",
        dataIndex: "text",
        key: "text",
        render: (text, record, index) => {
          return (
            <div>
              <CodeMirror
                value={text}
                options={{ mode: "properties" }}
                onBeforeChange={(editor, data, value) => {
                  this.updateField(index, "text", value);
                }}
                onBlur={(editor, event) => {
                  this.validateModel(index);
                }}
              />
            </div>
          );
        }
      },
      {
        title: "Action",
        key: "action",
        render: (text, record, index) => {
          return (
            <div>
              <Tooltip placement="topLeft" title="Edit">
                <Button
                  style={{ marginRight: "5px" }}
                  icon={<EditOutlined />}
                  size="small"
                  onClick={() => Setting.openLink(`/model/${record.id}`)}
                />
              </Tooltip>
              <Tooltip placement="topLeft" title="Move up">
                <Button
                  style={{ marginRight: "5px" }}
                  disabled={index === 0}
                  icon={<UpOutlined />}
                  size="small"
                  onClick={() => this.upRow.bind(this)(index)}
                />
              </Tooltip>
              <Tooltip placement="topLeft" title="Move down">
                <Button
                  style={{ marginRight: "5px" }}
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
        }
      }
    ];

    return (
      <div className="full-width">
        {this.state.errors.length ? (
          <div>
            {this.state.errors.map(eachError => (
              <li>{eachError}</li>
            ))}
          </div>
        ) : null}
        <Table
          columns={columns}
          dataSource={table}
          size="middle"
          bordered
          pagination={{ pageSize: 100 }}
          scroll={{ y: "100vh" }}
          title={() => (
            <div>
              {this.props.title}&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                type="primary"
                size="small"
                onClick={this.addRow.bind(this)}
              >
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
        <Row style={{ marginTop: "20px" }}>
          {this.renderTable(this.props.table)}
        </Row>
      </div>
    );
  }
}

export default ModelTable;
